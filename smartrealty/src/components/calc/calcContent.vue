<template>
  <div class="calculate-wrapper">
    <div class="calculate-form_map">
      <div class="calculate-form_map_label" data-search-map-title>
        Поиск будет происходит на видимом участке карты
      </div>
      <div class="calculate-form_map_label" data-analyze-map-title>
        Укажите точку на карте
      </div>
      <div class="calculate-form_map_container" id="realty-map">
        <div id="map"></div>
      </div>
    </div>
    <calc-forms @set-coord="setCoord" :map="map" :clusterer="clusterer" :calculateFormRequest="calculateFormRequest"></calc-forms>
  </div>
</template>

<script>
import calcForms from "./calcForms";
export default {
  components: {
    calcForms,
  },
  data() {
    return {
      map: null,
      coord: [55.76, 37.64],
      searchControl: null,
      emptyMsg: null,
      placemark: null,
      form_error: null,
      analyzeBtn: null,
      searchBtn: null,
      results: null,
      addressString: null,
      addressStringField: null,
      calculate_form_lat: null,
      calculate_form_lng: null,
      calculateFormRequest: {},
      clusterer: null,
    };
  },
  methods: {
    setCoord(coord) {
      this.coord = coord
      this.map.setCenter(coord);
    },
    initMap() {
      this.map = new window["ymaps"].Map("map", {
        center: [55.76, 37.64],
        zoom: 10,
      });

      this.searchControl = this.map.controls.get("searchControl");
      this.iniAnalyzeForm();
    },
    iniAnalyzeForm() {
      this.searchControl.events.add("resultselect", this.searchResultParse);
      this.map.events.add("click", this.iniMarkerPosition);
      this.form_error.classList.add("hide");
      this.emptyMsg.classList.add("hide");
      this.clusterer ? this.map.geoObjects.remove(this.clusterer) : false;
    },
    iniSearchForm() {
      this.map.events.remove("click", this.iniMarkerPosition);
      this.searchControl.events.remove("resultselect", this.searchResultParse);
      this.map.geoObjects.remove(this.placemark);

      this.placemark = false;

      this.results.classList.add("hide");
      this.emptyMsg.classList.add("hide");

      this.calculate_form_lat.value = "";
      this.calculate_form_lng.value = "";
      this.addressString.innerHTML =
        '<span class="grey-text">Не указано</span>';
      this.addressStringField.value = "";
      this.clusterer ? this.map.geoObjects.add(this.clusterer) : this.clusterer;
    },
    searchResultParse(event) {
      const index = event.get("index");
      this.searchControl.getResult(index).then(function(res) {
        this.setMarkerPosition(res.geometry.getCoordinates());
        this.searchControl.clear();
      });
    },
    iniMarkerPosition(event) {
      this.setMarkerPosition(event.get("coords"));
    },
    setMarkerPosition(coo) {
      const self = this;
      if (!this.placemark) {
        this.placemark = new window["ymaps"].Placemark(
          this.coord,
          {},
          {
            preset: "islands#redIcon",
          }
        );
        this.map.geoObjects.add(this.placemark);
      }
      window["ymaps"].geocode(coo).then(function(res) {
        var firstGeoObject = res.geoObjects.get(0);
        const address = firstGeoObject.getAddressLine();
        self.addressString.textContent = address;
        self.addressStringField.value = address;
      });

      this.placemark.geometry.setCoordinates(coo);
      this.calculate_form_lat.value = coo[0];
      this.calculate_form_lng.value = coo[1];
      this.checkMetroDuration();
    },
    checkMetroDuration() {
      window["ymaps"].geocode(this.coord, { kind: "metro" }).then((res) => {
        const nearest = res.geoObjects.get(0);
        const multiRouteModel = new window["ymaps"].multiRouter.MultiRouteModel(
          [this.coord, nearest.geometry.getCoordinates()],
          {
            routingMode: "pedestrian",
          }
        );
        multiRouteModel.events.add("requestsuccess", () => {
          const routes = multiRouteModel.getRoutes();
          this.calculateFormRequest.time_to_metro = Math.round(
            routes[0].properties.get("duration").value / 60
          );
        });
      });
    },
    createClusters(data) {
      var customItemContentLayout = window[
        "ymaps"
      ].templateLayoutFactory.createClass(
        "<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>" +
          "<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>" +
          "<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>"
      );

      this.clusterer = new window["ymaps"].Clusterer({
        clusterIcons: [
          {
            href: "static/images/icons/pin_maps.svg",
            size: [64, 64],
            offset: [-32, -20],
          },
        ],
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: true,
        clusterBalloonPanelMaxMapArea: 0,
        clusterBalloonContentLayoutWidth: 500,
        clusterBalloonItemContentLayout: customItemContentLayout,
        clusterBalloonLeftColumnWidth: 220,
      });

      this.map.geoObjects.add(this.clusterer);

      const placemarks = [];

      for (let k in data) {
        const resultItem = data[k];

        const pm = new window["ymaps"].Placemark(
          [resultItem.latitude, resultItem.longitude],
          {
            balloonContentHeader: data[k].address,
            balloonContentBody:
              data[k].price.toLocaleString() +
              " ₽<br/>" +
              '<a href="' +
              data[k].link +
              '" target="_blank">' +
              data[k].link +
              "</a>",
            balloonContentFooter:
              '<small style="color: #ddd">Smart Realty</small>',
          },
          {
            iconLayout: "default#imageWithContent",
            iconImageHref: "static/images/icons/pin_maps.svg",
            iconImageSize: [56, 56],
            iconImageOffset: [-28, -28],
            iconContentOffset: [15, 15],
          }
        );

        resultItem.placemark = pm;
        placemarks.push(pm);
      }

      this.clusterer.add(placemarks);
    },
  },
  mounted() {
    window.ymaps.ready(this.initMap);

    this.addressString = document.querySelector("#addressString");
    this.addressStringField = document.querySelector("#addressStringField");
    this.calculate_form_lat = document.querySelector("#calculate_form_lat");
    this.calculate_form_lng = document.querySelector("#calculate_form_lng");

    this.emptyMsg = document.querySelector("#empty-msg");
    this.form_error = document.querySelector("#search-form_error");

    this.analyzeBtn = document.querySelector("#analyze-init");
    this.analyzeBtn.addEventListener("click", this.iniAnalyzeForm);

    this.searchBtn = document.querySelector("#search-init");
    this.searchBtn.addEventListener("click", this.iniSearchForm);

    this.results = document.querySelector("#results");
  },
  destroyed() {
    this.analyzeBtn.removeEventListener("click", this.iniAnalyzeForm);
    this.searchBtn.removeEventListener("click", this.iniSearchForm);
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
