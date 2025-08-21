/**
 * ARC Compass Types
 * 
 * Type definitions for the ARC Compass system.
 */

/**
 * Options for searching agents through ARC Compass
 */
export interface SearchOptions {
  /**
   * The user query to find relevant agents for
   */
  query: string;
  
  /**
   * List of preferred agents to prioritize in results (if available)
   */
  preferredAgents?: string[];
  
  /**
   * Maximum number of agents to return
   */
  maxResults?: number;
  
  /**
   * Minimum relevance score threshold (0-1)
   */
  minRelevanceScore?: number;
  
  /**
   * Additional context to improve agent matching
   */
  context?: Record<string, any>;
}

/**
 * Results from an agent search operation
 */
export interface SearchResult {
  /**
   * Ranked list of agents matching the query
   */
  agents: RankedAgent[];
  
  /**
   * Total number of matching agents
   */
  totalFound: number;
  
  /**
   * Analysis of the query intent and requirements
   */
  queryAnalysis: QueryAnalysis;
}

/**
 * Agent with relevance ranking
 */
export interface RankedAgent {
  /**
   * ID of the agent
   */
  agentId: string;
  
  /**
   * Name of the agent
   */
  name: string;
  
  /**
   * Description of the agent
   */
  description: string;
  
  /**
   * Relevance score (0-1) indicating how well the agent matches the query
   */
  relevanceScore: number;
  
  /**
   * Capabilities provided by this agent
   */
  capabilities: AgentCapability[];
  
  /**
   * Skills provided by this agent
   */
  skills: AgentSkill[];
}

/**
 * Options for routing a query through ARC Compass
 */
export interface RouteOptions {
  /**
   * The query to route to appropriate agents
   */
  query: string;
  
  /**
   * List of preferred agents to use (if available)
   */
  preferredAgents?: string[];
  
  /**
   * Maximum number of agents to consult
   */
  maxAgents?: number;
  
  /**
   * Whether to synthesize results from multiple agents
   */
  synthesizeResults?: boolean;
  
  /**
   * Additional context to provide to agents
   */
  context?: Record<string, any>;
}

/**
 * Results from a routing operation
 */
export interface RouteResult {
  /**
   * List of agents that were used to process the query
   */
  agentsUsed: string[];
  
  /**
   * Combined and enhanced response from all agents
   */
  synthesizedResponse: string;
  
  /**
   * Raw responses from individual agents
   */
  rawResponses: AgentResponse[];
}

/**
 * Response from an individual agent
 */
export interface AgentResponse {
  /**
   * ID of the agent that provided the response
   */
  agentId?: string;
  
  /**
   * The agent's response content
   */
  content?: any;
  
  /**
   * Any error that occurred when consulting the agent
   */
  error?: string;
}

/**
 * Search criteria for finding agents
 */
export interface AgentSearchCriteria {
  /**
   * Required capabilities
   */
  capabilities?: string[];
  
  /**
   * Required skills
   */
  skills?: string[];
  
  /**
   * Agent category
   */
  category?: string;
  
  /**
   * Tags to match
   */
  tags?: string[];
  
  /**
   * Maximum cost per request
   */
  maxCost?: number;
  
  /**
   * Minimum reliability score
   */
  minReliability?: number;
}

/**
 * Agent capability descriptor
 */
export interface AgentCapability {
  /**
   * Name of the capability
   */
  name: string;
  
  /**
   * Description of what the capability does
   */
  description: string;
  
  /**
   * Confidence score (0-1) for this capability
   */
  confidence?: number;
  
  /**
   * Additional metadata about the capability
   */
  metadata?: Record<string, any>;
}

/**
 * Agent skill descriptor
 */
export interface AgentSkill {
  /**
   * Name of the skill
   */
  name: string;
  
  /**
   * Description of what the skill does
   */
  description: string;
}

/**
 * Results of query analysis
 */
export interface QueryAnalysis {
  /**
   * The detected primary intent of the query
   */
  intent: string;
  
  /**
   * Capabilities required to fulfill the query
   */
  requiredCapabilities: string[];
  
  /**
   * Capabilities that would enhance the response but aren't required
   */
  optionalCapabilities: string[];
  
  /**
   * Estimated complexity score (0-1)
   */
  complexity: number;
}

/**
 * Results from a workflow execution
 */
export interface WorkflowResult {
  /**
   * Status of the workflow execution
   */
  status: 'completed' | 'partial' | 'failed';
  
  /**
   * Combined response from the workflow
   */
  response: string;
  
  /**
   * List of agents used in the workflow
   */
  agentsUsed: string[];
  
  /**
   * Steps in the workflow execution
   */
  steps: WorkflowStep[];
}

/**
 * Step in a workflow execution
 */
export interface WorkflowStep {
  /**
   * ID of the agent that executed the step
   */
  agentId: string;
  
  /**
   * Task assigned to the agent
   */
  task: string;
  
  /**
   * Status of the step execution
   */
  status: 'completed' | 'failed';
  
  /**
   * Response from the agent
   */
  response?: string;
  
  /**
   * Error that occurred during execution
   */
  error?: string;
}

/**
 * Basic agent information
 */
export interface Agent {
  /**
   * ID of the agent
   */
  agentId: string;
  
  /**
   * Name of the agent
   */
  name: string;
  
  /**
   * Description of the agent
   */
  description: string;
  
  /**
   * URL of the agent
   */
  url: string;
  
  /**
   * Provider information
   */
  provider: {
    /**
     * Organization that provides the agent
     */
    organization: string;
  };
  
  /**
   * Capabilities provided by this agent
   */
  capabilities?: Record<string, boolean>;
  
  /**
   * Skills provided by this agent
   */
  skills?: AgentSkill[];
}