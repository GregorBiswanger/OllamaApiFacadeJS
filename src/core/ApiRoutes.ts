import { Express, Request, Response } from 'express';

export class ApiRoutes {
  private modelName: string;

  constructor(app: Express, modelName: string) {
    this.modelName = modelName;
    this.setupRoutes(app);
  }

  private setupRoutes(app: Express) {
    app.get('/api/tags', this.handleTags.bind(this));
    app.get('/api/version', this.handleVersion.bind(this));
  }

  private handleTags(req: Request, res: Response) {
    res.json({
      models: [
        {
          name: this.modelName,
          model: `${this.modelName}:latest`,
          digest: 'a6990ed6be412c6a217614b0ec8e9cd6800a743d5dd7e1d7fbe9df09e61d5615',
        },
      ],
    });
  }

  private handleVersion(req: Request, res: Response) {
    res.json({ version: '0.1.33' });
  }
}