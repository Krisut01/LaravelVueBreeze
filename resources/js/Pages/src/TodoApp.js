import axios from "axios";

export default {
  data() {
    return {
      todos: [],
      newTodo: {
        title: "",
        description: "",
      },
      searchQuery: "",
    };
  },
  computed: {
    filteredTodos() {
      return this.todos.filter((todo) =>
        todo.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    async fetchTodos() {
      const response = await axios.get("/api/todos");
      console.log(response.data); // Log to check the returned data
      this.todos = response.data;
    },
    async addTodo() {
      const response = await axios.post("/api/todos", this.newTodo);
      this.todos.push(response.data);
      this.newTodo = { title: "", description: "" };
    },
    async toggleComplete(todo) {
      await axios.put(`/api/todos/${todo.id}`, {
        completed: !todo.completed,
      });
      this.fetchTodos();
    },
    async edit(todo) {
      const updatedTitle = prompt("Update title:", todo.title);
      const updatedDescription = prompt("Update description:", todo.description);
      if (updatedTitle || updatedDescription) {
        await axios.put(`/api/todos/${todo.id}`, {
          title: updatedTitle || todo.title,
          description: updatedDescription || todo.description,
        });
        this.fetchTodos();
      }
    },
    async remove(id) {
      await axios.delete(`/api/todos/${id}`);
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
    formatDate(date) {
      console.log(date); // Log date to check
      if (!date) return "No timestamp available";
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(date).toLocaleString(undefined, options);
    },
  },
  mounted() {
    this.fetchTodos();
  },
};