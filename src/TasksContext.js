import { createContext, useReducer } from "react";

// Provides the current list of tasks
export const tasksContext = createContext(null);
// Provides the function that lets components dispatch action
export const tasksDispatchContext = createContext(null);

export default function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  //
  return (
    <tasksContext.Provider value={tasks}>
      <tasksDispatchContext.Provider value={dispatch}>
        {children}
      </tasksDispatchContext.Provider>
    </tasksContext.Provider>
  );
}

// Reducer Function
function tasksReducer(tasks, action) {
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false
        }
      ];
    }
    case "changed": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: "Philosopher’s Path", done: true },
  { id: 1, text: "Visit the temple", done: false },
  { id: 2, text: "Drink matcha", done: false }
];
