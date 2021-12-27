import { Application, Request, Response } from 'express';

module.exports = (application: Application) => {
    application.post('/task/create', (req: Request, res: Response) => {
        (application as any).app.controllers.tasks.CreateTask(application, req, res);
    });
};
