<template>
  <div class="pagination">
    <button
      v-show="totalPages > 0 && currentPage > 1"
      class="pagination__left btn"
      @click="prevPage"
    >
      Prev
    </button>

    <div v-if="isMobile && totalPages != 0" class="pagination__info">
      {{ currentPage }} из {{ totalPages }}
    </div>

    <ul v-if="!isMobile && totalPages != 0" class="pagination__nav">
      <li v-if="rangeStart != 1" class="pagination__nav-item">
        <button class="btn" @click="changePage(1)">
          1
        </button>
      </li>
      <li v-if="rangeStart != 1" class="pagination__nav-item">
        ⋯
      </li>
      <li
        v-for="(page,index) in pages"
        :key="index"
        class="pagination__nav-item"
        :class="{'pagination__nav-item--active': page == currentPage}"
      >
        <button class="btn" @click="changePage(page)">
          {{ page }}
        </button>
      </li>
      <li v-if="rangeEnd < totalPages" class="pagination__nav-item">
        ⋯
      </li>
      <li v-if="rangeEnd < totalPages" class="pagination__nav-item">
        <button class="btn" @click="changePage(totalPages)">
          {{ totalPages }}
        </button>
      </li>
    </ul>
    <button
      v-show="currentPage < totalPages"
      class="pagination__right btn"
      @click="nextPage"
    >
      Next
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    pageRange: {
      type: Number,
      default: 2,
    },
  },

  computed: {
    ...mapState(
      'dataview', ['totalPages', 'isMobile'],
    ),

    currentPage: {
      get() {
        return parseInt(this.$store.state.dataview.currentPage, 10);
      },
      set(value) {
        this.$store.commit('dataview/changePage', value);
      },
    },

    rangeStart() {
      const start = this.currentPage - this.pageRange;
      return (start > 0) ? start : 1;
    },

    rangeEnd() {
      const end = this.currentPage + this.pageRange;
      return (end < this.totalPages) ? end : this.totalPages;
    },

    pages() {
      const pages = [];
      for (let i = this.rangeStart; i <= this.rangeEnd; i += 1) {
        pages.push(i);
      }
      return pages;
    },
  },

  methods: {
    prevPage() {
      this.currentPage -= 1;
      if (this.currentPage === 1) {
        this.$router.push('/');
      } else {
        this.$router.push({
          name: 'page-id',
          params: { id: this.currentPage },
        });
      }
    },

    nextPage() {
      this.currentPage += 1;
      this.$router.push({
        name: 'page-id',
        params: { id: this.currentPage },
      });
    },

    changePage(value) {
      this.currentPage = value;
      if (this.currentPage === 1) {
        this.$router.push('/');
      } else {
        this.$router.push({
          name: 'page-id',
          params: { id: this.currentPage },
        });
      }
    },
  },
};
</script>

<style lang="scss">
.pagination {
  display: grid;
  grid-template-areas: "prev nav next";
  grid-template-columns: 1fr 5fr 1fr;

  @media screen and (max-width: 530px) {
     grid-template-columns: 1fr 2fr 1fr;
  }

  &__right {
      grid-area: next;
  }

  &__left {
      grid-area: prev;
  }

  &__info {
      display: flex;
      grid-area: nav;
      align-items: center;
      justify-content: center;
  }

  &__nav {
      display: flex;
      grid-area: nav;
      justify-content: center;
      list-style: none;
  }

  &__nav-item {
    display: flex;
    align-items: center;
    margin: 0 6px;
    transition: all .2s ease-in-out;

    &--active .btn {
      background-color: #fffae5;
      border: 1px solid #ffdb4d;
    }
  }
}
</style>
