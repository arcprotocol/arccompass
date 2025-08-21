/**
 * ARC Compass - Basic Usage Example
 * 
 * This example demonstrates how to use ARC Compass to route queries to appropriate agents.
 */

import { ARCCompassClient } from '../src';

async function main() {
  // Initialize ARC Compass client
  const compass = new ARCCompassClient({
    endpoint: 'https://compass.arcprotocol.ai',
    apiKey: 'your-api-key'
  });

  // Route a query to the best available agents
  const result = await compass.route({
    query: "Create a business plan for a sustainable fashion startup",
    preferredAgents: ["business-planner", "sustainability-expert"],
    maxAgents: 3,
    synthesizeResults: true
  });

  console.log(`Agents consulted: ${result.agentsUsed.join(', ')}`);
  console.log(`Combined response: ${result.synthesizedResponse}`);
  
  // Raw responses from individual agents
  console.log("\nRaw responses from agents:");
  for (const response of result.rawResponses) {
    console.log(`\nAgent: ${response.agentId}`);
    console.log(`Response: ${response.content || 'No content'}`);
    if (response.error) {
      console.log(`Error: ${response.error}`);
    }
  }
}

main().catch(console.error);
