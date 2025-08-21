/**
 * Agent Matcher
 * 
 * Matches queries to the most appropriate agents based on capabilities.
 * Uses ARC Ledger to find agents and ranks them by relevance to the query.
 */

import { Agent, RankedAgent, AgentCapability, QueryAnalysis } from '../models/types';

/**
 * Service for matching queries to appropriate agents
 */
export class AgentMatcher {
  private ledgerService: any; // Will be properly typed when Ledger service is implemented
  
  /**
   * Create a new agent matcher
   * 
   * @param ledgerService Service for interacting with ARC Ledger
   */
  constructor(ledgerService: any) {
    this.ledgerService = ledgerService;
  }
  
  /**
   * Find the best agents for a given query
   * 
   * @param query The user query
   * @param queryAnalysis Analysis of the query
   * @param preferredAgents Preferred agents to prioritize
   * @param maxResults Maximum number of agents to return
   * @returns Ranked list of matching agents
   */
  async findBestAgents(
    query: string,
    queryAnalysis: QueryAnalysis,
    preferredAgents: string[] = [],
    maxResults: number = 5
  ): Promise<RankedAgent[]> {
    try {
      // 1. Find agents with required capabilities
      const agents = await this.findAgentsByCapabilities(
        queryAnalysis.requiredCapabilities
      );
      
      if (agents.length === 0) {
        return [];
      }
      
      // 2. Rank agents by relevance to the query
      const rankedAgents = await this.rankAgentsByRelevance(
        agents,
        query,
        queryAnalysis
      );
      
      // 3. Prioritize preferred agents
      const prioritizedAgents = this.prioritizePreferredAgents(
        rankedAgents,
        preferredAgents
      );
      
      // 4. Limit to maximum number of results
      return prioritizedAgents.slice(0, maxResults);
    } catch (error) {
      console.error("Error finding best agents:", error);
      return [];
    }
  }
  
  /**
   * Find agents with specific capabilities
   * 
   * @param capabilities Required capabilities
   * @returns List of agents with matching capabilities
   */
  private async findAgentsByCapabilities(capabilities: string[]): Promise<Agent[]> {
    try {
      // In a real implementation, this would query the ARC Ledger
      // This is a placeholder implementation
      return [];
    } catch (error) {
      console.error("Error finding agents by capabilities:", error);
      return [];
    }
  }
  
  /**
   * Rank agents by relevance to the query
   * 
   * @param agents List of agents to rank
   * @param query The user query
   * @param queryAnalysis Analysis of the query
   * @returns Ranked list of agents
   */
  private async rankAgentsByRelevance(
    agents: Agent[],
    query: string,
    queryAnalysis: QueryAnalysis
  ): Promise<RankedAgent[]> {
    // This is a placeholder implementation
    // In a real implementation, this would use more sophisticated ranking algorithms
    
    return agents.map(agent => {
      // Calculate a simple relevance score
      const hasRequiredCapabilities = queryAnalysis.requiredCapabilities.every(
        capability => agent.capabilities?.[capability]
      );
      
      const hasOptionalCapabilities = queryAnalysis.optionalCapabilities.filter(
        capability => agent.capabilities?.[capability]
      ).length;
      
      const optionalCapabilitiesScore = 
        queryAnalysis.optionalCapabilities.length > 0
          ? hasOptionalCapabilities / queryAnalysis.optionalCapabilities.length
          : 0;
      
      // Base score on required capabilities (0.7 weight) and optional capabilities (0.3 weight)
      const relevanceScore = hasRequiredCapabilities
        ? 0.7 + (0.3 * optionalCapabilitiesScore)
        : 0.3 * optionalCapabilitiesScore;
      
      return {
        agentId: agent.agentId,
        name: agent.name,
        description: agent.description,
        relevanceScore,
        capabilities: this.mapCapabilities(agent),
        skills: agent.skills || []
      };
    }).sort((a, b) => b.relevanceScore - a.relevanceScore);
  }
  
  /**
   * Prioritize preferred agents in the results
   * 
   * @param rankedAgents Ranked list of agents
   * @param preferredAgents List of preferred agent IDs
   * @returns Re-ranked list with preferred agents prioritized
   */
  private prioritizePreferredAgents(
    rankedAgents: RankedAgent[],
    preferredAgents: string[]
  ): RankedAgent[] {
    if (!preferredAgents.length) {
      return rankedAgents;
    }
    
    // Boost the relevance score of preferred agents
    return rankedAgents.map(agent => {
      if (preferredAgents.includes(agent.agentId)) {
        // Boost the score, but keep it <= 1.0
        const boostedScore = Math.min(agent.relevanceScore + 0.2, 1.0);
        return { ...agent, relevanceScore: boostedScore };
      }
      return agent;
    }).sort((a, b) => b.relevanceScore - a.relevanceScore);
  }
  
  /**
   * Map agent capabilities to the standard format
   * 
   * @param agent Agent to map capabilities for
   * @returns List of agent capabilities
   */
  private mapCapabilities(agent: Agent): AgentCapability[] {
    if (!agent.capabilities) {
      return [];
    }
    
    return Object.entries(agent.capabilities)
      .filter(([_, enabled]) => enabled)
      .map(([name]) => ({
        name,
        description: `${name} capability`,
        confidence: 1.0
      }));
  }
}