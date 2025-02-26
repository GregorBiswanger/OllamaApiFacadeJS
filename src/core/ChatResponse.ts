import { Response } from 'express';
import { AIMessageChunk } from '@langchain/core/messages';
import { IterableReadableStream } from '@langchain/core/utils/stream';

/**
 * Class representing a chat response that streams LangChain data to the client.
 */
export class ChatResponse {
  constructor(private response: Response) {}

  /**
   * Streams LangChain data to the client as a series of chunks.
   * @param {string | AIMessageChunk | IterableReadableStream<AIMessageChunk>} streamSource - The source of the stream data.
   */
  async asStream(streamSource: string | AIMessageChunk | IterableReadableStream<AIMessageChunk>) {
    this.response.setHeader('Content-Type', 'application/json; charset=utf-8');
    this.response.setHeader('Transfer-Encoding', 'chunked');
    this.response.setHeader('Connection', 'keep-alive');

    if (streamSource?.constructor?.name === 'IterableReadableStream') {
      await this.sendStream(this.transformStream(streamSource as IterableReadableStream<AIMessageChunk>));
    } else {
      await this.sendStream(this.splitIntoChunks(streamSource as string || streamSource as AIMessageChunk));
    }
  }

  private async sendStream(stream: AsyncIterable<{ content: string }>) {
    let firstChunkSent = false;

    for await (const chunk of stream) {
      if (!chunk.content.trim()) continue;

      const formattedChunk = {
        created_at: new Date().toISOString(),
        message: {
          role: 'assistant',
          content: chunk.content,
        },
        done: false,
      };

      this.response.write(`${JSON.stringify(formattedChunk)}\n`);
      firstChunkSent = true;
    }

    if (!firstChunkSent) {
      this.response.write(`${JSON.stringify({ error: 'No content streamed.' })}\n`);
    }

    this.response.write(`${JSON.stringify({ done: true })}\n`);
    this.response.end();
  }

  private async *transformStream(stream: AsyncIterable<AIMessageChunk>): AsyncIterable<{ content: string }> {
    for await (const chunk of stream) {
      yield { content: chunk.content.toString() };
    }
  }

  private async *splitIntoChunks(text: string | AIMessageChunk): AsyncIterable<{ content: string }> {
    let contentString = typeof text === 'string' ? text : text.content.toString();
    const words = contentString.match(/\S+\s*/g) || [];

    for (const word of words) {
      if (!word.trim()) continue;
      yield { content: word };
    }
  }
}
