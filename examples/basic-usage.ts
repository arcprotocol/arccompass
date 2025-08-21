/**
 * ARC Compass - Basic Usage Example
 * 
 * This example demonstrates how to use ARC Compass as an agent search engine.
 */

import { ARCCompassClient } from '../src';

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
  
  // Route a query to the best available agents
  console.log("\n\nRouting query to best agents...");
  const routeResult = await compass.route({
    query: "Create a photorealistic image of a mountain landscape",
    maxAgents: 2,
    synthesizeResults: true
  });

  console.log(`Agents used: ${routeResult.agentsUsed.join(', ')}`);
  console.log(`Combined response: ${routeResult.synthesizedResponse}`);
  
  // Find agents with specific criteria
  console.log("\n\nFinding image generation agents...");
  const imageAgents = await compass.findAgents({
    capabilities: ["image_generation"],
    minReliability: 0.9
  });

  console.log(`Found ${imageAgents.length} image generation agents`);
  for (const agent of imageAgents) {
    console.log(`- ${agent.name} (${agent.provider.organization})`);
  }
}

main().catch(console.error);