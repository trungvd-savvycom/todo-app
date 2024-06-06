import { createSSRApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export function createApp() {
  const app = createSSRApp(App);
  app.use(router);
  app.use(store);

//   store.dispatch('loadTasks'); // Dispatch the action to load tasks

  // app.config.globalProperties.$newsAPIKey = process.env.NEWS_API_KEY;


  return { app, router, store };
}