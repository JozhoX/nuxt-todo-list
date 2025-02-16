type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export const useTodoStore = defineStore("todo", () => {
  // State
  // const todo_list = reactive<Todo[]>(
  //   JSON.parse(localStorage.getItem("todo_list") || "[]")
  // );
  const todo_list = reactive<Todo[]>([]);

  // Load from localStorage when mounted (client-side only)
  onMounted(() => {
    if (typeof window !== "undefined" && localStorage.getItem("todo_list")) {
      todo_list.splice(
        0,
        todo_list.length,
        ...JSON.parse(localStorage.getItem("todo_list") || "[]")
      );
    }
  });

  // Watch for changes & update localStorage (client-side only)
  watch(
    todo_list,
    (newTodos) => {
      localStorage.setItem("todo_list", JSON.stringify(newTodos));
    },
    { deep: true }
  );

  // Add
  function addTodo(text: string): void {
    todo_list.push({
      id: todo_list.length,
      text: text,
      completed: false,
    });
  }

  // Remove
  function removeTodo(id: number): void {
    const new_todo_list = todo_list.filter((t) => t.id !== id);
    todo_list.length = 0;
    new_todo_list.forEach((t) => todo_list.push(t));
  }

  // Toggle
  function toggleTodo(id: number): void {
    const todo = todo_list.find((t) => t.id === id);
    if (todo) todo.completed = !todo.completed;
  }

  return { todo_list, addTodo, removeTodo, toggleTodo };
});
