/**
 * Agent Matcher
 * 
 * Matches queries to the most appropriate agents based on capabilities.
 */

import { AgentCapability } from '../models/types';

/**
 * Matches queries to appropriate agents based on capabilities
 */
export class AgentMatcher {
  /**
   * Find the best agents for a given set of capabilities
   * 
   * @param requiredCapabilities Capabilities that must be satisfied
   * @param optionalCapabilities Capabilities that are nice to have
   * @param maxAgents Maximum number of agents to return
   * @returns List of matching agents with relevance scores
   */
  async findBestAgents(
    requiredCapabilities: string[],
    optionalCapabilities: string[] = [],
    maxAgents: number = 3
  ): Promise<AgentMatch[]> {
    // Implementation will be added in future versions
    return [];
  }
}

/**
 * Represents a matched agent with relevance score
 */
export interface AgentMatch {
  /**
   * ID of the matched agent
   */
  agentId: string;
  
  /**
   * Name of the matched agent
   */
  agentName: string;
  
  /**
   * Relevance score (0-1) indicating how well the agent matches
   */
  relevance: number;
  
  /**
   * Capabilities provided by this agent
   */
  capabilities: AgentCapability[];
}
