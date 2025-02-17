import express, { Express, Request, Response } from 'express';
import { SystemMessage, HumanMessage, AIMessage } from '@langchain/core/messages';
import { ChatResponse } from './ChatResponse';
import { ApiRoutes } from './ApiRoutes';
import { ChatHandler, ChatRequest, NativeChatMessage } from '../models/ChatModels';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';

/**
 * Class representing the API facade for handling chat requests and responses.
 * This class sets up the necessary routes and middleware for the Express application
 * to handle chat requests from Ollama clients and stream responses back to them.
 */
export class OllamaApiFacade {
  MODEL_NAME = '';
  DEFAULT_PORT = 11434;
  private apiRoutes: ApiRoutes;

  constructor(
    private app: Express,
    private baseChatModel: BaseChatModel,
    modelName: string
  ) {
    this.MODEL_NAME = modelName;
    this.apiRoutes = new ApiRoutes(app, modelName);

    this.applyMiddleware(app);
  }

  private applyMiddleware(app: Express) {
    app.use(express.json());
  }

  /**
   * Sets up the POST /api/chat route to handle chat requests from Ollama clients.
   * @param {ChatHandler} chatHandler - The handler function to process chat requests.
   */
  public postApiChat(chatHandler: ChatHandler) {
    this.app.post('/api/chat', async (request: Request, response: Response) => {
      const chatRequest: ChatRequest = request.body;

      chatRequest.messages = request.body.messages.map((nativeChatMessage: NativeChatMessage) => {
        switch (nativeChatMessage.role) {
          case 'system':
            return new SystemMessage(nativeChatMessage.content);
          case 'user':
            return new HumanMessage(nativeChatMessage.content);
          case 'assistant':
            return new AIMessage(nativeChatMessage.content);
          default:
            throw new Error(`Unknown role: ${nativeChatMessage.role}`);
        }
      });

      const chatResponse = new ChatResponse(response);

      await chatHandler(chatRequest, this.baseChatModel, chatResponse);
    });
  }

  /**
   * Starts the Express server and listens on the default Ollama API port 11434.
   * @param {Function} [callback] - Optional callback function to execute once the server is running.
   * @returns {Server} - The HTTP server instance.
   */
  public listen(callback?: (address: string) => void) {
    const server = this.app.listen(this.DEFAULT_PORT, () => {
      const address = `http://localhost:${this.DEFAULT_PORT}`;

      if (callback) {
        callback(address);
      } else {
        console.log(`✅ Server running at ${address}`);
      }
    });

    return server;
  }
}
