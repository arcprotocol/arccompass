/**
 * Configuration Utility
 * 
 * Configuration management for ARC Compass.
 */

/**
 * ARC Compass configuration
 */
export interface CompassConfig {
  /**
   * ARC Compass API endpoint
   */
  endpoint: string;
  
  /**
   * API key for authentication
   */
  apiKey: string;
  
  /**
   * ARC Ledger configuration
   */
  ledger: {
    endpoint: string;
    apiKey: string;
  };
  
  /**
   * LLM configuration
   */
  llm: {
    provider: string;
    apiKey: string;
    model: string;
  };
  
  /**
   * Logging configuration
   */
  logging: {
    level: string;
    enableConsole: boolean;
    enableFile: boolean;
    filePath?: string;
  };
}

/**
 * Configuration manager for ARC Compass
 */
export class ConfigManager {
  private config: CompassConfig;
  
  /**
   * Create a new configuration manager
   * 
   * @param config Initial configuration
   */
  constructor(config: Partial<CompassConfig>) {
    this.config = {
      endpoint: config.endpoint || "https://compass.arcprotocol.ai",
      apiKey: config.apiKey || "",
      ledger: {
        endpoint: config.ledger?.endpoint || "https://ledger.arcprotocol.ai",
        apiKey: config.ledger?.apiKey || ""
      },
      llm: {
        provider: config.llm?.provider || "openai",
        apiKey: config.llm?.apiKey || "",
        model: config.llm?.model || "gpt-4"
      },
      logging: {
        level: config.logging?.level || "info",
        enableConsole: config.logging?.enableConsole !== false,
        enableFile: config.logging?.enableFile || false,
        filePath: config.logging?.filePath
      }
    };
  }
  
  /**
   * Get the current configuration
   * 
   * @returns Current configuration
   */
  getConfig(): CompassConfig {
    return this.config;
  }
  
  /**
   * Update the configuration
   * 
   * @param config New configuration values
   */
  updateConfig(config: Partial<CompassConfig>): void {
    this.config = {
      ...this.config,
      ...config,
      ledger: {
        ...this.config.ledger,
        ...config.ledger
      },
      llm: {
        ...this.config.llm,
        ...config.llm
      },
      logging: {
        ...this.config.logging,
        ...config.logging
      }
    };
  }
}
