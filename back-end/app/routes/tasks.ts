import { Application, Request, Response } from 'express';

module.exports = (application: Application) => {
    application.post('/api/task/create', (req: Request, res: Response) => {
        (application as any).app.controllers.tasks.CreateTask(application, req, res);
    });

    application.get('/api/task/get', (req: Request, res: Response) => {
        (application as any).app.controllers.tasks.GetTasks(application, req, res);
    });

    application.put('/api/task/edit', (req: Request, res: Response) => {
        (application as any).app.controllers.tasks.EditTask(application, req, res);
    });

    application.delete('/api/task/delete/:id', (req: Request, res: Response) => {
        (application as any).app.controllers.tasks.RemoveTask(application, req, res);
    });
};
