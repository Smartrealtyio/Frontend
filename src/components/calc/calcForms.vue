<template>
  <div>
    <!-- Форма поиска выгодных предложений -->
    <form
      class="calculate-form_fields"
      id="search-form"
      @submit.prevent="submitSearch"
    >
      <div class="calculate-form_map_label calculate-form_map_label_hide">
        укажите точку на карте
      </div>
      <div class="calculate-form_field">
        <change-city
          :currentCity="currentCity"
          @change-city="changeCurrentCity"
        ></change-city>
      </div>
      <div class="calculate-form_field">
        <div class="calculate-form_field_control">
          <div class="calculate-form_radios-group wide-group-2">
            <label class="calculate-form_radio">
              <input type="radio" name="secondary" value="1" checked required />
              <span class="calculate-form_radio_mask"></span>
              <span class="calculate-form_radio_text">Вторичка</span>
            </label>
            <label class="calculate-form_radio">
              <input type="radio" name="secondary" value="0" required />
              <span class="calculate-form_radio_mask"></span>
              <span class="calculate-form_radio_text">Новостройка</span>
            </label>
          </div>
        </div>
      </div>
      <div class="calculate-form_field">
        <div class="calculate-form_field_label">
          Количество комнат
        </div>
        <div class="calculate-form_field_control">
          <div class="calculate-form_radios-group wide-group">
            <label class="calculate-form_radio">
              <input type="radio" name="rooms" value="-1" />
              <span class="calculate-form_radio_mask"></span>
              <span class="calculate-form_radio_text">Студия</span>
            </label>
            <label class="calculate-form_radio">
              <input type="radio" name="rooms" value="1" />
              <span class="calculate-form_radio_mask"></span>
              <span class="calculate-form_radio_text"><b>1</b></span>
            </label>
            <label class="calculate-form_radio">
              <input type="radio" name="rooms" value="2" checked />
              <span class="calculate-form_radio_mask"></span>
              <span class="calculate-form_radio_text"><b>2</b></span>
            </label>
            <label class="calculate-form_radio">
              <input type="radio" name="rooms" value="3" />
              <span class="calculate-form_radio_mask"></span>
              <span class="calculate-form_radio_text"><b>3</b></span>
            </label>
            <label class="calculate-form_radio">
              <input type="radio" name="rooms" value="4" />
              <span class="calculate-form_radio_mask"></span>
              <span class="calculate-form_radio_text"><b>4+</b></span>
            </label>
          </div>
        </div>
      </div>
      <div class="calculate-form_field">
        <div class="calculate-form_field_label">
          Общая площадь (м<sup>2</sup>)
        </div>
        <div
          class="calculate-form_field_control calculate-form_field_control_group"
        >
          <div
            class="calculate-form_field short-group-3 calculate-form__field--big"
          >
            <div class="calculate-form_field_control">
              <input
                type="number"
                placeholder="от"
                name="full_sq_from"
                data-validator
                v-model="searchInputs.sq_before"
                min="5"
              />&nbsp;
              <span class="calculate-form_field_unit"> м<sup>2</sup> </span>
            </div>
          </div>
          <div
            class="calculate-form_field short-group-3 calculate-form__field--big"
          >
            <div class="calculate-form_field_control">
              <input
                type="number"
                placeholder="до"
                name="full_sq_to"
                data-validator
                v-model="searchInputs.sq_to"
                min="5"
              />&nbsp;
              <span class="calculate-form_field_unit"> м<sup>2</sup> </span>
            </div>
          </div>
        </div>
      </div>
      <input
        type="checkbox"
        class="additional-params_checkbox"
        id="additional-params-checkbox"
      />
      <label
        class="additional-params_link"
        id="additional-params-link"
        for="additional-params-checkbox"
      >
        <span>Дополнительные опции</span>
      </label>
      <div class="additional-params_params" id="additional-params">
        <div class="short-group calculate-form_field">
          <div
            class="calculate-form_field short-group-3 calculate-form__field--big"
          >
            <div class="calculate-form_field_label">
              Площадь кухни
            </div>
            <div class="calculate-form_field_control">
              <input
                type="number"
                name="kitchen_sq1"
                data-validator
                min="5"
              />&nbsp;
              <span class="calculate-form_field_unit"> м<sup>2</sup> </span>
            </div>
          </div>
          <div
            class="calculate-form_field short-group-3 calculate-form__field--big"
          >
            <div class="calculate-form_field_label">
              Жилая площадь
            </div>
            <div class="calculate-form_field_control">
              <input
                type="number"
                name="life_sq"
                data-validator
                min="5"
              />&nbsp;
              <span class="calculate-form_field_unit"> м<sup>2</sup> </span>
            </div>
          </div>
        </div>

        <div class="calculate-form_field">
          <div class="calculate-form_field_label">
            Стоимость квартиры (руб)
          </div>
          <div
            class="calculate-form_field_control calculate-form_field_control_group"
          >
            <div
              class="calculate-form_field short-group-3 calculate-form__field--big"
            >
              <div class="calculate-form_field_control">
                <input
                  type="number"
                  name="price_from"
                  placeholder="от"
                  data-validator
                />
              </div>
            </div>
            <div
              class="calculate-form_field short-group-3 calculate-form__field--big"
            >
              <div class="calculate-form_field_control">
                <input
                  type="number"
                  name="price_to"
                  placeholder="до"
                  data-validator
                />
              </div>
            </div>
          </div>
        </div>

        <div class="calculate-form_checkbox-group column-wide-2">
          <label class="calculate-form_checkbox">
            <input type="checkbox" name="renovation" />
            <span class="calculate-form_checkbox_mask"></span>
            <span class="calculate-form_checkbox_text">Ремонт</span>
          </label>
          <label class="calculate-form_checkbox">
            <input type="checkbox" name="has_elevator" />
            <span class="calculate-form_checkbox_mask"></span>
            <span class="calculate-form_checkbox_text">Есть лифт</span>
          </label>
          <label class="calculate-form_checkbox">
            <input type="checkbox" name="floor_first" />
            <span class="calculate-form_checkbox_mask"></span>
            <span class="calculate-form_checkbox_text">Первый этаж</span>
          </label>
          <label class="calculate-form_checkbox">
            <input type="checkbox" name="floor_last" />
            <span class="calculate-form_checkbox_mask"></span>
            <span class="calculate-form_checkbox_text">Последний этаж</span>
          </label>
        </div>
      </div>
      <div class="calculate-form_btn-wrapper">
        <div class="calculate-form_btn">
          <button type="submit" class="btn btn-submit">Найти</button>
        </div>
        <div
          class="calculate-form_btn--nodata"
          v-show="
            this.searchInputs.sq_to === '' || this.searchInputs.sq_before === ''
          "
        ></div>
      </div>
    </form>
    <search-results
      :isError="isSearchError"
      :searchData="resultsData"
    ></search-results>

    <!-- Форма расчета стоимости квартиры -->
    <form
      class="calculate-form_fields"
      id="calculate-form"
      @submit.prevent="submitCalculate"
    >
      <div class="calculate-form_mask" v-show="!coordChanged"></div>
      <div class="calculate-form_map_label calculate-form_map_label_hide">
        укажите точку на карте
      </div>

      <change-city
        :currentCity="currentCity"
        @change-city="changeCurrentCity"
      ></change-city>

      <div class="calculate-form_field">
        <div class="calculate-form_field_label">
          Адрес/место на карте
        </div>
        <div class="calculate-form_field_control">
          <span id="addressString">
            <span class="grey-text">Не указано</span>
          </span>
          <input class="hidden-input" id="addressStringField" required />
          <input type="hidden" name="lat" id="calculate_form_lat" required />
          <input type="hidden" name="lng" id="calculate_form_lng" required />
        </div>
      </div>

      <div class="calculate-form_field">
        <div class="calculate-form_field_control">
          <div class="calculate-form_radios-group wide-group-2">
            <label class="calculate-form_radio">
              <input type="radio" name="secondary" value="1" checked required />
              <span class="calculate-form_radio_mask"></span>
              <span class="calculate-form_radio_text">Вторичка</span>
            </label>
            <label class="calculate-form_radio">
              <input type="radio" name="secondary" value="0" required />
              <span class="calculate-form_radio_mask"></span>
              <span class="calculate-form_radio_text">Новостройка</span>
            </label>
          </div>
        </div>
      </div>

      <div class="newhouse calculate-form_field hide">
        <div class="calculate-form_field_label">
          Готовность
        </div>
        <div class="calculate-form_field_control">
          <div class="calculate-form_radios-group wide-group-2">
            <label class="calculate-form_radio">
              <input type="radio" name="is_rented" checked value="1" required />
              <span class="calculate-form_radio_mask"></span>
              <span class="calculate-form_radio_text">Сдан</span>
            </label>
            <label class="calculate-form_radio">
              <input type="radio" name="is_rented" value="0" required />
              <span class="calculate-form_radio_mask"></span>
              <span class="calculate-form_radio_text">Не сдан</span>
            </label>
          </div>
        </div>
      </div>

      <div
        class="newhouse calculate-form_field calculate-form_field-double-custom mt-20 hide"
      >
        <div class="calculate-form_field">
          <div class="calculate-form_field_label">
            Год
          </div>
          <div class="calculate-form_field_control">
            <select name="rent_year" id="rent_year">
              <option value="2023">2023</option>
              <option value="2021">2022</option>
              <option value="2021">2021</option>
              <option value="2020" selected>2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
            </select>
          </div>
        </div>

        <div class="calculate-form_field">
          <div class="calculate-form_field_label">
            Квартал
          </div>
          <div class="calculate-form_field_control">
            <div class="calculate-form_radios-group wide-group">
              <label class="calculate-form_radio">
                <input type="radio" name="rent_quarter" value="1" />
                <span class="calculate-form_radio_mask"></span>
                <span class="calculate-form_radio_text"><b>1</b></span>
              </label>
              <label class="calculate-form_radio">
                <input type="radio" name="rent_quarter" value="2" />
                <span class="calculate-form_radio_mask"></span>
                <span class="calculate-form_radio_text"><b>2</b></span>
              </label>
              <label class="calculate-form_radio">
                <input type="radio" name="rent_quarter" value="3" />
                <span class="calculate-form_radio_mask"></span>
                <span class="calculate-form_radio_text"><b>3</b></span>
              </label>
              <label class="calculate-form_radio">
                <input type="radio" name="rent_quarter" value="4" />
                <span class="calculate-form_radio_mask"></span>
                <span class="calculate-form_radio_text"><b>4</b></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="calculate-form_field mt-20">
        <div class="calculate-form_field_label">
          Количество комнат
        </div>
        <div class="calculate-form_field_control">
          <div class="calculate-form_radios-group wide-group">
            <label class="calculate-form_radio">
              <input type="radio" name="rooms" value="0" />
              <span class="calculate-form_radio_mask"></span>
              <span class="calculate-form_radio_text"
                >&nbsp;&nbsp;<b>Студия</b>&nbsp;&nbsp;</span
              >
            </label>
            <label class="calculate-form_radio">
              <input type="radio" name="rooms" value="1" />
              <span class="calculate-form_radio_mask"></span>
              <span class="calculate-form_radio_text"><b>1</b></span>
            </label>
            <label class="calculate-form_radio">
              <input type="radio" name="rooms" value="2" checked />
              <span class="calculate-form_radio_mask"></span>
              <span class="calculate-form_radio_text"><b>2</b></span>
            </label>
            <label class="calculate-form_radio">
              <input type="radio" name="rooms" value="3" />
              <span class="calculate-form_radio_mask"></span>
              <span class="calculate-form_radio_text"><b>3</b></span>
            </label>
            <label class="calculate-form_radio">
              <input type="radio" name="rooms" value="4" />
              <span class="calculate-form_radio_mask"></span>
              <span class="calculate-form_radio_text"><b>4+</b></span>
            </label>
          </div>
        </div>
      </div>
      <div class="short-group">
        <div class="calculate-form_field short-group-3">
          <div class="calculate-form_field_label">
            Общая площадь
          </div>
          <div class="calculate-form_field_control">
            <input
              type="number"
              required
              name="full_sq"
              data-validator
              min="5"
            />&nbsp;
            <span class="calculate-form_field_unit"> м<sup>2</sup> </span>
          </div>
        </div>
        <div class="calculate-form_field short-group-3">
          <div class="calculate-form_field_label">
            Площадь кухни
          </div>
          <div class="calculate-form_field_control">
            <input
              required
              type="number"
              name="kitchen_sq"
              data-validator
              min="5"
            />&nbsp;
            <span class="calculate-form_field_unit"> м<sup>2</sup> </span>
          </div>
        </div>
        <div class="calculate-form_field short-group-3">
          <div class="calculate-form_field_label">
            Жилая площадь
          </div>
          <div class="calculate-form_field_control">
            <input
              required
              type="number"
              name="life_sq"
              data-validator
              min="5"
            />&nbsp;
            <span class="calculate-form_field_unit"> м<sup>2</sup> </span>
          </div>
        </div>
      </div>

      <div class="calculate-form_checkbox-group column-wide-2">
        <label class="calculate-form_checkbox">
          <input checked type="checkbox" name="renovation" />
          <span class="calculate-form_checkbox_mask"></span>
          <span class="calculate-form_checkbox_text">Ремонт</span>
        </label>
        <label class="calculate-form_checkbox">
          <input checked type="checkbox" name="elevator" />
          <span class="calculate-form_checkbox_mask"></span>
          <span class="calculate-form_checkbox_text">Есть лифт</span>
        </label>
        <label class="calculate-form_checkbox">
          <input type="checkbox" name="floor_first" />
          <span class="calculate-form_checkbox_mask"></span>
          <span class="calculate-form_checkbox_text">Первый этаж</span>
        </label>
        <label class="calculate-form_checkbox">
          <input type="checkbox" name="floor_last" />
          <span class="calculate-form_checkbox_mask"></span>
          <span class="calculate-form_checkbox_text">Последний этаж</span>
        </label>
      </div>
      <div class="calculate-form_btn">
        <button type="submit" class="btn btn-submit wide-btn mt-15">
          Рассчитать
        </button>
      </div>
    </form>
    <div class="calculate-form_result" v-show="isDataReady">
      <div class="calculate-form_result_item">
        <div class="calculate-form_result_item_title">Прогнозируемая стоимость продажи</div>
        <div class="calculate-form_result_item_value" ref="result_price"></div>
      </div>
      <div class="calculate-form_result_item">
        <div class="calculate-form_result_item_title">
          Прогнозируемый срок продажи 
        </div>
        <div
          class="calculate-form_result_item_value"
          ref="result_duration"
        ></div>
      </div>
      <div class="calculate-form_result-head" v-show="!isDataEmpty">
        График зависимости срока продажи от стоимости квартиры:
      </div>
      <div id="chartdiv" v-show="!isDataEmpty"></div>

      <div class="calculate-form_error" v-show="isDataEmpty">
        <span>Недостаточно данных</span>
      </div>
    </div>
    <div class="calculate-form_loading" v-if="isLoading"></div>
  </div>
