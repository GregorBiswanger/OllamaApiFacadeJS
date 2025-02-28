import { Express } from 'express';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { OllamaApiFacade } from './core/OllamaApiFacade';
import { ToolCallService } from './core/ToolCallService';

/**
 * Creates an instance of OllamaApiFacade.
 * This function sets up the necessary routes and middleware for the Express application
 * to handle chat requests from Ollama clients and stream responses back to them.
 * 
 * @param {Express} app - The Express application instance.
 * @param {BaseChatModel} baseChatModel - The base chat model to handle chat messages.
 * @param {string} [modelName='nodeapi'] - The name of the chat model.
 * @returns {OllamaApiFacade} - The created OllamaApiFacade instance.
 */
export function createOllamaApiFacade(
  app: Express,
  baseChatModel: BaseChatModel | any,
  modelName: string = 'nodeapi'
): OllamaApiFacade {
  const facade = new OllamaApiFacade(app, baseChatModel, modelName, new ToolCallService(baseChatModel));

  return facade;
}

export * from './models/ChatModels';
export * from './config/LMStudioConfig';
export * from './utils/MessageUtils';
export * from './core/ToolCallService';