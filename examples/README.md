# ARC Compass Examples

This directory contains examples demonstrating how to use ARC Compass in various scenarios.

## Basic Usage

[basic-usage.ts](./basic-usage.ts) - Demonstrates the basic usage of the ARC Compass client to route queries to appropriate agents.

```typescript
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
```

## Meta-Agent Creation

[meta-agent.ts](./meta-agent.ts) - Shows how to create a meta-agent that leverages specialized capabilities across the agent ecosystem.

```typescript
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
```

## Dynamic Agent Networks

[dynamic-network.ts](./dynamic-network.ts) - Demonstrates how to build flexible networks of agents that collaborate on complex tasks.

```typescript
// Create a dynamic agent network for urban planning
const projectManager = new ARCCompassRouter({
  query: "Design a sustainable urban transportation system",
  requiredCapabilities: ["urban-planning", "sustainability-analysis", "transportation-modeling"],
  optionalCapabilities: ["economic-impact", "visualization"],
  compassClient: compass
});

// Execute the workflow
const results = await projectManager.executeWorkflow();
```

## Running the Examples

To run these examples:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Run an example:
   ```bash
   npx ts-node examples/basic-usage.ts
   ```

Note: You'll need to replace `'your-api-key'` with your actual ARC Compass API key.
