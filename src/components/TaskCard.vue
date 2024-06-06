<template>
  <div class="card h-100">
    <img v-if="task.image" :src="task.image" class="card-img-top" alt="Task image" style="margin: auto; width: 320px; height: 200px;">
    <div class="card-body">
      <h5 class="card-title">{{ task.title }}</h5>
      <p class="card-text">{{ task.description }}</p>
      <p class="card-text"><small class="text-muted">Created At: {{ formatDate(task.createdAt) }}</small></p>
    </div>
    <div class="card-footer d-flex justify-content-between">
      <button v-if="status === 'todo'" class="btn btn-primary" @click="$emit('start', task)">Start</button>
      <button v-if="status === 'in-progress'" class="btn btn-success" @click="$emit('complete', task)">Complete</button>
      <button v-if="status === 'in-progress'" class="btn btn-warning" @click="$emit('cancel', task)">Cancel</button>
      <button class="btn btn-danger" @click="$emit('remove', task)">Remove</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskCard',
  props: {
    task: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  },
};
</script>

<style scoped>
.card {
  width: 320px;
  border: 1px solid #ccc;
  margin: auto;
}
</style>
