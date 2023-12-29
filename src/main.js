import { createApp } from 'vue';
import 'virtual:svg-icons-register';
import router from '@/router';
import store from '@/store/index';
import App from './App.vue';
import '@/theme/index.less';
import 'uno.css';

const app = createApp(App);

app.use(router);
app.use(store);
app.mount('#app');
