export interface LMStudioConfig {
  baseURL?: string;
  httpAgent?: any;
}

/**
 * Factory function to generate a configuration object for LM-Studio.
 * Allows overriding `baseURL` and `httpAgent` if needed.
 * 
 * @param {LMStudioConfig} [options] - Optional configuration overrides.
 * @returns {object} - Configuration object for ChatOpenAI.
 */
export function createLMStudioConfig(options?: LMStudioConfig) {
  return {
    apiKey: 'none',
    configuration: {
      baseURL: options?.baseURL || 'http://localhost:1234/v1',
      httpAgent: options?.httpAgent
    },
  };
}
