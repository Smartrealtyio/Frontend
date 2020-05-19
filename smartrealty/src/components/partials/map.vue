<template>
  <div class="wrapper">
    <yandex-map
      :coords="setCenter"
      zoom="10"
      @created="mapCreated"
    ></yandex-map>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  props: {
    coord: {
      type: Array,
      default: () => {
        return [55.76, 37.64];
      },
    },
  },
  data() {
    return {
      map: null,
    };
  },
  components: {},
  computed: {
    setCenter() {
      // return this.map ? this.map.setCenter(this.coord) : [55.76, 37.64];
      return [55.76, 37.64];
    },
  },
  methods: {
    mapCreated($map) {
      this.map = $map;
    },
  },
  mounted() {
    this.map = window.ymaps;
    setTimeout(() => {
      this.map = window.ymaps;
      console.log(window.ymaps.map);
      // new window["ymaps"].Map("map", {
      //   center: [55.76, 37.64],
      //   zoom: 10,
      // });
    }, 2000);
  },
};
</script>

<style lang="scss" scoped>
.yandex-map,
.ymap-container {
  height: 100%;
}
#map,
.wrapper {
  width: 100%;
  height: 100%;
}
</style>
