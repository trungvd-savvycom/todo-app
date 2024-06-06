<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Stark</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/todo">TODO <span class="badge bg-secondary">{{ todoCount }}</span></router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/in-progress">In Progress <span class="badge bg-danger">{{ inProgressCount }}</span></router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/completed">Completed</router-link>
            </li>
          </ul>
          <span class="navbar-text me-2">Tony Stark</span>
          <button class="btn btn-outline-light">Log Out</button>
        </div>
      </div>
    </nav>
    <div class="container mt-4">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState(['tasks']),
    todoCount() {
      return this.tasks.filter(task => task.status === 'todo').length;
    },
    inProgressCount() {
      return this.tasks.filter(task => task.status === 'in-progress').length;
    }
  }
};
</script>

<style>
.navbar .badge {
  margin-left: 5px;
}
</style>
