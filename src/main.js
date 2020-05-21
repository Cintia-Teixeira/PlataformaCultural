import Vue from 'vue';
import VueRouter from 'vue-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import VueMasonry from 'vue-masonry-css';

import { gsap } from 'gsap';

import Vuelidate from 'vuelidate';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import './quasar';

import LogoCard from './components/Logo-Card.vue'; // ----------- logo da plataforma
import NavMenu from './components/Nav-Menu.vue'; // ------------- menu de navegação do mapa
import MulticolorLine from './components/Multicolor-Line.vue'; // linha colorida
import Filter from './components/Filter.vue'; // ---------------- filtro menu

Vue.component('logo-card', LogoCard);
Vue.component('my-menu', NavMenu);
Vue.component('multicolor-line', MulticolorLine);
Vue.component('my-filter', Filter);

// font awesome setups
library.add(faUserSecret);
Vue.component('font-awesome-icon', FontAwesomeIcon);

window.eventBus = new Vue();

// my packages
Vue.use(VueMasonry);
Vue.use(Vuelidate);
gsap.config({
  nullTargetWarn: false,
});

Vue.config.productionTip = false;
Vue.use(VueRouter);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
