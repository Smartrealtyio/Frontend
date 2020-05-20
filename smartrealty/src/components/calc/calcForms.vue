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
        <div class="calculate-form_field_label">
          Количество комнат
        </div>
        <div class="calculate-form_field_control">
          <div class="calculate-form_radios-group">
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
          <div class="calculate-form_field_control_group_cell">
            <input
              type="number"
              placeholder="от"
              required
              name="full_sq_from"
              data-validator
              min="5"
            />
          </div>
          <div class="calculate-form_field_control_group_cell">
            <input
              type="number"
              placeholder="до"
              required
              name="full_sq_to"
              data-validator
              min="5"
            />
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
        <div class="calculate-form_field">
          <div class="calculate-form_field_label">
            Тип постройки
          </div>
          <div class="calculate-form_field_control">
            <select name="building_type_str">
              <option value="">Любой</option>
              <option value="0">Блочный</option>
              <option value="1">Кирпичный</option>
              <option value="2">Монолит</option>
              <option value="3">Кирп Монолит</option>
              <option value="4">Панельный</option>
              <option value="6">Деревянный</option>
              <option value="5">Неизвестный</option>
            </select>
          </div>
        </div>

        <div class="calculate-form_field">
          <div class="calculate-form_field_label">
            Площадь кухни
          </div>
          <div class="calculate-form_field_control">
            <input
              type="number"
              name="kitchen_sq"
              data-validator
              min="5"
            />&nbsp;
            <span class="calculate-form_field_unit"> м<sup>2</sup> </span>
          </div>
        </div>

        <div class="calculate-form_field">
          <div class="calculate-form_field_label">
            Жилая площадь
          </div>
          <div class="calculate-form_field_control">
            <input type="number" name="life_sq" data-validator min="5" />&nbsp;
            <span class="calculate-form_field_unit"> м<sup>2</sup> </span>
          </div>
        </div>

        <div class="calculate-form_field">
          <div class="calculate-form_field_label">
            Стоимость квартиры (руб)
          </div>
          <div
            class="calculate-form_field_control calculate-form_field_control_group"
          >
            <div class="calculate-form_field_control_group_cell">
              <input
                type="number"
                name="price_from"
                data-validator
                placeholder="от"
              />&nbsp;
            </div>
            <div class="calculate-form_field_control_group_cell">
              <input
                type="number"
                name="price_to"
                data-validator
                placeholder="до"
              />&nbsp;
            </div>
          </div>
        </div>

        <div class="calculate-form_checkbox-group">
          <label class="calculate-form_checkbox">
            <input type="checkbox" name="renovation" />
            <span class="calculate-form_checkbox_mask"></span>
            <span class="calculate-form_checkbox_text">Хороший ремонт</span>
          </label>
          <label class="calculate-form_checkbox">
            <input type="checkbox" name="has_elevator" />
            <span class="calculate-form_checkbox_mask"></span>
            <span class="calculate-form_checkbox_text">Есть лифт</span>
          </label>
          <label class="calculate-form_checkbox">
            <input type="checkbox" name="floor_first" />
            <span class="calculate-form_checkbox_mask"></span>
            <span class="calculate-form_checkbox_text">Первый жилой этаж</span>
          </label>
          <label class="calculate-form_checkbox">
            <input type="checkbox" name="floor_last" />
            <span class="calculate-form_checkbox_mask"></span>
            <span class="calculate-form_checkbox_text">Последний этаж</span>
          </label>
        </div>
      </div>
      <div class="calculate-form_btn">
        <button type="submit" class="btn btn-submit">Найти</button>
      </div>
    </form>

    <!-- Форма расчета стоимости квартиры -->
    <form
      class="calculate-form_fields"
      id="calculate-form"
      @submit.prevent="submitCalculate"
    >
      <div class="calculate-form_map_label calculate-form_map_label_hide">
        укажите точку на карте
      </div>

      <div class="calculate-form_field">
        <div class="calculate-form_field_control">
          <div class="calculate-form_radios-group wide-group-2">
            <label class="calculate-form_radio">
              <input checked type="radio" name="city_id" value="0" required />
              <span class="calculate-form_radio_mask"></span>
              <span class="calculate-form_radio_text icon icon-msk"
                >Москва</span
              >
            </label>
            <label class="calculate-form_radio">
              <input type="radio" name="city_id" value="1" required />
              <span class="calculate-form_radio_mask"></span>
              <span class="calculate-form_radio_text icon icon-spb"
                >Санкт-Петербург</span
              >
            </label>
          </div>
        </div>
      </div>

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
              <input type="radio" name="secondary" value="1" required />
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

      <div class="newhouse calculate-form_field">
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
        class="newhouse calculate-form_field calculate-form_field-double-custom mt-20"
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    map: {
      required: true,
    },
    clusterer: {
      required: true,
    },
  },
  data() {
    return {
      form_error: null,
      searchForm: null,
      resultsBlock: null,
      loading_results: null,
      searchFormRequest: {},
      show_more_button: null,
      searchResult: {},
      resultItem: null,
      search_items_count: null,
      calculateForm: null,
      calculateFormRequest: {},
      results: null,
      emptyMsg: null
    };
  },
  methods: {
    submitCalculate() {
      this.sendCalculateForm();
    },
    sendCalculateForm() {
      const fields = this.calculateForm.querySelectorAll(["input", "select"])
      const values = {};

      fields.forEach(itemModel => {
        const itemType = itemModel.type;
        if (itemModel.name) {
          switch (itemType) {
            case "checkbox":
              values[itemModel.name] = itemModel.checked
                ? "1"
                : "0";
              console.log(values[itemModel.name], itemModel.value);
              break;
            case "radio":
              if (itemModel.checked)
                values[itemModel.name] = itemModel.value;
              console.log(itemModel.name, itemModel.value);
              break;
            default:
              values[itemModel.name] = itemModel.value || undefined;
              console.log(values[itemModel.name], itemModel.value);
          }
        }
      });

      for (const k in values) {
        this.calculateFormRequest[k] = values[k];
      }

      this.results.classList.add('hide')
      this.emptyMsg.classList.add('hide')

      this.loading_results.classList.add('show')

      console.log(this.calculateFormRequest)

      // $.ajax({
      //   url: "/map",
      //   // url: 'static/plot-chart.json',
      //   data: calculateFormRequest,
      // }).then(
      //   (res) => {
      //     const chartData = [];

      //     const allPeriod = res.PLot[res.PLot.length - 1]["x"];
      //     let latestValue = res.PLot.shift();

      //     const stepColor = allPeriod / chartColorsList.length;

      //     const allColors = chartColorsList.map((item) => {
      //       return item;
      //     });

      //     let linesColor = allColors.shift();

      //     for (let k = latestValue["x"]; k < allPeriod; k++) {
      //       if (res.PLot[0].x === k) {
      //         latestValue = res.PLot.shift();
      //         if (latestValue["x"] / stepColor < res.PLot[0]["x"] / stepColor) {
      //           linesColor = allColors.shift();
      //         }
      //       }
      //       while (res.PLot[0].x <= k) {
      //         res.PLot.shift();
      //       }
      //       if (latestValue["y"] !== 0) {
      //         chartData.push({
      //           x: k,
      //           y: latestValue["y"],
      //           lineColor: linesColor,
      //         });
      //       }
      //     }

      //     if (res.Price) {
      //       resultPrice.text(res.Price.toLocaleString() + " руб.");
      //       resultDuration.text(res.Duration ? res.Duration + " дн." : " - ");
      //       results.show();
      //       $("#loading_results").hide();
      //     } else {
      //       results.hide();
      //     }

      //     if (chartData.length) {
      //       chartDiv.show();
      //       chart.data = chartData;
      //     } else {
      //       chartDiv.hide();
      //       chart.data = [];

      //       emptyMsg.show();
      //     }
      //   },
      //   () => {
      //     emptyMsg.show();
      //     results.hide();
      //   }
      // );
    },
    submitSearch() {
      this.sendSearchForm();
    },
    sendSearchForm(notCreateData, addData) {
      const searchResultsBlock = document.querySelector("#results-list-block");
      searchResultsBlock.classList.add("in-progress");

      this.map.geoObjects.remove(this.clusterer);

      if (!notCreateData) {
        searchResultsBlock.classList.add("hide");
        this.resultsBlock.innerHTML = "";
        this.createSearchRequest();
      }

      let requestData = { ...this.searchFormRequest };
      if (addData) {
        requestData = { ...requestData, ...addData };
      }
      this.form_error.classList.add("hide");
      console.log(requestData);
      axios
        .get("/api/mean/", {
          params: requestData,
        })
        .then((res) => {
          console.log(res);
          searchResultsBlock.classList.add("show");
          searchResultsBlock.remove("in-progress");
          this.search_items_count.textContent = res["count"];
          if (res["max_page"] === res["page"]) {
            this.show_more_button.classList.add("hide");
          } else {
            this.show_more_button.classList.remove("hide");
          }
          if (!notCreateData) {
            this.searchResult = res["flats"];
            this.iniShowMoreResults();
          } else {
            this.searchResult = this.searchResult.concat(res["flats"]);
          }
          searchResultsBlock.classList.remove("in-progress");
          if (res.flats.length) {
            const visible_items_count = document.querySelector(
              "#visible-items-count"
            );
            visible_items_count.textContent = this.searchResult.length;
            this.createClusters(this.searchResult);
            this.showResultPage(res);
          }
        })
        .catch((e) => console.log(e));
    },
    showResultPage(searchResult) {
      searchResult.flats.forEach((oneResultItem) => {
        const resultItemElement = this.resultItem.clone();
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
          const valElement = resultItemElement.is("[data-" + visParam + "]")
            ? resultItemElement
            : resultItemElement.find("[data-" + visParam + "]");

          if (valElement.length) {
            if (param === "price" || param === "price_per_m") {
              oneResultItem[visParam] = oneResultItem[param].toLocaleString();
            }

            if (param === "profit") {
              oneResultItem[visParam] =
                Math.max(Math.round(oneResultItem[param] * 10), 1) / 10 + "%";
            }

            switch (valElement.data(visParam)) {
              case "text":
                valElement.text(oneResultItem[visParam]);
                break;
              case "background":
                valElement.css({
                  backgroundImage: "url(" + oneResultItem[visParam] + ")",
                });
                break;
              default:
                valElement.attr(
                  valElement.data(visParam),
                  oneResultItem[visParam]
                );
            }
          }
        }
        this.resultsBlock.append(resultItemElement);
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
    iniShowMoreResults() {
      let currentPage = 1;
      this.show_more_button.addEventListener("click", () => {
        currentPage++;
        this.sendSearchForm(true, {
          page: currentPage,
        });
      });
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
      console.log(blocks);
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
    this.calculateForm = document.querySelector("#calculate-form")
    this.resultsBlock = document.querySelector("#visible-results");
    this.loading_results = document.querySelector("#loading_results");
    this.show_more_button = document.querySelector("#show-more-button");
    this.resultItem = document.querySelector("#result-item-tpl").innerHTML;
    this.search_items_count = document.querySelector("#search-items-count");
    this.results = document.querySelector('#results')
    this.emptyMsg = document.querySelector('#empty-msg')
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
