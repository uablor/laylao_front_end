import { createApp } from "vue";
// import "./style.css";
import App from "./App.vue";
import router from "./router";
import { i18n } from "./common/i18n.config";
import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';
import '@/assets/css/style.css'
import { createPinia } from "pinia";
import VueApexCharts from "vue3-apexcharts";
import 'leaflet/dist/leaflet.css';

const pinia = createPinia();
const app = createApp(App);

app.use(VueApexCharts);
app.use(pinia);
app.use(i18n);
app.use(router);
app.use(Antd);
app.mount("#app");