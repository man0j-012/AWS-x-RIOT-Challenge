from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import json
import boto3
import os
from dotenv import load_dotenv
from typing import Optional
from pinecone import Pinecone, ServerlessSpec
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables from .env file
load_dotenv()

# Initialize Bedrock client
bedrock_client = boto3.client(
    'bedrock-runtime',
    region_name=os.getenv('AWS_DEFAULT_REGION'),
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
)

# Initialize Pinecone client
pc = Pinecone(
    api_key=os.getenv("PINECONE_API_KEY")
)

# Verify if index exists and load it
index_name = 'player-data-index'
if index_name not in [index.name for index in pc.list_indexes()]:
    raise ValueError(f"Index '{index_name}' does not exist. Please verify the name.")
index = pc.Index(index_name)

# Initialize FastAPI
fastapi = FastAPI()

# Configure CORS middleware
fastapi.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust as needed for specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    user_message: str

class QueryRequest(BaseModel):
    player_id: Optional[str] = None  # Optional ID-based query
    top_k: int = 5  # Number of top results to return

@fastapi.post("/chat/")
async def chat_with_backend(message: ChatMessage):
    try:
        # Step 1: Generate embedding for the user's message
        embedding_response = bedrock_client.invoke_model(
            modelId="amazon.titan-embed-text-v1",
            accept="application/json",
            contentType='application/json',
            body=json.dumps({"inputText": message.user_message})
        )
        response_body = embedding_response['body'].read().decode('utf-8')
        embedding_data = json.loads(response_body)
        query_embedding = embedding_data.get("embedding")

        if not query_embedding:
            raise HTTPException(status_code=500, detail="Embedding not found in Bedrock response.")

        # Step 2: Query Pinecone with the generated embedding
        pinecone_response = index.query(
            vector=query_embedding,
            top_k=5,
            include_metadata=True
        )

        matches = pinecone_response.get("matches", [])

        if not matches:
            raise HTTPException(status_code=404, detail="No relevant player data found.")

        # Step 3: Combine the retrieved contexts into a prompt
        combined_context = "\n".join([
            json.dumps(match['metadata'], indent=2) for match in matches
        ])

        # Step 4: Construct the prompt for the LLM
        llm_prompt = f"""
You are an expert VALORANT esports analyst and team manager.

User Query:
{message.user_message}

Player Data:
{combined_context}

Instructions:
- Build a VALORANT team based on the user's query.
- Assign roles to each player (Duelist, Controller, Initiator, Sentinel, IGL).
- Explain why each player was chosen for their role.
- Discuss the team's potential strengths and weaknesses.

Provide a detailed and structured response.
"""

        # Step 5: Invoke the LLM via Bedrock
        llm_response = bedrock_client.invoke_model(
            modelId="anthropic.claude-3-haiku-20240307-v1:0",  # Updated model ID
            accept="application/json",
            contentType="application/json",
            body=json.dumps({
                "inputText": llm_prompt,
                "parameters": {
                    "maxTokens": 1024,
                    "temperature": 0.7,
                    "topP": 0.95,
                    "stopSequences": ["\n\n"]
                }
            })
        )
        llm_response_body = llm_response['body'].read().decode('utf-8')
        llm_output_data = json.loads(llm_response_body)
        llm_output = llm_output_data.get('completion', '')

        if not llm_output:
            raise HTTPException(status_code=500, detail="Failed to generate a response from the LLM.")

        return {"response": llm_output}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@fastapi.post("/query/")
async def query_pinecone(request: QueryRequest):
    try:
        if request.player_id:
            # Query using the ID
            response = index.query(
                id=request.player_id,
                top_k=request.top_k,
                include_metadata=True
            )
        else:
            raise HTTPException(
                status_code=400, detail="player_id is required for querying metadata."
            )

        # Check if any results were found
        if not response['matches']:
            return {"message": "No matching players found."}

        # Format the response
        results = [
            {
                "id": match["id"],
                "score": match["score"],
                "metadata": match.get("metadata", {})
            }
            for match in response['matches']
        ]

        return {"results": results}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
