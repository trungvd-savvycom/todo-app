<template>
  <div>
    <h2>Todo</h2>
    <div v-if="status === 'todo'" class="mb-3">
      <button class="btn btn-primary" @click="goToAddTask">Add New</button>
    </div>
    <TaskList 
      :status="status" 
    />
    <NewList />
  </div>
</template>

<script>
import TaskList from '../components/TaskList.vue';
import NewList from '../components/NewList.vue';

export default {
  components: {
    TaskList,
    NewList
  },
  props: {
    status: {
      type: String,
      required: true,
    },
  },
  methods: {
    goToAddTask() {
      this.$router.push('/add');
    },
  }
};
</script>
