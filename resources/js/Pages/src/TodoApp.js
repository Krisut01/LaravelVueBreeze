import axios from "axios";
import * as THREE from 'three';  // Importing Three.js for background animation

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
      try {
        const response = await axios.get("/api/todos");
        console.log(response.data); // Log to check the returned data
        this.todos = response.data;
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    },
    async addTodo() {
      try {
        const response = await axios.post("/api/todos", this.newTodo);
        this.todos.push(response.data);
        this.newTodo = { title: "", description: "" }; // Clear input fields
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    },
    async toggleComplete(todo) {
      try {
        await axios.put(`/api/todos/${todo.id}`, {
          completed: !todo.completed,
        });
        this.fetchTodos(); // Refresh todos after toggle
      } catch (error) {
        console.error("Error toggling todo:", error);
      }
    },
    async edit(todo) {
      const updatedTitle = prompt("Update title:", todo.title);
      const updatedDescription = prompt("Update description:", todo.description);
      if (updatedTitle || updatedDescription) {
        try {
          await axios.put(`/api/todos/${todo.id}`, {
            title: updatedTitle || todo.title,
            description: updatedDescription || todo.description,
          });
          this.fetchTodos(); // Refresh todos after update
        } catch (error) {
          console.error("Error editing todo:", error);
        }
      }
    },
    async remove(id) {
      try {
        await axios.delete(`/api/todos/${id}`);
        this.todos = this.todos.filter((todo) => todo.id !== id);
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    },
    formatDate(date) {
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
    initGalaxyBackground() {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      // Create stars
      const starGeometry = new THREE.BufferGeometry();
      const starMaterial = new THREE.PointsMaterial({ color: 0x888888 });
      const starsCount = 10000;
      const positions = new Float32Array(starsCount * 3);

      for (let i = 0; i < starsCount; i++) {
        positions[i * 3] = Math.random() * 2000 - 1000;
        positions[i * 3 + 1] = Math.random() * 2000 - 1000;
        positions[i * 3 + 2] = Math.random() * 2000 - 1000;
      }

      starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);

      camera.position.z = 1;

      // Handle window resizing to keep canvas size consistent
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });

      // Animation loop
      function animate() {
        requestAnimationFrame(animate);
        stars.rotation.x += 0.0005;
        stars.rotation.y += 0.0005;
        renderer.render(scene, camera);
      }

      animate();
    },

    // Hover effect for todo items
    handleMouseEnter(index) {
      this.$set(this.todos, index, { ...this.todos[index], hover: true });
    },

    handleMouseLeave(index) {
      this.$set(this.todos, index, { ...this.todos[index], hover: false });
    },

    // Touch effect for todo items on mobile
    handleTouchStart(index) {
      this.$set(this.todos, index, { ...this.todos[index], touched: true });
    },

    handleTouchEnd(index) {
      this.$set(this.todos, index, { ...this.todos[index], touched: false });
    }
  },
  mounted() {
    this.fetchTodos();
    this.initGalaxyBackground();
  },
  watch: {
    todos() {
      // Watch for changes in todos and apply CSS class dynamically
      this.todos.forEach((todo, index) => {
        const todoElement = document.getElementById(`todo-${todo.id}`);
        if (todoElement) {
          if (todo.hover) {
            todoElement.classList.add('todo-hover');
          } else {
            todoElement.classList.remove('todo-hover');
          }

          if (todo.touched) {
            todoElement.classList.add('todo-touched');
          } else {
            todoElement.classList.remove('todo-touched');
          }
        }
      });
    },
  },
};
