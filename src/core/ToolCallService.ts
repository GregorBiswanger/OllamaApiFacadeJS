import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { StructuredTool } from '@langchain/core/tools';
import { BaseMessage } from '@langchain/core/messages';

/**
 * ToolCallService acts as a Facade for handling LangChainJS tools.
 * It automatically binds tools to the chat model and processes tool calls.
 */
export class ToolCallService {
  private chatModel: BaseChatModel;
  private tools: StructuredTool[] = [];

  constructor(chatModel: BaseChatModel) {
    this.chatModel = chatModel;
  }

  /**
   * Registers tools and returns an instance that manages them.
   * @param {StructuredTool[]} tools - The tools to register.
   * @returns {{ invoke: (messages: BaseMessage[]) => Promise<AIMessageChunk> }} - New instance with tools bound.
   */
  with(tools: StructuredTool[]) {
    this.tools = tools;

    return { invoke: this.invoke.bind(this) };
  }

  /**
   * Invokes the chat model with automatic tool execution.
   * @param {BaseMessage[]} messages - The chat history.
   * @returns {Promise<AIMessageChunk>} - The final AI response.
   */
  private async invoke(messages: BaseMessage[]) {
    if (!this.chatModel || !this.chatModel.bindTools) {
      throw new Error('Chat model or bindTools method is undefined');
    }

    const modelWithTools = this.chatModel.bindTools(this.tools);
    let response = await modelWithTools.invoke(messages);

    if (response.tool_calls?.length) {
      for (const toolCall of response.tool_calls) {
        const tool = this.tools.find((t) => t.name === toolCall.name);
        if (tool) {
          const toolResult = await tool.invoke(toolCall);
          messages.push(toolResult);
        }
      }

      response = await modelWithTools.invoke(messages);
    }

    return response;
  }
}
