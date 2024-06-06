import { createRouter, createWebHistory } from 'vue-router';
import AddTask from '../components/AddTask.vue';
import Todo from '../views/Todo.vue';

const routes = [
  { path: '/', redirect: '/todo' },
  { path: '/todo', component: Todo, props: { status: 'todo' } },
  { path: '/in-progress', component: Todo, props: { status: 'in-progress' } },
  { path: '/completed', component: Todo, props: { status: 'completed' } },
  { path: '/add', component: AddTask },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;