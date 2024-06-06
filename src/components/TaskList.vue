<template>
  <div>
    <div class="row gx-5">
      <div v-for="task in filteredTasks" :key="task.id" class="col-lg-4 col-md-6 col-sm-12 mb-4">
        <TaskCard
          :task="task"
          :status="status"
          @start="startTask"
          @complete="completeTask"
          @cancel="cancelTask"
          @remove="removeTask"
        />
      </div>
    </div>
    <div class="container">
      <div class="row">
        <NewList />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TaskCard from './TaskCard.vue';
import NewList from "./NewList.vue";

export default {
  name: 'TaskList',
  components: {
    TaskCard,
  },
  props: {
    status: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(['tasks']),
    filteredTasks() {
      return this.tasks.filter(task => task.status === this.status);
    },
  },
  methods: {
    goToAddTask() {
      this.$router.push('/add');
    },
    startTask(task) {
      const updatedTask = { ...task, status: 'in-progress' };
      this.$store.dispatch('updateTask', updatedTask);
    },
    completeTask(task) {
      const updatedTask = { ...task, status: 'completed' };
      this.$store.dispatch('updateTask', updatedTask);
    },
    cancelTask(task) {
      const updatedTask = { ...task, status: 'todo' };
      this.$store.dispatch('updateTask', updatedTask);
    },
    removeTask(task) {
      if (confirm('Are you sure you want to delete this task?')) {
        this.$store.dispatch('removeTask', task.id);
      }
    },
  },
  async created() {
    await this.$store.dispatch('loadTasks');
  },
};
</script>

<style scoped>
</style>