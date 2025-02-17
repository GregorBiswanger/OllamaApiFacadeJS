import express from 'express';
import { ChatOpenAI } from '@langchain/openai';
// import createOllamaApiFacade from './../dist/';
import createOllamaApiFacade from './../src/';

const chatOpenAI = new ChatOpenAI({
  apiKey: 'none',
  configuration: {
    baseURL: 'http://localhost:1234/v1', // LM Studio Endpoint
  },
});

const app = express();
const ollamaApi = createOllamaApiFacade(app, chatOpenAI);

ollamaApi.postApiChat(async (chatRequest, chatModel, chatResponse) => {
    const result = await chatModel.stream(chatRequest.messages);
    chatResponse.asStream(result);
});

ollamaApi.listen();