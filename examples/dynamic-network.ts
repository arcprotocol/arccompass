/**
 * ARC Compass - Dynamic Agent Network Example
 * 
 * This example demonstrates how to build flexible networks of agents that collaborate on complex tasks.
 */

import { ARCCompassClient } from '../src';

// Simplified router class for demonstration
class ARCCompassRouter {
  private query: string;
  private requiredCapabilities: string[];
  private optionalCapabilities: string[];
  private compassClient: ARCCompassClient;
  
  constructor(options: {
    query: string;
    requiredCapabilities: string[];
    optionalCapabilities?: string[];
    compassClient: ARCCompassClient;
  }) {
    this.query = options.query;
    this.requiredCapabilities = options.requiredCapabilities;
    this.optionalCapabilities = options.optionalCapabilities || [];
    this.compassClient = options.compassClient;
  }
  
  async executeWorkflow(): Promise<any> {
    console.log(`Executing workflow for query: ${this.query}`);
    console.log(`Required capabilities: ${this.requiredCapabilities.join(', ')}`);
    console.log(`Optional capabilities: ${this.optionalCapabilities.join(', ')}`);
    
    // Find agents that match the required capabilities
    const availableAgents = await this.compassClient.findAgents({
      capabilities: this.requiredCapabilities
    });
    
    console.log(`Found ${availableAgents.length} agents with required capabilities`);
    
    // Route the query through ARC Compass
    const result = await this.compassClient.route({
      query: this.query,
      preferredAgents: availableAgents.map((agent: any) => agent.id),
      synthesizeResults: true
    });
    
    return {
      query: this.query,
      agentsUsed: result.agentsUsed,
      response: result.synthesizedResponse
    };
  }
}

async function main() {
  // Initialize ARC Compass client
  const compass = new ARCCompassClient({
    endpoint: 'https://compass.arcprotocol.ai',
    apiKey: 'your-api-key'
  });
  
  // Create a dynamic agent network for urban planning
  const projectManager = new ARCCompassRouter({
    query: "Design a sustainable urban transportation system",
    requiredCapabilities: ["urban-planning", "sustainability-analysis", "transportation-modeling"],
    optionalCapabilities: ["economic-impact", "visualization"],
    compassClient: compass
  });
  
  // Execute the workflow
  const results = await projectManager.executeWorkflow();
  
  console.log("\nWorkflow Results:");
  console.log(`Query: ${results.query}`);
  console.log(`Agents used: ${results.agentsUsed.join(', ')}`);
  console.log(`Response: ${results.response}`);
}

main().catch(console.error);
