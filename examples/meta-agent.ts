/**
 * ARC Compass - Meta-Agent Example
 * 
 * This example demonstrates how to create a meta-agent that leverages specialized capabilities
 * across the agent ecosystem.
 */

import { ARCCompassClient } from '../src';

// Simplified meta-agent class for demonstration
class ARCAgent {
  private name: string;
  private compass: ARCCompassClient;
  private enhanceWith: string[];
  
  constructor(options: {
    name: string;
    compass: ARCCompassClient;
    enhanceWith?: string[];
  }) {
    this.name = options.name;
    this.compass = options.compass;
    this.enhanceWith = options.enhanceWith || [];
  }
  
  async process(query: string): Promise<string> {
    console.log(`[${this.name}] Processing query: ${query}`);
    console.log(`[${this.name}] Enhancing with capabilities: ${this.enhanceWith.join(', ')}`);
    
    // Route the query through ARC Compass
    const result = await this.compass.route({
      query,
      preferredAgents: this.enhanceWith,
      synthesizeResults: true
    });
    
    console.log(`[${this.name}] Agents consulted: ${result.agentsUsed.join(', ')}`);
    return result.synthesizedResponse;
  }
}

async function main() {
  // Initialize ARC Compass client
  const compass = new ARCCompassClient({
    endpoint: 'https://compass.arcprotocol.ai',
    apiKey: 'your-api-key'
  });
  
  // Create a meta-agent for research tasks
  const researchAssistant = new ARCAgent({
    name: "research-assistant",
    compass,
    enhanceWith: ["academic-search", "data-visualization", "fact-checking"]
  });
  
  // Process a complex research query
  const report = await researchAssistant.process(
    "Create a comprehensive report on climate change impacts in coastal cities"
  );
  
  console.log("\nGenerated Report:");
  console.log(report);
}

main().catch(console.error);
