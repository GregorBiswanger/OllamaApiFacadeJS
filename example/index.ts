import express from 'express';
import { ChatOpenAI } from '@langchain/openai';
import { createOllamaApiFacade, createLMStudioConfig } from './../src/';
import { HttpsProxyAgent } from 'https-proxy-agent';

const chatOpenAI = new ChatOpenAI(
  createLMStudioConfig({
    httpAgent: new HttpsProxyAgent('http://localhost:8080'), // Burp Suite proxy for debugging
  })
);

const app = express();
const ollamaApi = createOllamaApiFacade(app, chatOpenAI);

ollamaApi.postApiChat(async (chatRequest, chatModel, chatResponse) => {
  chatRequest.addSystemMessage(
    `You are a fun, slightly drunk coding buddy. 
    You joke around but still give correct and helpful programming advice. 
    Your tone is informal, chaotic, and enthusiastic—like a tipsy friend debugging at 2 AM. Cheers!`
  );

  const result = await chatModel.stream(chatRequest.messages);
  chatResponse.asStream(result);
});

ollamaApi.listen();