</template>

<script>
import axios from "axios";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import changeCity from "./changeCity";
import searchResults from "./searchResults";
export default {
  props: {
    map: {
      required: true,
    },
    clusterer: {
      required: true,
    },
    calculateFormRequest: {
      required: true,
    },
    markCoord: {
      type: Object,
    },
  },
  components: {
    changeCity,
    searchResults,
  },
  data() {
    return {
      isSearchError: false,
      isLoading: false,
      isDataReady: false,
      isDataEmpty: false,
      currentCity: 0,
      form_error: null,
      searchForm: null,
      resultsBlock: null,
      searchFormRequest: {},
      searchResult: {},
      resultItem: null,
      search_items_count: null,
      calculateForm: null,
      chartDiv: null,
      chart: {},
      visible_items_count: null,
      mainClusterer: this.getClusterer,
      resultsData: [],
      searchInputs: {
        sq_before: "",
        sq_to: "",
      },
    };
  },
  computed: {
    getClusterer() {
      return this.clusterer;
    },
    coordChanged() {
      return this.markCoord.lat != null ? true : false;
    }
  },
  methods: {
    changeCurrentCity(index) {
      this.currentCity = index;
      this.$emit("set-current-city", index);
    },
    submitCalculate() {
      this.sendCalculateForm();
    },
    sendCalculateForm() {
      this.isLoading = true;
      this.isDataReady = false;
      const fields = this.calculateForm.querySelectorAll(["input", "select"]);
      const values = {};

      fields.forEach((itemModel) => {
        const itemType = itemModel.type;
        if (itemModel.name) {
          switch (itemType) {
            case "checkbox":
              values[itemModel.name] = itemModel.checked ? "1" : "0";
              break;
            case "radio":
              if (itemModel.checked) values[itemModel.name] = itemModel.value;
              break;
            default:
              values[itemModel.name] = itemModel.value || undefined;
          }
        }
      });

      for (const k in values) {
        this.calculateFormRequest[k] = values[k];
      }

      this.data;
      axios
        .get("/map", {
          params: this.calculateFormRequest,
        })
        .then((res) => {
          res = res.data;
          console.log(res)
          this.isLoading = false;
          this.isDataReady = true;
          if (res.PLot.length == 1) {
            this.isDataEmpty = true;
          }
          if (window.innerWidth < 767) {
            res.PLot.forEach((item) => {
              item.price = Math.floor(item.price / 1000);
            });
            this.chart.data = res.PLot;
          } else {
            this.chart.data = res.PLot;
          }
          this.$refs.result_price.innerHTML = res.Price ? res.Price.toLocaleString() + ' руб.' : ' - '
          this.$refs.result_duration.innerHTML = res.Duration ? res.Duration + ' дней.' : ' - '
        })
        .catch((e) => console.log(e));
    },
    submitSearch() {
      this.sendSearchForm();
      this.resultsData = [];
    },
    sendSearchForm(notCreateData, addData) {
      this.map.geoObjects.remove(this.mainClusterer);
      this.isLoading = true;

      if (!notCreateData) {
        this.createSearchRequest();
      }

      let requestData = { ...this.searchFormRequest };
      if (addData) {
        requestData = { ...requestData, ...addData };
      }
      this.form_error.classList.add("hide");
      axios
        .get("/api/mean/", {
          params: requestData,
        })
        .then((res) => {
          res = res.data;
          this.isLoading = false;
          this.isSearchError = res.length === 0 ? true : false;
          this.resultsData = [];
          if (!notCreateData) {
            this.searchResult = res["flats"];
          } else {
            this.searchResult = this.searchResult.concat(res["flats"]);
          }
          // searchResultsBlock.classList.remove("in-progress");
          if (res.flats.length) {
            this.createClusters(this.searchResult);
            this.showResultPage(res);
          }
        })
        .catch((e) => console.log(e));
    },
    showResultPage(searchResult) {
      searchResult.flats.forEach((oneResultItem) => {
        // const resultItemElement = null;
        const resultItemObj = {};
        oneResultItem.price_per_m = Math.round(
          oneResultItem.price / oneResultItem.full_sq
        );

        if (oneResultItem.metros && oneResultItem.metros.length) {
          oneResultItem.metro = oneResultItem.metros[0].station;
          oneResultItem.time_to_metro = oneResultItem.metros[0].time_to_metro;
        } else {
          oneResultItem.metro = undefined;
          oneResultItem.time_to_metro = undefined;
          oneResultItem.metro_hidden = "true";
        }
        for (let param in oneResultItem) {
          let visParam;
          if (
            param === "price" ||
            param === "price_per_m" ||
            param === "profit"
          ) {
            visParam = "visible_" + param;
          } else {
            visParam = param;
          }
          if (param === "price" || param === "price_per_m") {
            resultItemObj[visParam] = oneResultItem[param].toLocaleString();
            continue;
          }

          if (param === "profit") {
            resultItemObj[visParam] =
              Math.max(Math.round(oneResultItem[param] * 10), 1) / 10;
            continue;
          }
          resultItemObj[visParam] = oneResultItem[param];
        }
        this.resultsData.push(resultItemObj);
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

      this.mainClusterer = new window["ymaps"].Clusterer({
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

      this.map.geoObjects.add(this.mainClusterer);

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

      this.mainClusterer.add(placemarks);
    },
    createSearchRequest() {
      const fields = this.searchForm.querySelectorAll(["input", "select"]);

      const values = {};
      fields.forEach((itemModel) => {
        const itemType = itemModel.type;
        if (itemModel.name) {
          switch (itemType) {
            case "radio":
              values[itemModel.name] = itemModel.checked
                ? itemModel.value
                : values[itemModel.name] || undefined;
              break;
            case "checkbox":
              values[itemModel.name] = itemModel.checked ? "1" : "0";
              break;
            default:
              values[itemModel.name] = itemModel.value || undefined;
          }
        }
      });

      const convertedFormData = values;
      for (const k in convertedFormData) {
        this.searchFormRequest[k] = convertedFormData[k];
      }

      const mapInfo = this.map.getBounds();
      this.searchFormRequest["latitude_from"] = mapInfo[0][0];
      this.searchFormRequest["latitude_to"] = mapInfo[1][0];
      this.searchFormRequest["longitude_from"] = mapInfo[0][1];
      this.searchFormRequest["longitude_to"] = mapInfo[1][1];
    },
    changeNewHouse(e) {
      let blocks = document.querySelectorAll(".newhouse");
      if (e.target.value == 1) {
        blocks[0].classList.remove("show");
        blocks[1].classList.remove("show-flex");
        blocks.forEach((item) => item.classList.add("hide"));
      } else {
        blocks[0].classList.add("show");
        blocks[1].classList.add("show-flex");
      }
    },
    changeCity(e) {
      switch (e.target.value) {
        case "0":
          this.$emit("set-coord", [55.76, 37.64]);
          break;
        case "1":
          this.$emit("set-coord", [59.93, 30.31]);
          break;
        default:
          this.$emit("set-coord", [55.76, 37.64]);
          break;
      }
    },
  },
  mounted() {
    const inputsNewHouse = document.querySelectorAll("input[name='secondary']");
    const inputsChangeCity = document.querySelectorAll('input[name="city_id"]');

    inputsNewHouse.forEach((item) =>
      item.addEventListener("change", this.changeNewHouse)
    );
    inputsChangeCity.forEach((item) =>
      item.addEventListener("change", this.changeCity)
    );

    this.form_error = document.querySelector("#search-form_error");
    this.searchForm = document.querySelector("#search-form");
    this.calculateForm = document.querySelector("#calculate-form");
    this.resultsBlock = document.querySelector("#visible-results");
    // this.resultItem = document.querySelector("#result-item-tpl").querySelector('.results-list_item');
    this.search_items_count = document.querySelector("#search-items-count");
    this.chartDiv = document.querySelector("#chartdiv");
    this.visible_items_count = document.querySelector("#visible-items-count");

    am4core.ready(() => {
      am4core.useTheme(am4themes_animated);
      this.chart = am4core.create("chartdiv", am4charts.XYChart);
      var categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "term";
      categoryAxis.startLocation = 0.1;
      categoryAxis.endLocation = 0.8;

      var valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.numberFormatter = new am4core.NumberFormatter();
      if (window.innerWidth < 767) {
        valueAxis.numberFormatter.numberFormat = "# ' тыс'";
        valueAxis.renderer.fontSize = "10px";
      } else {
        valueAxis.numberFormatter.numberFormat = "# ' руб'";
      }
      valueAxis.tooltip.disabled = true;
      // valueAxis.renderer.line.opacity = 0;
      // valueAxis.renderer.ticks.template.disabled = true;
      valueAxis.min = 0;

      var lineSeries = this.chart.series.push(new am4charts.LineSeries());
      lineSeries.dataFields.categoryX = "term";
      lineSeries.dataFields.valueY = "price";
      lineSeries.tooltipText = "Цена: {valueY.value} руб.";
      // lineSeries.fillOpacity = 0.8;
      lineSeries.strokeWidth = 2;
      lineSeries.stroke = am4core.color("#66BB6A");

      var latitudeBullet = lineSeries.bullets.push(
        new am4charts.CircleBullet()
      );
      latitudeBullet.circle.stroke = am4core.color("#66BB6A");
      latitudeBullet.circle.strokeWidth = 6;

      this.chart.cursor = new am4charts.XYCursor();
      // this.chart.cursor.behavior = "panX";
      this.chart.cursor.lineX.opacity = 0;
      this.chart.cursor.lineY.opacity = 0;
    });
  },
  destroyed() {
    const inputsNewHouse = document.querySelectorAll("input[name='secondary']");
    const inputsChangeCity = document.querySelectorAll('input[name="city_id"]');

    inputsNewHouse.forEach((item) =>
      item.removeEventListener("change", this.changeNewHouse)
    );
    inputsChangeCity.forEach((item) =>
      item.removeEventListener("change", this.changeCity)
    );
  },
};
</script>

<style lang="scss" scoped></style>
