import { BaseMessage } from '@langchain/core/messages';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { ChatResponse } from '../core/ChatResponse';

/**
 * Interface representing a chat request.
 * This is submitted by the Ollama client and automatically mapped to LangChain message objects.
 */
export interface ChatRequest {
  /**
   * The chat ID.
   */
  chat_id: string;

  /**
   * The request ID.
   */
  id: string;

  /**
   * An array of chat messages based on LangChain message types sent by the client.
   */
  messages: BaseMessage[];

  /**
   * The model to be used for the chat.
   */
  model: string;

  /**
   * Additional options for the chat request.
   */
  options: { [key: string]: any };

  /**
   * The session ID.
   */
  session_id: string;

  /**
   * Indicates whether the response should be streamed.
   */
  stream: boolean;
}

/**
 * Interface representing a native chat message.
 */
export interface NativeChatMessage {
  /**
   * The role of the message sender (e.g., system, user, assistant).
   */
  role: string;

  /**
   * The content of the message.
   */
  content: string;
}

/**
 * Type representing a chat handler function.
 * @param {ChatRequest} chatRequest - The chat request object submitted by the Ollama client.
 * @param {BaseChatModel} chatModel - The LangChain chat model service used to communicate with the language model.
 * @param {ChatResponse} chatResponse - The proxy that streams LangChain incoming messages back to the client.
 * @returns {Promise<void>} - A promise that resolves when the chat handling is complete.
 */
export type ChatHandler = (
  chatRequest: ChatRequest,
  chatModel: BaseChatModel,
  chatResponse: ChatResponse
) => Promise<void>;
