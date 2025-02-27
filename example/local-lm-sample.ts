import express from 'express';
import { ChatOpenAI } from '@langchain/openai';
import { createOllamaApiFacade, createLMStudioConfig } from '../src';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { dateTimeTool } from './tools/dateTimeTool';

const chatOpenAI = new ChatOpenAI(
  createLMStudioConfig({
    httpAgent: new HttpsProxyAgent('http://localhost:8080'),
  })
);
const tools = [dateTimeTool];

const app = express();
const ollamaApi = createOllamaApiFacade(app, chatOpenAI);

ollamaApi.postApiChat(async (chatRequest, chatModel, chatResponse, toolCallService) => {
  chatRequest.addSystemMessage(`You are a helpful Devbot. 
    You have a dateTimeTool registered, execute it when asked about the time / date / day.
    `);

  const response = await toolCallService.with(tools).invoke(chatRequest.messages);

  chatResponse.asStream(response);
});

ollamaApi.listen();
