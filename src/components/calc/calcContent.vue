<template>
  <div class="calculate-form">
    <div class="calculate-form_map">
      <div class="calculate-form_map_label" data-search-map-title>
        Поиск будет происходит на видимом участке карты
      </div>
      <div class="calculate-form_map_label" data-analyze-map-title>
        Укажите точку на карте
      </div>
      <div class="calculate-form__steps calculate-form__steps--build">
        Укажите точку на карте:
      </div>
      <div class="calculate-form_map_container" id="realty-map">
        <div id="map"></div>
      </div>
    </div>
    <calc-forms
      @set-coord="setCoord"
      @set-res="setResults"
      @set-current-city="setCurCity"
      :map="map"
      :clusterer="clusterer"
      :calculateFormRequest="calculateFormRequest"
    ></calc-forms>
    <build-form :markCoord="markCoord" :currentCity="currentCity" :timeToMetro="time_to_metro"></build-form>
    <search-results :searchData="resData"></search-results>
    <div class="calculate-form_result" id="results" style="display: none;">
      <div class="calculate-form_result_item">
        <div class="calculate-form_result_item_title">
          Рекомендованная цена
        </div>
        <div class="calculate-form_result_item_value" id="result_price"></div>
      </div>
      <div class="calculate-form_result_item">
        <div class="calculate-form_result_item_title">
          Среднее время продажи
        </div>
        <div
          class="calculate-form_result_item_value"
          id="result_duration"
        ></div>
      </div>

      <div id="chartdiv" style="height: 400px; width: 100%;"></div>

      <div class="calculate-form_error" id="empty-msg">
        <span>Недостаточно данных</span>
      </div>
    </div>
  </div>
</template>

<script>
import calcForms from "./calcForms";
import buildForm from "./buildForm";
import searchResults from "./searchResults";
export default {
  components: {
    calcForms,
    searchResults,
    buildForm
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
      addressValue: "",
      addressString: null,
      addressStringField: null,
      calculate_form_lat: null,
      calculate_form_lng: null,
      calculateFormRequest: {},
      clusterer: null,
      resData: [],
      buildBtn: null,
      markCoord: {
        lat: null,
        lng: null
      },
      currentCity: 0,
      time_to_metro: null
    };
  },
  methods: {
    setCurCity(index) {
      this.currentCity = index
    },
    setCoord(coord) {
      this.coord = coord;
      this.map.setCenter(coord);
    },
    setResults(res) {
      this.resData = res;
    },
    initMap() {
      this.map = new window["ymaps"].Map("map", {
        center: [55.76, 37.64],
        zoom: 10,
      });

      this.searchControl = this.map.controls.get("searchControl");
      this.iniAnalyzeForm();
    },
    iniBuildForm() {
      this.removeCoordAndEvents();
      this.results.classList.remove('show')
      this.searchControl.events.add("resultselect", this.searchResultParse);
      this.map.events.add("click", this.iniMarkerPosition);
      this.form_error.classList.add("hide");
      this.emptyMsg.classList.add("hide");
    },
    iniAnalyzeForm() {
      this.removeCoordAndEvents();
      this.searchControl.events.add("resultselect", this.searchResultParse);
      this.map.events.add("click", this.iniMarkerPosition);
      this.form_error.classList.add("hide");
      this.emptyMsg.classList.add("hide");
      this.clusterer ? this.map.geoObjects.remove(this.clusterer) : false;
    },
    removeCoordAndEvents() {
      setTimeout(() => {
        this.map.container.fitToViewport();
      }, 0);
      this.addressValue = "";
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
    },
    iniSearchForm() {
      this.results.classList.remove('show')
      this.removeCoordAndEvents();
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
            iconImageHref: require('@/assets/images/icons/marker.svg'),
            iconImageSize: [30, 42]
          }
        );
        this.map.geoObjects.add(this.placemark);
      }
      window["ymaps"].geocode(coo).then(function(res) {
        var firstGeoObject = res.geoObjects.get(0);
        const address = firstGeoObject.getAddressLine();
        self.calculateFormRequest.addressString = address;
        self.addressString.textContent = address;
        self.addressStringField.value = address;
      });

      this.placemark.geometry.setCoordinates(coo);
      this.markCoord.lat = coo[0]
      this.markCoord.lng = coo[1]
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
          this.time_to_metro = this.calculateFormRequest.time_to_metro
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

    this.buildBtn = document.querySelector("#build-init");
    this.buildBtn.addEventListener("click", this.iniBuildForm);

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
