<template>
  <div class="wrap">
    <h1>Harvard Art Museums</h1>
    <Pagination :page-range="2" />
    <ListView :data="pageData.records" :fetch-state="$fetchState" />
  </div>
</template>

<script>
import ListView from '~/components/listView.vue';
import Pagination from '~/components/pagination.vue';

export default {
  components: {
    ListView,
    Pagination,
  },
  data() {
    return {
      pageData: {},
    };
  },

  async fetch() {
    const { store, error } = this.$nuxt.context;

    const data = await fetch('https://api.harvardartmuseums.org/object?q=totalpageviews:50&size=15&apikey=592a2829-b138-41ed-a9c0-84a7feffd16b')
      .then((res) => {
        if (res.status !== 200) {
          error({ statusCode: res.status, message: res.message });
          return {};
        }
        return res.json();
      })
      .catch((e) => {
        error({ statusCode: e.status, message: e.message });
      });

    this.pageData = data;

    // если API вернул ответ с ключом error
    if (this.pageData.error) {
      this.pageData = {};
      error({ statusCode: 404, message: 'Page Not Found' });
    }

    if (Object.keys(this.pageData).length !== 0) {
      store.commit('dataview/fillTotalPages', this.pageData.info.pages);
    }
  },

};
</script>

<style lang="scss">

</style>
