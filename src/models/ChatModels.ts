import { BaseMessage, HumanMessage } from '@langchain/core/messages';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { ChatResponse } from '../core/ChatResponse';
import { addSystemMessage, lastHumanMessage, replaceLastHumanMessage } from '../utils/MessageUtils';
import { ToolCallService } from '../core/ToolCallService';

/**
 * Class representing a chat request.
 * This is submitted by the Ollama client and automatically mapped to LangChain message objects.
 */
export class ChatRequest {
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

  constructor({
    chat_id,
    id,
    messages,
    model,
    options,
    session_id,
    stream,
  }: {
    chat_id: string;
    id: string;
    messages: BaseMessage[];
    model: string;
    options: { [key: string]: any };
    session_id: string;
    stream: boolean;
  }) {
    this.chat_id = chat_id;
    this.id = id;
    this.messages = messages;
    this.model = model;
    this.options = options;
    this.session_id = session_id;
    this.stream = stream;
  }

  /**
   * Adds a system message.
   * @param systemPrompt - The system message to be added.
   */
  addSystemMessage(systemPrompt: string): void {
    this.messages = addSystemMessage(this.messages, systemPrompt);
  }

  /**
   * Retrieves the last human message from the chat messages.
   * @returns {HumanMessage} - The last human message.
   */
  lastHumanMessage() {
    return lastHumanMessage(this.messages);
  }

  /**
   * Replaces the last human message in the chat messages.
   * @param {HumanMessage} humanMessage - The new human message to replace the last one.
   * @returns {BaseMessage[]} - The updated array of chat messages.
   */
  replaceLastHumanMessage(humanMessage: HumanMessage) {
    return replaceLastHumanMessage(this.messages, humanMessage);
  }
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
 * @param {ToolCallService} toolCallService - The service that handles tool calls.
 * @returns {Promise<void>} - A promise that resolves when the chat handling is complete.
 */
export type ChatHandler = (
  chatRequest: ChatRequest,
  chatModel: BaseChatModel,
  chatResponse: ChatResponse,
  toolCallService: ToolCallService
) => Promise<void>;
