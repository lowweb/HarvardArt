<template>
  <Nuxt keep-alive />
</template>

<script>
export default {
  computed: {
    isMobile: {
      get() {
        return this.$store.state.dataview.isMobile;
      },
      set(value) {
        this.$store.commit('dataview/changeIsMobile', value);
      },
    },
  },

  beforeDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true });
    }
  },

  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize, { passive: true });
  },

  methods: {
    onResize() {
      // this.isMobile = window.innerWidth < 800;
    },
  },
};
</script>

<style lang="scss">
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Roboto Condensed', sans-serif;
}

.wrap {
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  width: 100%;
  max-width: 845px;
  min-height: 100vh;
  min-height: 100vh;
  margin: 0 auto;
  padding-top: 50px;
  padding-bottom: 50px;

  @media screen and (max-width: 893px) {
    max-width: none;
    padding: 20px 24px;
  }

  & .pagination {
    margin: 30px 0;
  }
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0 auto;
  text-align: center;
}

.btn {
  padding: 10px 20px;
  color: rgb(37, 36, 36);
  text-align: center;
  text-decoration: none;
  background-color: transparent;
  border: 1px solid #ffdb4d;
  border-radius: 3px;

  &:hover, &:focus {
        background-color: #ffdb4d;
        border: 1px solid #ffdb4d;
  }

  &--fit {
    width: fit-content;
  }
}
.placeholder {
  & .vue-content-placeholders-is-animated .vue-content-placeholders-text__line:before {
    background: linear-gradient(to right, #F6F6F6 8%, #F0F0F0 18%, #F6F6F6 33%);
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
  }
  & .vue-content-placeholders-is-animated .vue-content-placeholders-img:before {
    background: linear-gradient(to right, #F6F6F6 8%, #F0F0F0 18%, #F6F6F6 33%);
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
  }
}

@keyframes placeHolderShimmer {
  0%{ background-position: -468px 0; }
  100%{ background-position: 468px 0; }
}
</style>
