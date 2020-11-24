import Vue from 'vue';
import VueLazyload from 'vue-lazyload';

Vue.use(VueLazyload, {
  // eslint-disable-next-line global-require
  // loading: require('~/assets/loader.svg'),
  // preLoad: 1,
  // attempt: 1,
});
