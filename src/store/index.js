import { createStore } from 'vuex';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default createStore({
  state: {
    tasks: [],
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    addTask(state, task) {
      state.tasks.push(task);
    },
    updateTask(state, updatedTask) {
      const index = state.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask);
      }
    },
    removeTask(state, taskId) {
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    },
  },
  actions: {
    async loadTasks({ commit }) {
      const response = await apiClient.get('/tasks');
      commit('setTasks', response.data);
    },
    async addTask({ commit }, task) {
      const response = await apiClient.post('/tasks', task);
      commit('addTask', response.data);
    },
    async updateTask({ commit }, task) {
      const response = await apiClient.put(`/tasks/${task.id}`, task);
      commit('updateTask', response.data);
    },
    async removeTask({ commit }, taskId) {
      await apiClient.delete(`/tasks/${taskId}`);
      commit('removeTask', taskId);
    },
  },
});
