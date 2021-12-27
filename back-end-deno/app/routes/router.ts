import { createTask } from './../repositories/task';
import { Router } from 'https://deno.land/x/oak/mod.ts';

const router = new Router();

router.post('/api/task/create', createTask());

export default router;
