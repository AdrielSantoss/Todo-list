import { Task } from './../repositories/task';

export const createTask = async ({ params, request, response }: { id: string; request: any; response: any }) => {
    const body = await request.body(); //tratar json
    const newTask: Task = body.value;
};
