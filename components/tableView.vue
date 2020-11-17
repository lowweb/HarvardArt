<template>
  <div class="tableView">
    <div v-if="!Object.keys(data).length && !fetchState.pending">
      Нет данных для отображения
    </div>
    <template v-if="fetchState.pending">
      <div class="placeholder placeholder-table">
        <content-placeholders
          v-for="p in 15"
          :key="p"
        >
          <content-placeholders-text :lines="1" />
        </content-placeholders>
      </div>
    </template>
    <template v-if="!fetchState.pending && Object.keys(data).length">
      <table class="table">
        <tbody>
          <tr
            v-for="(item, index) in data"
            :key="index"
            class="table__row"
            @click="openItem(item.id)"
          >
            <td class="table__row-itm">
              <div class="table__row-itm--cntr">
                <img
                  v-lazy="(item.primaryimageurl) != null ?
                    item.primaryimageurl + '?height=' + imgHeight :
                    noImgSrc"
                  alt="exhibit img"
                  class="table__img"
                >
              </div>
            </td>
            <td class="table__row-itm">
              {{ item.title }}
            </td>
            <td class="table__row-itm">
              {{ item.dated }}
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    fetchState: {
      type: Object,
      default: null,
    },
  },

  data: () => ({
    // eslint-disable-next-line global-require
    noImgSrc: require('../assets/noimg.png'),
    imgHeight: 50,
  }),

  methods: {
    openItem(id) {
      this.$router.push({ name: 'item-id', params: { id } });
    },
  },
};
</script>

<style lang="scss">
.tableView {
  position: relative;
}

.table {
  width: 100%;
  border-collapse: collapse;

  &__row {
    cursor: pointer;

    &:nth-child(2n) {
        background-color: #f9f9f9;
    }

    &:hover {
      background-color: #def4ff;
    }
  }

  &__row-itm {
    padding: 15px 20px;
    text-align: left;

    &:first-child{
      width: 150px;
      min-width: 150px;
    }

    &:nth-child(3n) {
      color: #a5a5a5;
      white-space: nowrap;
      text-align: right;
    }

    &--cntr {
      display: flex;
      justify-content: center;
      overflow: hidden;
    }
  }

  &__img {
    display: block;
    width: auto;
    height: 50px;
  }
}

.placeholder-table {
  .vue-content-placeholders:nth-child(2n) {
    & .vue-content-placeholders-text__line{
      background-color: #f9f9f9;
    }
  }

  .vue-content-placeholders:nth-child(2n+1) {
    & .vue-content-placeholders-text__line {
      background-color: #ffffff;

    }

    & .vue-content-placeholders-text__line:before {
      content: none;
    }
  }

  & .vue-content-placeholders-text__line {
    width: 100%;
    height: 80px;
    margin-bottom: 0;
  }

  & .vue-content-placeholders-text__line:nth-child(4n+1) {
    width: 100%;
  }
}
</style>
