import { Request, Response, NextFunction } from 'express';

/**
 * Middleware for logging JSON requests and responses.
 * This middleware logs the details of incoming requests and outgoing responses to the console.
 * It helps in monitoring and debugging API interactions.
 */
export const jsonRequestLogger = (request: Request, response: Response, next: NextFunction) => {
  const start = Date.now();
  let requestBody = '';

  console.log(`⬆️ [${request.method}] ${request.originalUrl}`);
  console.log('🔍 Request Headers:', JSON.stringify(request.headers, null, 2));

  if (request.headers.accept?.includes('text/event-stream')) {
    console.log('⚠️ Streaming-Request erkannt. Body wird nicht geloggt.');
    return next();
  }

  request.on('data', (chunk) => {
    requestBody += chunk;
  });

  request.on('end', () => {
    if (requestBody) {
      console.log('📥 Request Body:');
      console.log(requestBody);
    }
  });

  request.on('error', (err) => {
    console.error('❌ Fehler beim Lesen des Request-Bodies:', err);
  });

  const originalSend = response.send;
  response.send = function (body) {
    console.log(`⬇️ [${request.method}] ${request.originalUrl} - ${response.statusCode} (${Date.now() - start}ms)`);
    console.log('📤 Response Body:');
    console.log(body);

    return originalSend.call(this, body);
  };

  next();
};
