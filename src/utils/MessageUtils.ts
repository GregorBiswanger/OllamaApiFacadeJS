import { SystemMessage, BaseMessage, HumanMessage } from '@langchain/core/messages';

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

/**
 * Returns the last human message from the chat history.
 *
 * @param {BaseMessage[]} messages - The message array to search.
 * @returns {HumanMessage | undefined} - The last human message or undefined if not found.
 */
export function lastHumanMessage(messages: BaseMessage[]): HumanMessage | undefined {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i] instanceof HumanMessage) {
      return messages[i] as HumanMessage;
    }
  }
}

/**
 * Replaces the last human message in the chat history with a new one.
 *
 * @param {BaseMessage[]} messages - The message array to modify.
 * @param {HumanMessage} newMessage - The new human message to replace the last one.
 * @returns {BaseMessage[]} - The updated message array.
 */
export function replaceLastHumanMessage(messages: BaseMessage[], newMessage: HumanMessage): BaseMessage[] {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i] instanceof HumanMessage) {
      messages[i] = newMessage;
      return messages;
    }
  }
  
  messages.push(newMessage);
  return messages;
}