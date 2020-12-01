<template>
  <div>
    <div v-if="!Object.keys(data).length && !fetchState.pending">
      Нет данных для отображения
    </div>
    <template v-if="fetchState.pending">
      <div class="view placeholder">
        <content-placeholders
          v-for="p in 10"
          :key="p"
        >
          <content-placeholders-img />
        </content-placeholders>
      </div>
    </template>
    <template v-if="Object.keys(data).length && !fetchState.pending">
      <ul class="view">
        <li
          v-for="(item, index) in data"
          :key="index"
          class="view__item"
          @click="openItem(item.id)"
        >
          <img
            v-if="(item.primaryimageurl) != null"
            v-lazy="item.primaryimageurl + '?width=' + urlImgWeight"
            alt="exhibit img"
            class="view__item-img"
          >
          <div v-if="(item.primaryimageurl) == null" class="view__item--noimg" />
          <div class="view__info">
            <div class="view__item-cap" :hover-data="item.title">
              {{ item.title }}
            </div>
            <div class="view__item-meta">
              {{ item.totaluniquepageviews }}
            </div>
          </div>
        </li>
      </ul>
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
    urlImgWeight: 150,
  }),
  methods: {
    openItem(id) {
      this.$router.push({ name: 'item-id', params: { id } });
    },
  },
};

</script>

<style lang="scss">
.view {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
   @media only screen and (max-width: 780px) {
     grid-template-columns: 1fr 1fr;
  }
  @media only screen and (max-width: 570px) {
     grid-template-columns: 1fr;
  }

  &__item {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 150px;
    overflow: hidden;
    list-style: none;
    border-radius: 1rem;
    box-shadow: -9px -9px 16px #f8fafe, 9px 9px 16px #ced2db;
    cursor: pointer;

    &::after {
      position: absolute;
      right: 10px;
      bottom: 30px;
      z-index: 3;
      color: #ffffff;
      opacity: 0;
      transition: opacity 1s;
      content: 'MORE INFO';
    }
    & .view__info::before {
      background-color: #ffe66e;

    }
    &:nth-child(2n) {
      & .view__info::before {
        background-color: #caafe8;
        animation-duration: 1.2s;
      }

    }
    &:nth-child(5n) {
      & .view__info::before {
        background-color: #7be5ea;
        animation-duration: 1s;
      }
    }

    &:hover {
      box-shadow: -4px -4px 8px #f8fafe, 4px 4px 8px #ced2db;

      &::before {
        @media not (hover: hover) {
          position: absolute;
          right: 0;
          bottom: 0;
          z-index: 3;
          background-color: #643bb5;
          animation-name: more;
          animation-duration: .5s;
          animation-fill-mode: forwards;
          content: '';
        }

      }
      &::after {
        @media not (hover: hover) {
          opacity: 1;
        }
      }
    }

    &:hover &-cap {
      color: #573c98;
    }

    &-cap {
      position: relative;
      flex: 1;
      padding: 20px;
      font-size: 25px;

    }

    &-meta {
      z-index: 3;
      display: flex;
      align-items: center;
      padding: 15px 20px;

      &::before {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        content: url('../assets/view.svg');
      }
    }

    &--noimg {
      z-index: 3;
      width: 100%;
      height: 200px;
      background-color: #e2e2e2;
      background-image: url('../assets/noimg.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 50%;
    }

    &-img {
      z-index: 3;
      width: 100%;
      height: 200px;
      // max-height: 150px;
      object-fit: cover;
      background-color: #e2e2e2;
    }

  }

  &__info {
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      animation-name: itemFilling;
      animation-duration: 1s;
      animation-fill-mode: forwards;
      content: '';
    }
  }
}

@keyframes more {
  0% {
    width: 0;
    height: 0;
    border-radius: 50% 50% 0 50%;
  }

  100% {
    width: 100px;
    height: 80px;
    border-radius: 50% 50% 0 50%;
  }
}

@keyframes itemFilling {
  0% {
    width: 0;
    height: 0;
    border-radius: 0% 80% 80% 80%;
  }

  100% {
    width: 200%;
    height: 200%;
    border-radius: 0 0 0 0;
  }
}
.vue-content-placeholders-img {
  width: 100%;
  height: 330px;
  border-radius: 1rem;
}
</style>
