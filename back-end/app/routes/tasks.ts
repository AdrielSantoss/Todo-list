import { Application, Request, Response } from 'express';

module.exports = (application: Application) => {
    application.post('/api/task/create', (req: Request, res: Response) => {
        (application as any).app.controllers.tasks.CreateTask(application, req, res);
    });

    application.get('/api/task/get', (req: Request, res: Response) => {
        (application as any).app.controllers.tasks.GetTasks(application, req, res);
    });

    application.delete('/api/task/delete', (req: Request, res: Response) => {
        (application as any).app.controllers.tasks.GetTasks(application, req, res);
    });
};
