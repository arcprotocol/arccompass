/**
 * ARC Compass Types
 * 
 * Type definitions for the ARC Compass system.
 */

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
