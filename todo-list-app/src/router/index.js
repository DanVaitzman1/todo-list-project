import {createRouter, createWebHistory} from 'vue-router';
import SigninPage from '../pages/SigninPage.vue';
import SignupPage from '../pages/SignupPage.vue';
import TasksPage from '../pages/TasksPage.vue';

const routes = [
    {path: '/signin', name: 'Signin', component: SigninPage},
    {path: '/signup', name: 'Signup', component: SignupPage},
    {path: '/tasks', name: 'Tasks', component: TasksPage},
    {path: '/users', name: 'Users'},
    {path: '/', redirect: '/signin'},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
