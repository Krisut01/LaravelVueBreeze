<template>
  <div class="todo-container">
    <h1 class="title">I miss u :()</h1>

    <!-- Add Todo Form -->
    <form @submit.prevent="addTodo" class="todo-form">
      <input v-model="newTodo.title" placeholder="Title" required class="input" />
      <textarea v-model="newTodo.description" placeholder="Description" class="textarea"></textarea>
      <button type="submit" class="submit-btn">Add</button>
    </form>

    <!-- Todo List -->
    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id" class="todo-item">
        <div class="todo-details">
          <span :class="{ completed: todo.completed }" class="todo-title">{{ todo.title }}</span>
          <p class="todo-description">{{ todo.description }}</p>
        </div>
        <div class="todo-actions">
          <button @click="toggleComplete(todo)" class="action-btn toggle-btn">Toggle</button>
          <button @click="edit(todo)" class="action-btn edit-btn">Edit</button>
          <button @click="remove(todo.id)" class="action-btn delete-btn">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
axios.defaults.withCredentials = true;

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
/* Container for the entire Todo App */


.todo-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: #f4f7fc;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* Title Style */
.title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  animation: fadeIn 1s ease-out;
}

/* Form Styling */
.todo-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 2rem;
}

.input, .textarea {
  padding: 0.8rem;
  font-size: 1.1rem;
  border: 2px solid #e0e5ec;
  border-radius: 8px;
  transition: 0.3s;
}

.input:focus, .textarea:focus {
  border-color: #4a90e2;
  box-shadow: 0 0 5px rgba(74, 144, 226, 0.5);
}

.textarea {
  resize: vertical;
  min-height: 100px;
}

.submit-btn {
  padding: 10px 15px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  font-size: 1.1rem;
  font-weight: 500;
}

.submit-btn:hover {
  background-color: #357ab7;
  transform: scale(1.05);
}

.submit-btn:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(74, 144, 226, 0.5);
}

/* Todo List Styling */
.todo-list {
  list-style-type: none;
  padding: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 1rem;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.todo-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.todo-details {
  display: flex;
  flex-direction: column;
}

.todo-title {
  font-weight: 600;
  font-size: 1.2rem;
  color: #333;
}

.todo-description {
  color: #777;
  font-size: 1rem;
  margin-top: 5px;
}

.completed {
  text-decoration: line-through;
  color: #bbb;
}

/* Action Buttons */
.todo-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  padding: 8px 15px;
  font-size: 0.9rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
}

.toggle-btn {
  background-color: #4a90e2;
  color: white;
}

.toggle-btn:hover {
  background-color: #357ab7;
}

.edit-btn {
  background-color: #f9a825;
  color: white;
}

.edit-btn:hover {
  background-color: #c17900;
}

.delete-btn {
  background-color: #e74c3c;
  color: white;
}

.delete-btn:hover {
  background-color: #c0392b;
}

/* Add animation effects */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
