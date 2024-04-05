<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput></TodoInput>
    <TodoList  @remove:todo="removeTodo" @toggle:todo="toggleTodo"></TodoList>
    <TodoFooter @clear:todo="clearTodo"></TodoFooter>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive } from 'vue';
import TodoHeader from '@/components/TodoHeader.vue';
import TodoInput from '@/components/TodoInput.vue'
import TodoList from '@/components/TodoList.vue'
import TodoFooter from '@/components/TodoFooter.vue'
import TodoItem from './types/TodoItem';

export default defineComponent({
  name: 'App',
  components: {
    TodoHeader, TodoInput, TodoList, TodoFooter
  },

  setup() {
    const todoItems = reactive<TodoItem[]>([])

    const removeTodo = (todoItem: TodoItem, index: number) => {
      const { item } = todoItem
      localStorage.removeItem(item);
      todoItems.splice(index, 1);
    }

    const toggleTodo = (todoItem: TodoItem, index: number) => {
      const { item, completed } = todoItem
      todoItems[index].completed = !completed;

      localStorage.removeItem(item);
      localStorage.setItem(item, JSON.stringify(todoItems[index]));
    };

    const clearTodo = () => {
      localStorage.clear()
      todoItems.splice(0)
    }

    return { todoItems, removeTodo, toggleTodo, clearTodo }
  },

});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  text-align: center;
  background-color: #f6f6f6;
}

input {
  border-style: groove;
  width: 200px;
}

button {
  border-style: groove;
}

.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}

i,
span {
  cursor: pointer;
}
</style>
