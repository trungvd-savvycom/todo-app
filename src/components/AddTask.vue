<template>
  <div>
    <h2>Add New Task</h2>
    <form @submit.prevent="addTask" class="mb-4">
      <div class="mb-3">
        <label for="title" class="form-label">Task Title</label>
        <input id="title" v-model="title" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Task Description</label>
        <textarea id="description" v-model="description" class="form-control" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddTask',
  data() {
    return {
      title: '',
      description: '',
    };
  },
  methods: {
    addTask() {
      const newTask = {
        id: Date.now(),
        title: this.title,
        description: this.description,
        status: 'todo',
        image: 'https://source.unsplash.com/random/320x200', // Add a default image URL
        createdAt: new Date(),
      };
      this.$store.dispatch('addTask', newTask);
      this.title = '';
      this.description = '';
      this.$router.push('/');
    },
  },
};
</script>
