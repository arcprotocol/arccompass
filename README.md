# ARC Compass - Intelligent Agent Routing System

[![GitHub license](https://img.shields.io/github/license/arcprotocol/arccompass)](https://github.com/arcprotocol/arccompass/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/arcprotocol/arccompass/blob/main/CONTRIBUTING.md)

**ARC Compass** is an intelligent routing layer for agent ecosystems that directs queries to the most appropriate agents based on their capabilities, availability, and performance. Built on top of the ARC Protocol and ARC Ledger, it serves as the "search engine" for the agent web, enabling seamless discovery and orchestration of specialized agents.

## The Vision

In the rapidly evolving landscape of AI agents, we're facing a challenge similar to the early days of the World Wide Web: a growing collection of powerful but disconnected specialized agents. ARC Compass solves this by providing an intelligent routing mechanism that connects these islands of functionality into a cohesive, searchable network.

## How It Works

ARC Compass sits as an intelligent layer between agent requests and the agent discovery system:

```
User → Agent A → ARC Compass → ARC Ledger → Results → Agent A → Direct Communication with Matched Agents → User
```

1. **Query Analysis**: When an agent receives a query it can't fully handle, it forwards the query to ARC Compass
2. **Agent Discovery**: ARC Compass consults the ARC Ledger to identify all available agents
3. **Intelligent Matching**: Using advanced LLM capabilities, ARC Compass evaluates which agents are best suited to handle specific aspects of the query
4. **Results Return**: ARC Compass returns the ranked list of best-matching agents to the original Agent A
5. **Direct Communication**: Agent A then uses the ARC Protocol to communicate directly with the matched agents
6. **Response to User**: Agent A delivers the final results to the user

## Key Features

- **Intelligent Agent Selection**: Matches queries to the most appropriate agents based on capabilities, performance history, and availability
- **Real-time Search**: Provides fast, real-time agent search results
- **Agent Ranking**: Ranks agents by relevance to the specific query
- **Agent-to-Agent Facilitation**: Enables direct communication between agents after discovery
- **Continuous Learning**: Improves routing decisions based on feedback and performance metrics
- **Scalable Architecture**: Designed to handle millions of agents and queries
- **Agent-Agnostic**: Works with any agent that implements the ARC Protocol

## Architecture Components

### Core Components

- **Query Analyzer**: Processes incoming queries to understand intent and requirements
- **Agent Matcher**: Identifies the optimal agents for a given query based on multiple factors
- **Relevance Ranker**: Ranks agents by their relevance to the specific query
- **Feedback Loop**: Collects performance metrics to improve future routing decisions

### Integration Points

- **ARC Protocol**: Communication layer for agent-to-agent interactions
- **ARC Ledger**: Agent discovery and metadata repository
- **Agent Registry API**: Interface for registering and updating agent capabilities
- **Query API**: Interface for submitting queries to the routing system
- **Admin Dashboard**: Tools for monitoring and optimizing the routing system

## Use Cases

### Meta-Agent Creation

Create powerful meta-agents that leverage specialized capabilities across the agent ecosystem:

```typescript
// Example: A meta-agent that handles complex research tasks
const researchAssistant = new ARCAgent({
  name: "research-assistant",
  compass: arcCompassClient
});

// Find specialized agents for research tasks
const matchedAgents = await researchAssistant.findAgents("Create a comprehensive report on climate change impacts in coastal cities");

// Directly communicate with the matched agents using ARC Protocol
const report = await researchAssistant.communicateWithAgents(matchedAgents, "Create a comprehensive report on climate change impacts in coastal cities");
```

### Dynamic Agent Networks

Build flexible networks of agents that collaborate on complex tasks:

```typescript
// Example: A system that assembles the right team of agents for each task
const projectManager = new ARCCompassClient({
  endpoint: 'https://compass.arcprotocol.ai',
  apiKey: 'your-api-key'
});

// Search for agents with specific capabilities
const matchedAgents = await projectManager.search({
  query: "Design a sustainable urban transportation system",
  maxResults: 5
});

// Connect with the matched agents directly
const arcClient = new ARCClient({
  endpoint: matchedAgents[0].url,
  requestAgent: "project-manager",
  targetAgent: matchedAgents[0].agentId
});

// Start communication with the matched agent
const result = await arcClient.task.create({
  initialMessage: {
    role: "user",
    parts: [{ type: "TextPart", content: "Design a sustainable urban transportation system" }]
  }
});
```

### Agent Marketplace

Enable discovery and utilization of specialized agents:

```typescript
// Example: Finding the best agent for a specific task
const availableAgents = await arcCompass.search({
  query: "Generate photorealistic images of architectural concepts",
  maxResults: 5
});

// Display ranked list of agents to the user
console.log("Top agents for your task:");
availableAgents.agents.forEach((agent, index) => {
  console.log(`${index + 1}. ${agent.name} (Score: ${agent.relevanceScore.toFixed(2)})`);
  console.log(`   ${agent.description}`);
});

// User selects an agent, then communicate directly with it
const selectedAgent = availableAgents.agents[0];
```

## Getting Started

### Installation

```bash
npm install arc-compass
```

### Basic Usage

```typescript
import { ARCCompassClient } from 'arc-compass';
import { ARCClient } from 'arc-protocol';

// Initialize ARC Compass client
const compass = new ARCCompassClient({
  endpoint: 'https://compass.arcprotocol.ai',
  apiKey: 'your-api-key'
});

// Search for the best agents for a specific query
const searchResult = await compass.search({
  query: "Create a business plan for a sustainable fashion startup",
  maxResults: 3
});

console.log(`Found ${searchResult.agents.length} relevant agents`);

// Connect directly with the top matched agent using ARC Protocol
const topAgent = searchResult.agents[0];
const arcClient = new ARCClient({
  endpoint: topAgent.url,
  requestAgent: "my-agent-id",
  targetAgent: topAgent.agentId
});

// Start communication with the matched agent
const taskResult = await arcClient.task.create({
  initialMessage: {
    role: "user",
    parts: [{ type: "TextPart", content: "Create a business plan for a sustainable fashion startup" }]
  }
});

console.log(`Task created with ID: ${taskResult.task.taskId}`);
```

## Contributing

We welcome contributions to ARC Compass! See our [contributing guide](./CONTRIBUTING.md) for details.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](./LICENSE) file for details.

## Related Projects

- [ARC Protocol](https://github.com/arcprotocol/arcprotocol) - Agent communication protocol
- [ARC Ledger](https://github.com/arcprotocol/arcledger) - Agent discovery system