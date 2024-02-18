import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/assets/styles/index.scss'; // global css
import App from './App.vue';
import router from './router';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import MenuTitle from '@/components/MenuTitle/index.vue';
import CargoInfo from '@/components/CargoInfo/index.vue';
import CargoEdit from '@/components/Edit/CargoEdit.vue';
import AuctionEdit from '@/components/Edit/AuctionEdit.vue';

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}
app.use(router);
app.use(ElementPlus);

app.component('MenuTitle', MenuTitle);
app.component('CargoInfo', CargoInfo);
app.component('CargoEdit', CargoEdit);
app.component('AuctionEdit', AuctionEdit)

app.mount('#app');
