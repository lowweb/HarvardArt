<template>
  <div class="wrap">
    <h1>Harvard Art Museums</h1>
    <Pagination :page-range="2" />
    <ListView :data="pageData.records" :fetch-state="$fetchState" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ListView from '~/components/listView.vue';
import Pagination from '~/components/pagination.vue';

export default {
  components: {
    ListView,
    Pagination,
  },

  // валидация url-a
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },

  data() {
    return {
      pageData: {},
    };
  },

  async fetch() {
    const { store, route, error } = this.$nuxt.context;

    const data = await fetch(`https://api.harvardartmuseums.org/object?q=totalpageviews:50&size=15&apikey=592a2829-b138-41ed-a9c0-84a7feffd16b&page=${route.params.id}`)
      .then((res) => {
        if (res.status !== 200) {
          error({ statusCode: res.status, message: res.message });
          return {};
        }
        return res.json();
      })
      .catch((e) => {
        error({ statusCode: e.response.status, message: e.message });
      });

    this.pageData = data;
    if (this.totalPages === 0) {
      store.commit('dataview/fillTotalPages', this.pageData.info.pages);
      store.commit('dataview/changePage', route.params.id);
    }

    // если в url передали страницу больше/меньше чем есть
    if (this.pageData.info.page > this.pageData.info.pages || route.params.id < 1) {
      store.commit('dataview/fillTotalPages', 0);
      store.commit('dataview/changePage', 1);
      error({ statusCode: 404 });
    }
  },

  computed: {
    ...mapState(
      'dataview', ['totalPages'],
    ),
  },

};
</script>

<style lang="scss">

</style>
