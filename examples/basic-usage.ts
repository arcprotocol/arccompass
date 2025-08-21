/**
 * ARC Compass - Basic Usage Example
 * 
 * This example demonstrates how to use ARC Compass as an agent search engine,
 * and then communicate directly with the matched agents using ARC Protocol.
 */

import { ARCCompassClient } from '../src';
// In a real implementation, you would import from 'arc-protocol'
// This is just for demonstration purposes
import { ARCClient } from './mock-arc-client';

async function main() {
  // Initialize ARC Compass client
  const compass = new ARCCompassClient({
    endpoint: 'https://compass.arcprotocol.ai',
    apiKey: 'your-api-key'
  });

  // Search for agents based on a user query
  console.log("Searching for agents to handle 'Create a photorealistic image of a mountain landscape'...");
  const searchResult = await compass.search({
    query: "Create a photorealistic image of a mountain landscape",
    maxResults: 3
  });

  console.log(`Found ${searchResult.totalFound} matching agents`);
  console.log("Query Analysis:");
  console.log(`- Intent: ${searchResult.queryAnalysis.intent}`);
  console.log(`- Required capabilities: ${searchResult.queryAnalysis.requiredCapabilities.join(', ')}`);
  console.log(`- Complexity: ${searchResult.queryAnalysis.complexity}`);
  
  console.log("\nTop matching agents:");
  for (const agent of searchResult.agents) {
    console.log(`\n${agent.name} (Relevance: ${agent.relevanceScore.toFixed(2)})`);
    console.log(`Description: ${agent.description}`);
    console.log(`Skills: ${agent.skills.map(skill => skill.name).join(', ')}`);
  }
  
  // Select the top-ranked agent
  if (searchResult.agents.length > 0) {
    const topAgent = searchResult.agents[0];
    console.log(`\n\nConnecting directly to top agent: ${topAgent.name}`);
    
    // Create ARC Protocol client to communicate with the matched agent
    const arcClient = new ARCClient({
      endpoint: topAgent.url,
      requestAgent: "my-agent-id",
      targetAgent: topAgent.agentId,
      token: "your-oauth2-token"
    });
    
    // Start a task with the matched agent
    console.log("Creating task with the matched agent...");
    const taskResult = await arcClient.task.create({
      initialMessage: {
        role: "user",
        parts: [{ 
          type: "TextPart", 
          content: "Create a photorealistic image of a mountain landscape" 
        }]
      }
    });
    
    console.log(`Task created with ID: ${taskResult.task.taskId}`);
    
    // Get task info
    console.log("Checking task status...");
    const taskInfo = await arcClient.task.info({
      taskId: taskResult.task.taskId
    });
    
    console.log(`Task status: ${taskInfo.task.status}`);
    
    // In a real implementation, you would wait for the task to complete
    // and then process the results
    
    console.log("\nDemonstration of direct communication with matched agent completed.");
  } else {
    console.log("\nNo agents found for the query.");
  }
  
  // Example of finding multiple agents and communicating with each
  console.log("\n\nFinding multiple agents for complex task...");
  const multiAgentResult = await compass.search({
    query: "Create a comprehensive report on climate change impacts in coastal cities",
    maxResults: 3
  });
  
  if (multiAgentResult.agents.length > 0) {
    console.log(`Found ${multiAgentResult.agents.length} agents for the complex task`);
    
    // Communicate with each matched agent
    for (const agent of multiAgentResult.agents) {
      console.log(`\nConnecting to agent: ${agent.name}`);
      
      // Create ARC Protocol client for this agent
      const arcClient = new ARCClient({
        endpoint: agent.url,
        requestAgent: "my-agent-id",
        targetAgent: agent.agentId,
        token: "your-oauth2-token"
      });
      
      // Customize the query based on the agent's specialization
      let customQuery = "Create a comprehensive report on climate change impacts in coastal cities";
      if (agent.skills.some(skill => skill.name.toLowerCase().includes("data"))) {
        customQuery += " with focus on data analysis and statistics";
      } else if (agent.skills.some(skill => skill.name.toLowerCase().includes("visual"))) {
        customQuery += " with focus on visualization and maps";
      }
      
      console.log(`Sending customized query: "${customQuery}"`);
      
      // In a real implementation, you would send the task and process the results
    }
    
    console.log("\nIn a real implementation, you would combine the results from all agents.");
  }
}

main().catch(console.error);