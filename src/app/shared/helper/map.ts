import { Task, TaskMapped, User } from "src/app/backend.service";

/**
 * Map Task array and User array into a new array (type TaskMapped)
 * @param task 
 * @param users 
 * @returns Array<TaskMapped>
 */
export function addAssigneeMapped(task: Task[] | Task, users: User[]) : TaskMapped[] | TaskMapped {
    const userMap = new Map(users.map(user => [user.id, user.name]));

    if (Array.isArray(task)) {
        const newTasks = task.map(task => ({ ...task, 'assigneeName': userMap.get(task.assigneeId) || "unknown" }));
        return newTasks;
    } else {
        const assigneeName = userMap.get(task.assigneeId);
        const newTask = {
            ...task,
            assigneeName: assigneeName || "unknown"
        }
        return newTask;
    }
}
