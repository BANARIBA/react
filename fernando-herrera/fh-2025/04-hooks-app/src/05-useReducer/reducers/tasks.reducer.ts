import * as z from 'zod';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface TaskState {
  todos: Todo[];
  length: number;
  completed: number;
  pending: number;
}

const TodoSchema = z.object({
  id: z.number(),
  text: z.string(),
  completed: z.boolean(),
});

const TaskStateSchema = z.object({
  length: z.number(),
  completed: z.number(),
  pending: z.number(),
  todos: z.array(TodoSchema),
});

export const getTaskInitState = (): TaskState => {
  const localStorageStage = localStorage.getItem('tasks-state');
  if (!localStorageStage) return {
    todos: [],
    completed: 0,
    pending: 0,
    length: 0,
  }
  const result = TaskStateSchema.safeParse(JSON.parse(localStorageStage));
  if (result.error) {
    console.log(result.error);
    return {
    todos: [],
    completed: 0,
    pending: 0,
    length: 0,
  }}
  return result.data;
}

export type TaskActions =
  | { type: 'ADD_TODO', payload: string }
  | { type: 'TOGGLE_TODO', payload: number }
  | { type: 'DELETE_TODO', payload: number };

export const tasksReducer = (state: TaskState, action: TaskActions): TaskState => {
  switch (action.type) {
    case 'ADD_TODO': {
      const newTodo: Todo = { id: Date.now(), text: action.payload, completed: false };
      return {
        ...state,
        todos: [newTodo, ...state.todos],
        length: state.todos.length + 1,
        pending: state.completed + 1,
      };
    }
    case 'DELETE_TODO': {
      const currentTodos = state.todos.filter((todo) => todo.id !== action.payload);
      return {
        ...state,
        todos: currentTodos,
        length: currentTodos.length,
        completed: currentTodos.filter((todo) => todo.completed === true).length,
        pending: currentTodos.filter((todo) => todo.completed === false).length,

      };
    }
    case 'TOGGLE_TODO': {
      const currentTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          todo.completed = true;
        }
        return todo;
      });
      return {
        ...state,
        todos: currentTodos,
        completed: currentTodos.filter((todo) => todo.completed === true).length,
        pending: currentTodos.filter((todo) => todo.completed === false).length,
      }
    }
    default:
      return state;
  }
}