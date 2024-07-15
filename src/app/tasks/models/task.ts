import { Task } from "src/app/backend.service";

export interface TaskState {
    tasks: Array<Task>;
    loading: boolean
}
