/**
 * ARC Compass - Meta-Agent Example
 * 
 * This example demonstrates how to create a meta-agent that leverages specialized capabilities
 * across the agent ecosystem using ARC Compass for discovery and ARC Protocol for direct communication.
 */

import { ARCCompassClient } from '../src';
// In a real implementation, you would import from 'arc-protocol'
// This is just for demonstration purposes
import { ARCClient } from './mock-arc-client';

// Simplified meta-agent class for demonstration
class MetaAgent {
  private name: string;
  private compass: ARCCompassClient;
  private preferredAgentTypes: string[];
  
  constructor(options: {
    name: string;
    compass: ARCCompassClient;
    preferredAgentTypes?: string[];
  }) {
    this.name = options.name;
    this.compass = options.compass;
    this.preferredAgentTypes = options.preferredAgentTypes || [];
  }
  
  /**
   * Process a query by finding and communicating with specialized agents
   */
  async process(query: string): Promise<string> {
    console.log(`[${this.name}] Processing query: ${query}`);
    
    // Step 1: Use ARC Compass to find relevant agents
    console.log(`[${this.name}] Searching for relevant agents...`);
    const searchResult = await this.compass.search({
      query,
      maxResults: 3
    });
    
    console.log(`[${this.name}] Found ${searchResult.agents.length} relevant agents`);
    
    if (searchResult.agents.length === 0) {
      return "No suitable agents found to process your query.";
    }
    
    // Step 2: Communicate directly with each matched agent
    const responses: string[] = [];
    
    for (const agent of searchResult.agents) {
      console.log(`[${this.name}] Communicating with agent: ${agent.name}`);
      
      // Create ARC client to communicate with this agent
      const arcClient = new ARCClient({
        endpoint: agent.url,
        requestAgent: this.name,
        targetAgent: agent.agentId,
        token: "your-oauth2-token"
      });
      
      try {
        // Create a task with this agent
        const taskResult = await arcClient.task.create({
          initialMessage: {
            role: "user",
            parts: [{ type: "TextPart", content: query }]
          }
        });
        
        console.log(`[${this.name}] Created task ${taskResult.task.taskId} with agent ${agent.name}`);
        
        // In a real implementation, you would wait for the task to complete
        // and retrieve the results
        
        // Simulate getting a response
        const response = `Response from ${agent.name}: This is a simulated response to your query "${query}"`;
        responses.push(response);
      } catch (error) {
        console.error(`[${this.name}] Error communicating with agent ${agent.name}:`, error);
        responses.push(`Failed to get response from ${agent.name}`);
      }
    }
    
    // Step 3: Combine the responses
    // In a real implementation, you might use another agent to synthesize the responses
    return responses.join("\n\n");
  }
}

async function main() {
  // Initialize ARC Compass client
  const compass = new ARCCompassClient({
    endpoint: 'https://compass.arcprotocol.ai',
    apiKey: 'your-api-key'
  });
  
  // Create a meta-agent for research tasks
  const researchAssistant = new MetaAgent({
    name: "research-assistant",
    compass,
    preferredAgentTypes: ["academic-search", "data-visualization", "fact-checking"]
  });
  
  // Process a complex research query
  console.log("Submitting research query to meta-agent...");
  const result = await researchAssistant.process(
    "Create a comprehensive report on climate change impacts in coastal cities"
  );
  
  console.log("\nFinal Result:");
  console.log(result);
}

main().catch(console.error);