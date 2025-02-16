<template>
  <div class="w-full h-screen flex-col flex gap-4 items-center p-4">
    <!-- Title -->
    <h1 class="text-2xl">Todo List App</h1>
    <!-- Form -->
    <div class="max-w-sm w-full grid grid-cols-3 gap-2 border p-4 rounded-lg">
      <input
        v-model="input_text_ref"
        placeholder="New Task"
        class="col-span-2"
      />
      <button
        type="button"
        class="border rounded-lg p-1 bg-green-500 text-white"
        @click="createTodo(input_text_ref)"
      >
        Add
      </button>
    </div>
    <!-- Todo Table -->
    <div class="max-w-lg w-full">
      <div class="grid border rounded-lg">
        <div
          v-for="todo in todo_list"
          :key="todo.id"
          class="w-full flex justify-between items-center p-4"
        >
          <!-- Left Side -->
          <div class="flex gap-4">
            <input
              type="checkbox"
              :checked="todo.completed"
              @change="toggleTodo(todo.id)"
            />
            <p>{{ todo.text }}</p>
          </div>
          <!-- Right Side -->
          <div class="text-red-500 flex">
            <button @click="removeTodo(todo.id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { todo_list, addTodo, removeTodo, toggleTodo } = useTodoStore();
const input_text_ref = ref<string>("");

function createTodo(text: string): void {
  if (input_text_ref.value.length === 0) {
    alert("Please specify a text");
    return;
  }
  addTodo(text);
  input_text_ref.value = "";
}
</script>

<style>
table,
th,
td {
  border: 1px solid;
}

th {
  padding: 10px;
}
</style>
