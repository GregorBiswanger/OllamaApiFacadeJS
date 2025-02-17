# **🚀 OllamaApiFacadeJS - For Express.js with LangChainJS**

**OllamaApiFacadeJS** is an open-source **Node.js** library designed to seamlessly integrate an **Express.js backend** with the **Ollama API** using **LangChainJS**. This allows clients expecting an Ollama-compatible backend - such as [Open WebUI](https://github.com/open-webui/open-webui) - to interact with your **Express.js API** effortlessly.

It serves as a **Node.js counterpart** to the [**.NET-based OllamaApiFacade**](https://github.com/GregorBiswanger/OllamaApiFacade), providing a similar level of integration but optimized for the JavaScript/TypeScript ecosystem.

## **✨ Features**

✅ **Ollama-Compatible API for Express.js** – Easily expose your Express backend as an Ollama API.  
✅ **Supports Local AI Models (e.g., LM Studio)** – Works with local inference engines like **LM Studio**.  
✅ **Seamless Integration with LangChainJS** – Enables natural language processing with LangChainJS.  
✅ **Streaming Support** – Stream AI-generated responses directly to clients.  
✅ **Custom Model Names** – Configure custom model names for full flexibility.  
✅ **Optimized for TypeScript** – Includes full TypeScript support (`.d.ts` files) for better IntelliSense.  

## **📦 Installation**

You can install OllamaApiFacadeJS via NPM or PNPM:

```sh
pnpm add ollama-api-facade-js
```

or

```sh
npm install ollama-api-facade-js
```

## **🛠 Getting Started**

### **1️⃣ Prerequisites**

- **Node.js 18+**
- **Express.js**
- **LangChainJS**
- **LM Studio or another local LLM provider** (optional)

### **2️⃣ Basic Express.js Example**

Here’s how to integrate OllamaApiFacadeJS into an **Express.js application**:

```ts
import express from 'express';
import { ChatOpenAI } from '@langchain/openai';
import createOllamaApiFacade from 'ollama-api-facade-js';

const chatOpenAI = new ChatOpenAI({
  apiKey: 'none',
  configuration: {
    baseURL: 'http://localhost:1234/v1', // LM Studio Endpoint
  },
});

const app = express();
const ollamaApi = createOllamaApiFacade(app, chatOpenAI);

ollamaApi.postApiChat(async (chatRequest, chatModel, chatResponse) => {
    const result = await chatModel.invoke(chatRequest.messages);
    chatResponse.asStream(result);
});

ollamaApi.listen();
```

📌 **What does this setup do?**

- **Creates an Express.js server.**
- **Initializes the Ollama API facade using LangChainJS.**
- **Handles AI chat requests with streaming responses.**
- **Starts the server on `http://localhost:11434` (default Ollama port).**

## **📡 Running Open WebUI with Docker**

After setting up your **Express.js backend**, you can integrate it with **Open WebUI** by running:

```sh
docker run -d -p 8080:8080 --add-host=host.docker.internal:host-gateway --name open-webui ghcr.io/open-webui/open-webui:main
```

➡ Open WebUI will now be accessible at:  
**<http://localhost:8080>**  

For advanced configurations (e.g., GPU support), refer to the official [Open WebUI GitHub repo](https://github.com/open-webui/open-webui).

## **🏷️ Customizing Model Names**

By default, the API uses the model name `"nodeapi"`. To specify a **custom model name**, pass it as an argument:

```ts
const ollamaApi = createOllamaApiFacade(app, chatOpenAI, "my-custom-model");
```

## **📡 Streaming AI Responses**

OllamaApiFacadeJS supports **streaming responses** to **improve response times** and **user experience**:

```ts
ollamaApi.postApiChat(async (chatRequest, chatModel, chatResponse) => {
    const result = await chatModel.stream(chatRequest.messages);
    chatResponse.asStream(result); // Handles both streams & single responses
});
```

💡 **Automatically detects whether streaming is supported** and adapts accordingly.

## **🐞 Debugging & Logging**

To debug request/response communication, enable **JSON request logging** with the built-in middleware:

```ts
import { jsonRequestLogger } from 'ollama-api-facade-js/middlewares';

app.use(jsonRequestLogger);
```

📌 **Logs Request & Response Data**  
✅ HTTP Method & URL  
✅ Request Headers & Body  
✅ Response Status & Body  

This helps **troubleshoot API interactions** easily.

## **🤝 Contributing**

We welcome **contributions** from the community!  
To contribute:

1. **Fork** the repo.
2. **Create a branch** (`feature/new-feature`).
3. **Commit your changes** & **push the branch**.
4. **Submit a pull request** for review.

## **📄 License**

This project is licensed under the **MIT License**.

💡 **Created by Gregor Biswanger – Microsoft MVP for Azure AI & Web App Development**.

## **🙏 Acknowledgments**

- [LangChainJS](https://js.langchain.com/)
- [Open WebUI](https://openwebui.com)
- [LM Studio](https://lmstudio.ai/)

### **🚀 Ready to build your AI-powered Express.js backend? Get started today!**

If you have questions, feel free to **open an issue** on GitHub.  

## **🔥 Summary**

✅ **This README follows best practices**  
✅ **Clear structure with installation, usage, and advanced setup**  
✅ **Code snippets are formatted & easy to follow**  
✅ **Includes streaming, debugging, and customization options**  
✅ **Encourages contributions & community engagement**  

Let me know if you need any refinements! 🚀🔥
