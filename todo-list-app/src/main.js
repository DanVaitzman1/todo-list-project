import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import Vuelidate from '@vuelidate/core';

createApp(App).use(router).use(Vuelidate).mount('#app');


