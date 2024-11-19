<template>
    <div>
      <h1>To-Do List</h1>
      <form @submit.prevent="addTodo">
        <input v-model="newTodo.title" placeholder="Title" required />
        <textarea v-model="newTodo.description" placeholder="Description"></textarea>
        <button type="submit">Add</button>
      </form>
  
      <ul>
        <li v-for="todo in todos" :key="todo.id">
          <span :class="{ completed: todo.completed }">{{ todo.title }}</span>
          <button @click="toggleComplete(todo)">Toggle</button>
          <button @click="edit(todo)">Edit</button>
          <button @click="remove(todo.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        todos: [],
        newTodo: {
          title: '',
          description: '',
        },
      };
    },
    methods: {
      async fetchTodos() {
        const response = await axios.get('/api/todos');
        this.todos = response.data;
      },
      async addTodo() {
        await axios.post('/api/todos', this.newTodo);
        this.newTodo = { title: '', description: '' };
        this.fetchTodos();
      },
      async toggleComplete(todo) {
        await axios.put(`/api/todos/${todo.id}`, {
          completed: !todo.completed,
        });
        this.fetchTodos();
      },
      async edit(todo) {
        const updatedTitle = prompt('Update title:', todo.title);
        const updatedDescription = prompt('Update description:', todo.description);
        if (updatedTitle) {
          await axios.put(`/api/todos/${todo.id}`, {
            title: updatedTitle,
            description: updatedDescription,
          });
          this.fetchTodos();
        }
      },
      async remove(id) {
        await axios.delete(`/api/todos/${id}`);
        this.fetchTodos();
      },
    },
    mounted() {
      this.fetchTodos();
    },
  };
  </script>
  
  <style scoped>
  .completed {
    text-decoration: line-through;
  }
  </style>
  