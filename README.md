Inspiration The world of esports is data-driven, and teams need quick, actionable insights to stay ahead of the competition. Inspired by the complexities of team composition in Valorant, we wanted to build a tool that leverages AI and machine learning to enhance team performance. Our goal is to create a dynamic digital assistant that empowers teams by providing real-time player insights and optimizing team strategies using the power of AWS Bedrock and Retrieval-Augmented Generation (RAG).

What it does

Our project, AWS x Valorant Riot Assistant, is an AI-powered digital assistant designed to support Valorant esports teams in scouting and recruitment. It allows users to:

Generate team compositions based on player performance and attributes. Assign roles such as Duelist, Initiator, or Controller and recommend players based on specific needs. Offer insights into player strengths and team strategies. Use natural language queries to answer questions like “Who’s the best Duelist in VCT International?” or “Create a cross-regional team with players from at least three regions.”

How we built it We used Amazon Bedrock to power the underlying LLM and embedding models (e Amazon Titan). Player data was preprocessed and chunked into CSV files, which were embedded using Titan Embeddings and stored in a Pinecone vector database. The Retrieval-Augmented Generation (RAG) pipeline was implemented using AWS Lambda functions to retrieve relevant player data and feed it into an LLM (Claude 3 haiku via Bedrock) for generating context-aware responses. We built the front end using React.js, enabling users to input queries and visualize the team composition and insights.

Challenges we ran into Optimizing data retrieval: Handling a large dataset and ensuring quick retrieval for real-time responses was a significant challenge, especially when embedding and querying multiple players simultaneously. Integrating multiple AWS services: Building a seamless flow between Amazon Bedrock, Pinecone, and our custom-built APIs took considerable effort to ensure scalability and performance. Ensuring model accuracy: Fine-tuning the AI to give accurate, context-specific team compositions and strategies required careful design of the query and retrieval mechanisms.

Accomplishments that we're proud of Successfully building a scalable AI-powered assistant capable of understanding complex player attributes and delivering relevant insights in real time. Creating a robust RAG architecture using Amazon Bedrock, ensuring that the system is flexible and scalable for future enhancements. Implementing an interactive and intuitive React.js frontend that provides valuable insights to users in a clean, user-friendly interface. What we learned AI in esports: The value of combining AI with esports data for strategic team-building and decision-making is enormous. We learned how powerful data-driven insights can be in improving team composition and performance. Building with AWS: Working with the AWS ecosystem, particularly Bedrock and Lambda, taught us how to leverage cloud infrastructure for large-scale data processing and AI applications. RAG Architecture: We gained deep insights into the Retrieval-Augmented Generation (RAG) framework and how it can enhance the accuracy and relevance of AI responses, especially in complex, data-heavy applications like esports.

What's next for AWS x Valorant Riot Expanding Data Sources: We plan to integrate more data sources, including real-time player performance from live matches to keep the assistant up-to-date with the latest stats. Advanced Player Comparisons: Adding functionality to directly compare players based on multiple metrics and generating dynamic, side-by-side visualizations. Personalized Insights for Teams: Creating a feature that allows teams to input their roster and get personalized suggestions on how to improve their strategy or which players to scout. Global Expansion: Extending the platform to include data from additional regions and tournaments, allowing for a more comprehensive view of the esports landscape.

Built With
amazon-web-services
api
bedrock
fastapi
pinecone
python
react.js
