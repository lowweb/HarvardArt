<template>
  <div class="wrap">
    <h1>Harvard Art Museums</h1>
    <Pagination :page-range="1" />
    <ListView :data="pageData.records" :fetch-state="$fetchState" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import getFetch from '../function/fetch';
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
    const url = 'https://api.harvardartmuseums.org/object?q=totalpageviews:50&size=15&apikey=592a2829-b138-41ed-a9c0-84a7feffd16b';
    const data = await getFetch('index', url, store, undefined, error, undefined);
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
