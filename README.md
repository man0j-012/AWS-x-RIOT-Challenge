🧠 AWS x Valorant Riot Assistant
🎯 Inspiration
The world of esports is increasingly data-driven, and teams require fast, actionable insights to stay competitive. Inspired by the strategic depth of team compositions in Valorant, we envisioned a tool that harnesses the power of AI and machine learning to elevate team performance. Our goal is to build a dynamic digital assistant that empowers teams by delivering real-time player insights and optimizing strategies using AWS Bedrock and Retrieval-Augmented Generation (RAG).

🚀 What It Does
AWS x Valorant Riot Assistant is an AI-powered digital assistant tailored for Valorant esports scouting and recruitment. It enables users to:

✅ Generate optimal team compositions based on player statistics and in-game attributes.

🎯 Assign specific roles (Duelist, Initiator, Controller, etc.) and recommend players accordingly.

🔍 Provide insights into player strengths and team strategy alignments.

💬 Answer natural language questions like:

“Who’s the best Duelist in VCT International?”

“Build a team with players from at least three different regions.”

🛠 How We Built It
Amazon Bedrock powers the LLM and embedding models (e.g., Amazon Titan).

Player performance data is preprocessed and chunked into CSVs, then embedded using Titan Embeddings and stored in Pinecone (a vector DB).

We implemented a RAG pipeline using AWS Lambda to:

Retrieve relevant embeddings from Pinecone.

Send them as context to Claude 3 Haiku via Bedrock for generating responses.

The frontend is built in React.js, enabling users to ask questions, view team compositions, and analyze insights visually.

⚔️ Challenges We Faced
Efficient Data Retrieval: Handling high volumes of player data and enabling real-time, low-latency retrieval.

AWS Integration: Seamlessly connecting Bedrock, Pinecone, and custom APIs to maintain scalability and reliability.

LLM Accuracy: Designing robust prompts and tuning the query pipeline to ensure accurate, role-specific responses from the model.

🏆 Accomplishments We're Proud Of
🔧 Built a scalable AI assistant capable of interpreting nuanced esports data and producing relevant team-building suggestions.

🧩 Designed and deployed a production-ready RAG architecture using Amazon Bedrock, demonstrating scalability and modularity.

💻 Delivered a clean and intuitive React.js UI, allowing seamless interaction and visualization for end-users.

📚 What We Learned
AI in Esports: Leveraging AI to analyze esports data provides enormous value in team decision-making.

AWS Ecosystem: Hands-on experience with Bedrock, Lambda, and Pinecone helped us understand scalable cloud-native AI pipelines.

RAG Architecture: Learned how RAG improves the quality and relevance of LLM outputs in data-intensive domains.

🔮 What’s Next
📡 Live Data Integration: Incorporate real-time stats from ongoing matches and scrims.

🆚 Player Comparison Engine: Enable side-by-side comparison with dynamic, multi-metric visualizations.

🎯 Team Personalization: Allow teams to upload rosters and receive tailored suggestions and strategic insights.

🌍 Global Expansion: Integrate players and tournaments from more regions to enhance scouting reach.

🧰 Built With
amazon-web-services

amazon-bedrock

pinecone

fastapi

python

react.js
