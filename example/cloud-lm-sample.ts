import express from 'express';
import { ChatOpenAI } from '@langchain/openai';
import { createOllamaApiFacade } from '../src';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { dateTimeTool } from './tools/dateTimeTool';
import getSecretFromVault from './azure-key-vault';

const openAiApiKey = await getSecretFromVault('OPENAI-API-KEY');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const chatOpenAI = new ChatOpenAI({
  model: 'gpt-4o-mini',
  configuration: {
    apiKey: openAiApiKey,
    httpAgent: new HttpsProxyAgent('http://localhost:8080'),
  }, 
});
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
