import { SystemMessage, BaseMessage } from '@langchain/core/messages';

/**
 * Adds a system message to the chat history.
 *
 * @param {BaseMessage[]} messages - The message array to extend.
 * @param {string} message - The system message content.
 */
export function addSystemMessage(messages: BaseMessage[], message: string): BaseMessage[] {
  if (messages.length === 0) {
    messages.push(new SystemMessage(message));
  } else if (messages[0] instanceof SystemMessage) {
    messages[0] = new SystemMessage(message);
  } else {
    messages = [new SystemMessage(message), ...messages];
  }

  return messages;
}
