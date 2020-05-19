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
    };
  },
  methods: {
    submitCalculate() {},
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
        .post("/api", {
          data: requestData
        })
        .then((response) => console.log(response))
        .catch((e) => console.log(e));
      // $.ajax({
      //   url: "/api/mean/",
      //   // url: 'static/test.json',
      //   data: requestData,
      // }).then(
      //   (res) => {
      //     searchResultsBlock.show().removeClass("in-progress");
      //     $("#search-items-count").text(res["count"]);
      //     if (res["max_page"] === res["page"]) {
      //       $("#show-more-button").hide();
      //     } else {
      //       $("#show-more-button").show();
      //     }

      //     if (!notCreateData) {
      //       searchResult = res["flats"];
      //       iniShowMoreResults();
      //       // createNavigation(res['max_page']);
      //     } else {
      //       searchResult = searchResult.concat(res["flats"]);
      //     }

      //     searchResultsBlock.removeClass("in-progress");
      //     if (res.flats.length) {
      //       $("#visible-items-count").text(searchResult.length);
      //       createClusters(searchResult);
      //       showResultPage(res);
      //     }
      //   },
      //   () => {
      //     $("#search-form_error").show();
      //   }
      // );
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
    this.resultsBlock = document.querySelector("#visible-results");
    this.loading_results = document.querySelector("#loading_results");
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
