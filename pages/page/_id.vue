<template>
  <div class="wrap">
    <h1>Harvard Art Museums</h1>
    <Pagination :page-range="1" />
    <ItemsView :data="pageData.records" :fetch-state="$fetchState" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import getFetch from '@/function/fetch';
import ItemsView from '~/components/itemsView.vue';
import Pagination from '~/components/pagination.vue';

export default {
  components: {
    ItemsView,
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
    const url = `https://api.harvardartmuseums.org/object?q=totalpageviews:50&size=15&apikey=592a2829-b138-41ed-a9c0-84a7feffd16b&page=${route.params.id}`;
    const data = await getFetch('page', url, store, route, error, this.totalPages);
    this.pageData = data;
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
