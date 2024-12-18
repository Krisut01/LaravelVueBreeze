<template>
  <div class="todo-app">
    <h1>To-Do List</h1>

    <!-- Add Todo Form -->
    <form class="todo-form" @submit.prevent="addTodo">
      <input
        v-model="newTodo.title"
        placeholder="Title"
        required
        class="input-field"
      />
      <textarea
        v-model="newTodo.description"
        placeholder="Description"
        class="textarea-field"
      ></textarea>
      <button type="submit" class="btn add-btn">Add</button>
    </form>

    <!-- Search Bar -->
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search todos..."
      class="search-bar"
    />

    <!-- Todo List -->
    <ul class="todo-list">
      <li v-for="todo in filteredTodos" :key="todo.id" class="todo-item">
        <div>
          <h3 :class="{ completed: todo.completed }">{{ todo.title }}</h3>
          <p>{{ todo.description }}</p>
          <small class="timestamp">
            Created: {{ formatDate(todo.created_at) }}
          </small>
        </div>
        <div class="todo-actions">
          <span
            class="status-badge"
            :class="todo.completed ? 'completed-badge' : 'pending-badge'"
          >
            {{ todo.completed ? "Completed" : "Pending" }}
          </span>
          <button
            @click="toggleComplete(todo)"
            class="btn small-btn sync-btn"
          >Toggle</button>
          <button @click="edit(todo)" class="btn small-btn sync-btn">Edit</button>
          <button @click="remove(todo.id)" class="btn small-btn danger-btn sync-btn">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>
<style src="/resources/js/Pages/src/TodoApp.css"></style>
<script src="/resources/js/Pages/src/TodoApp.js"></script>

<script>

</script>

<style scoped>
  
</style>
