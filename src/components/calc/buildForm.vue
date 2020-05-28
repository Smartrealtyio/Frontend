<template>
  <form class="b-res" @submit.prevent="submitForm">
    <input
      type="text"
      class="b-res__input-map"
      v-model="markCoord.lng"
      required
    />
    <div class="b-res__container">
      <div class="b-res__house">
        <div class="calculate-form__steps calculate-form__steps--build">
          Укажите параметры дома:
        </div>
        <div class="b-res__house-box">
          <div class="b-res__house-item">
            <div class="b-res__house-item-head">Класс жилья</div>
            <div class="b-res__house-item-box">
              <label
                class="calculate-form_radio"
                v-for="(item, i) in houseData"
                :key="i"
              >
                <input
                  type="radio"
                  :checked="item.checked"
                  required
                  name="build-radio"
                  :value="item.value"
                  v-model.number="result.housing_class"
                />
                <span class="calculate-form_radio_mask"></span>
                <span class="calculate-form_radio_text">{{ item.text }}</span>
              </label>
            </div>
          </div>
          <div class="b-res__house-item">
            <div class="b-res__house-item-head">Сроки строительства</div>
            <span
              class="calculate-form_radio_text b-res__house-input-box b-res__house-input-date-box"
            >
              <input
                type="text"
                v-mask="'##.##.####'"
                v-model="start_time"
                class="b-res__house-input-date"
              />
              <img
                :src="require('@/assets/images/icons/arrow-date.svg')"
                alt=""
              />
              <input
                type="text"
                v-mask="'##.##.####'"
                v-model="end_time"
                class="b-res__house-input-date"
              />
            </span>
          </div>
          <div class="b-res__house-item">
            <div class="b-res__house-item-head">Кол-во этажей</div>
            <div
              class="b-res__house-item-box b-res__house-input-box b-res__house-input-number-box"
            >
              <input
                type="number"
                required
                name="build-radio"
                placeholder="9"
                class="b-res__house-input-number"
                v-model.number="result.floors_count"
              />
            </div>
          </div>
          <label class="calculate-form_checkbox b-res__house-input-check">
            <input type="checkbox" name="renovation" v-model="result.parking" />
            <span class="calculate-form_checkbox_mask"></span>
            <span class="calculate-form_checkbox_text">Паркинг</span>
          </label>
          <label class="calculate-form_checkbox b-res__house-input-check">
            <input
              type="checkbox"
              name="renovation"
              v-model="result.elevator"
            />
            <span class="calculate-form_checkbox_mask"></span>
            <span class="calculate-form_checkbox_text">Лифт</span>
          </label>
        </div>
      </div>
      <div class="b-res__apart">
        <div class="calculate-form__steps calculate-form__steps--build">
          Укажите параметры квартиры:
        </div>
        <div class="b-res__table">
          <div class="b-res__table-btn-add" @click="addNewType">
            <img :src="require('@/assets/images/icons/plus-row.svg')" alt="" />
            <span>Добавить тип квартиры</span>
          </div>
          <div class="b-res__table-row">
            <div
              class="b-res__table-head-item"
              v-for="(item, i) in tableCats"
              :key="i"
            >
              <div
                class="b-res__table-head-item-wrapper"
                @click="onTalbeHeadClick(item.cat)"
                :class="{ active: currentCat === item.cat }"
              >
                <div
                  class="b-res__table-head-item-text"
                  v-html="item.text"
                ></div>
                <img
                  :src="require('@/assets/images/icons/arrow-table.svg')"
                  alt=""
                  class="b-res__talbe-head-item-arrow"
                />
              </div>
            </div>
          </div>
          <div
            class="b-res__table-row"
            v-for="(itemRow, index) in sortRows"
            :key="index"
          >
            <input
              type="text"
              class="b-res__table-input-box"
              readonly
              :value="`тип ${itemRow.type}`"
            />
            <select
              name="rooms"
              id=""
              class="b-res__table-input-box b-res__table-select"
              v-model.number="itemRow.rooms"
            >
              <option value="s">Студия</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">+4</option>
            </select>
            <div class="b-res__table-input-wrapper">
              <input
                type="number"
                class="b-res__table-input-box"
                v-model.number="itemRow.full_sq"
              />
              <span class="b-res__table-input-field">м<sup>2</sup></span>
            </div>
            <div class="b-res__table-input-wrapper">
              <input
                type="number"
                class="b-res__table-input-box"
                v-model.number="itemRow.life_sq"
              />
              <span class="b-res__table-input-field">м<sup>2</sup></span>
            </div>
            <div class="b-res__table-input-wrapper">
              <input
                type="number"
                class="b-res__table-input-box"
                v-model.number="itemRow.kitchen_sq"
              />
              <span class="b-res__table-input-field">м<sup>2</sup></span>
            </div>
            <select
              name="rooms"
              id=""
              class="b-res__table-input-box b-res__table-select"
              v-model.number="itemRow.renovation_type"
            >
              <option value="0">Без ремонта</option>
              <option value="1">Косметический</option>
              <option value="1">Не указано</option>
              <option value="2">Евроремонт</option>
              <option value="3">Дизайнерский</option>
            </select>
            <select
              name="rooms"
              id=""
              class="b-res__table-input-box b-res__table-select"
              v-model.number="itemRow.windows_view"
            >
              <option value="0">Во двор</option>
              <option value="1">На улицу и двор</option>
              <option value="1">Не указано</option>
              <option value="2">На улицу</option>
            </select>
            <input
              type="number"
              class="b-res__table-input-box"
              v-model="itemRow.flats_count"
            />
            <input
              type="number"
              class="b-res__table-input-box"
              v-model="itemRow.price_meter_sq"
            />
          </div>
          <div class="b-res__table-box">
            <div
              class="b-res__table-btn b-res__table-btn--double"
              @click="setOneMoreRow"
              v-show="this.result.flats.length"
            >
              Дублировать
            </div>
            <div
              class="b-res__table-btn b-res__table-btn--delete"
              @click="deleteLastRow"
              v-show="this.result.flats.length"
            >
              <img
                :src="require('@/assets/images/icons/cross-table.svg')"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <button class="b-res__send">Рассчитать</button>
    </div>
    <div
      id="firtGraph"
      style="height: 400px; width: 100%;"
      v-show="dataReady"
    ></div>
    <div
      id="secondGraph"
      style="height: 400px; width: 100%;"
      v-show="dataReady"
    ></div>
    <div
      id="thirdGraph"
      style="height: 400px; width: 100%;"
      v-show="dataReady"
    ></div>
  </form>
</template>

<script>
import axios from "axios";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4chartsLeng from "@amcharts/amcharts4/lang/ru_RU.js";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
export default {
  props: {
    markCoord: {
      type: Object,
    },
    currentCity: {
      require: true,
    },
    timeToMetro: {
      require: true,
    },
  },
  data() {
    return {
      dataReady: false,
      chart1: null,
      chart2: null,
      chart3: null,
      currentId: 1,
      start_time: "01.01.2020",
      end_time: "01.12.2020",
      result: {
        housing_class: 0,
        start_timestamp: 0,
        end_timestamp: 0,
        floors_count: 9,
        parking: false,
        elevator: false,
        flats: [
          {
            type: 1,
            rooms: "s",
            full_sq: 15,
            life_sq: 5,
            kitchen_sq: 5,
            renovation_type: 1,
            windows_view: 0,
            flats_count: 1,
            price_meter_sq: 300,
          },
        ],
      },
      currentCat: null,
      tableCats: [
        {
          text: "Тип",
          cat: "type",
        },
        {
          text: "Комнат",
          cat: "rooms",
        },
        {
          text: "Общая",
          cat: "full_sq",
        },
        {
          text: "Жилая",
          cat: "life_sq",
        },
        {
          text: "Кухня",
          cat: "kitchen_sq",
        },
        {
          text: "Ремонт",
          cat: "renovation_type",
        },
        {
          text: "Вид из окна",
          cat: "windows_view",
        },
        {
          text: "Кол-во",
          cat: "flats_count",
        },
        {
          text:
            "<span>Стоимость <span>м<sup>2</sup></span> в <br/> первый месяц</span>",
          cat: "price_meter_sq",
        },
      ],
      houseData: [
        {
          checked: true,
          value: 0,
          text: "Эконом",
        },
        {
          checked: false,
          value: 1,
          text: "Комфорт",
        },
        {
          checked: false,
          value: 2,
          text: "Бизнес",
        },
        {
          checked: false,
          value: 3,
          text: "Элит",
        },
      ],
    };
  },
  computed: {
    sortRows() {
      let flats = [...this.result.flats];
      return this.currentCat === null
        ? this.result.flats
        : flats.sort((item1, item2) => {
            return item2[this.currentCat] - item1[this.currentCat];
          });
    },
  },
  methods: {
    submitForm() {
      
      this.dataReady = false;
      this.result.start_timestamp = Math.round(new Date(this.start_time).getTime() / 1000);
      this.result.end_timestamp = Math.round(new Date(this.end_time).getTime() / 1000);
      this.result.longitude = this.markCoord.lng;
      this.result.latitude = this.markCoord.lat;
      this.result.city_id = this.currentCity;
      this.result.time_to_metro = this.timeToMetro;

      axios
        .post("/api/builder/", this.result)
        .then((result) => {
          console.log(result);
          this.dataReady = true;

          this.chart1.data = result.data.first_graphic;
          this.chart2.data = result.data.second_graphic;
          this.chart3.data = result.data.third_graphic;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    setOneMoreRow() {
      this.currentId = this.currentId + 1;

      const lastRowCopy = {
        ...this.result.flats[this.result.flats.length - 1],
      };
      lastRowCopy.type = this.currentId;

      this.result.flats.push(lastRowCopy);
    },
    deleteLastRow() {
      this.currentId = this.result.flats.length - 1;
      this.result.flats.pop();
    },
    onTalbeHeadClick(cat) {
      if (cat === this.currentCat) {
        this.currentCat = null;
      } else {
        this.currentCat = cat;
      }
    },
    addNewType() {
      this.currentId = this.currentId + 1;
      const emptyType = {
        type: this.currentId,
        rooms: "s",
        full_sq: 15,
        life_sq: 5,
        kitchen_sq: 5,
        renovation_type: 1,
        windows_view: 0,
        flats_count: 1,
        price_meter_sq: 300,
      };
      this.result.flats.push(emptyType);
    },
  },
  mounted() {
    const self = this;
    const obj = {
      s: "Студия",
      s_color: "#66BB6A",
      "1": "1 ком",
      "1_color": "#8181D7",
      "2": "2 ком",
      "2_color": "#1CA9E5",
      "3": "3 ком",
      "3_color": "#17CFC7",
      "4": "4 ком",
      "4_color": "#6F38D3",
    };

    am4core.ready(() => {
      am4core.useTheme(am4themes_animated);
      // Themes end

      // Create chart instance
      this.chart1 = am4core.create("firtGraph", am4charts.XYChart);
      this.chart1.dateFormatter.inputDateFormat = "MM";
      // Create axes
      let categoryAxis = this.chart1.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "month_graphic";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 1;
      categoryAxis.renderer.cellStartLocation = 0.2;
      categoryAxis.renderer.cellEndLocation = 0.8;

      let valueAxis = this.chart1.yAxes.push(new am4charts.ValueAxis());
      valueAxis.numberFormatter = new am4core.NumberFormatter();
      valueAxis.numberFormatter.numberFormat = "# ' млн'";
      valueAxis.min = 0;

      // Create series
      function createSeries(field, name) {
        let series = self.chart1.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "revenue_" + field;
        series.dataFields.categoryX = "month_announce";
        series.dataFields.tooltipYField = field;
        series.columns.template.fill = am4core.color(obj[field + "_color"]);
        series.name = name;
        series.columns.template.tooltipText =
          `${obj[field]}: ` + "{tooltipYField}";
        series.stacked = true;
        // series.columns.template.width = am4core.percent(95);
      }

      createSeries("s", "Студия");
      createSeries("1", "1 ком");
      createSeries("2", "2 ком");
      createSeries("3", "3 ком");
      createSeries("4", "4 ком");

      this.chart1.legend = new am4charts.Legend();

      this.chart2 = am4core.create("secondGraph", am4charts.XYChart);
      this.chart2.language.locale = am4chartsLeng;

      this.chart2.dateFormatter.inputDateFormat = "yyyy-MM-dd";
      // Create category axis
      var categoryAxis2 = this.chart2.xAxes.push(new am4charts.DateAxis());
      categoryAxis2.skipEmptyPeriods = true;
      categoryAxis2.renderer.grid.template.location = 0;
      categoryAxis2.renderer.minGridDistance = 10;
      categoryAxis2.renderer.cellStartLocation = 0.2;
      categoryAxis2.renderer.cellEndLocation = 0.1;

      // Create value axis
      var valueAxis2 = this.chart2.yAxes.push(new am4charts.ValueAxis());
      valueAxis2.renderer.minLabelPosition = 0.01;

      // Create series
      function createSeries2(field) {
        let series = self.chart2.series.push(new am4charts.LineSeries());
        categoryAxis2.dataFields.category = field + "_month";
        series.dataFields.valueY = field + "_price";
        series.dataFields.dateX = "date";
        // series.dataFields.tooltipYField = field;
        // series1.name = field;
        series.strokeWidth = 3;
        series.bullets.push(new am4charts.CircleBullet());
        series.tooltipText = `${obj[field]}: ` + "{valueY}";
        series.legendSettings.valueText = "{valueY}";
        series.visible = false;
      }
      createSeries2("s", "Студия");
      createSeries2("1", "1 ком");
      createSeries2("2", "2 ком");
      createSeries2("3", "3 ком");
      createSeries2("4", "4 ком");

      // Add chart cursor
      this.chart2.cursor = new am4charts.XYCursor();
      // chart2.cursor.behavior = "zoomY";

      // Add legend
      this.chart2.legend = new am4charts.Legend();

      this.chart3 = am4core.create("thirdGraph", am4charts.XYChart);
      this.chart3.language.locale = am4chartsLeng;

      // Add percent sign to all numbers
      // chart3.numberFormatter.numberFormat = "#.#'%'";

      this.chart3.dateFormatter.inputDateFormat = "yyyy-MM-dd";
      // Add data
      const obj3 = {
        s_opacity: "#E0F1E1",
        s_color: "#66BB6A",
        "1_opacity": "#E7E7F7",
        "1_color": "#8181D7",
        "2_opacity": "#D2EEFA",
        "2_color": "#1CA9E5",
        "3_opacity": "#D1F5F4",
        "3_color": "#17CFC7",
        "4_opacity": "#E2D7F6",
        "4_color": "#6F38D3",
      };

      // Create axes
      var categoryAxis3 = this.chart3.xAxes.push(new am4charts.DateAxis());
      false;
      categoryAxis3.skipEmptyPeriods = true;
      categoryAxis3.renderer.minGridDistance = 60;

      var valueAxis3 = this.chart3.yAxes.push(new am4charts.ValueAxis());
      valueAxis3.title.fontWeight = 800;

      // Create series

      function createSeries3(field) {
        var series = self.chart3.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = field + "_all";
        series.dataFields.dateX = "date";
        series.clustered = false;
        series.strokeWidth = 0;
        series.dataFields.tooltipYField = field + "_all";
        series.columns.template.fill = am4core.color(obj3[field + "_opacity"]);
        series.tooltipText = `${obj[field]} осталось: ` + "[bold]{valueY}[/]";

        var series2 = self.chart3.series.push(new am4charts.ColumnSeries());
        series2.dataFields.valueY = field + "_sold";
        series2.dataFields.dateX = "date";
        series2.clustered = false;
        series2.strokeWidth = 0;
        series2.dataFields.tooltipYField = field + "_sold";
        series2.columns.template.fill = am4core.color(obj3[field + "_color"]);
        series2.columns.template.width = am4core.percent(50);
        series2.tooltipText = `${obj[field]} продано: ` + "[bold]{valueY}[/]";
      }
      createSeries3("s");
      createSeries3("1");
      createSeries3("2");
      createSeries3("3");
      createSeries3("4");

      this.chart3.cursor = new am4charts.XYCursor();
      this.chart3.cursor.lineX.disabled = true;
      this.chart3.cursor.lineY.disabled = true;
    });
  },
};
</script>

<style lang="scss" scoped>
input,
select {
  border: none;
  appearance: none;
  &::placeholder {
    color: #000;
  }
  &:focus {
    outline: none;
  }
}
.b-res {
  margin-top: 50px;
  position: relative;
  &__input-map {
    position: absolute;
    top: -50px;
    height: 0;
    cursor: default;
    opacity: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  &__send {
    border: none;
    background: #66bb6a;
    border-radius: 5px;
    height: 48px;
    box-shadow: 0px 13px 20px rgba(118, 196, 125, 0.411204);
    margin: 40px auto;
    width: 365px;
    display: block;
    cursor: pointer;
    color: #fff;
    font-size: 18px;
    line-height: 32px;
  }
  &__table {
    border: 1px solid #c1c8dd;
    border-radius: 5px;
    background: #f9f9ff;
    padding: 40px 25px 25px 40px;
    position: relative;
    &-box {
      display: flex;
    }
    &-btn {
      height: 48px;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 25px;
      &--double {
        background: #66bb6a;
        padding: 15px 35px;
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        color: #fff;
        width: fit-content;
        height: fit-content;
        margin-right: 15px;
      }
      &--delete {
        width: 48px;
        background: #e94c60;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &-add {
        display: flex;
        align-items: center;
        position: absolute;
        border: 2px solid #66bb6a;
        box-sizing: border-box;
        border-radius: 5px;
        bottom: calc(100% + 20px);
        right: 0;
        padding: 10px 22px;
        cursor: pointer;
        span {
          margin-left: 10px;
          font-size: 14px;
          line-height: 17px;
          font-weight: 600;
          color: #66bb6a;
        }
      }
    }
    &-select {
      background-image: url(../../assets/images/icons/arrow-select.svg);
      background-repeat: no-repeat;
      background-position: calc(100% - 10px) 50%;
    }
    &-input {
      &-wrapper {
        position: relative;
        input {
          width: 100%;
        }
      }
      &-field {
        position: absolute;
        top: 14px;
        right: 10px;
        color: #212121;
      }
      &-box {
        border: 1px solid rgba(207, 209, 215, 0.44564);
        box-sizing: border-box;
        border-radius: 4px;
        background-color: #ffffff;
        height: 48px;
        padding: 12px;
        font-weight: bold;
        font-size: 14px;
        line-height: 26px;
      }
    }
    &-row {
      display: grid;
      grid-template-columns: 110px 120px repeat(3, 90px) 130px 130px 90px 183px;
      grid-column-gap: 20px;
      align-items: center;
      & + & {
        margin-top: 25px;
      }
    }
    &-head {
      &-item {
        &:last-child &-text {
          max-width: 120px;
        }
        &-text {
          width: fit-content;
          margin-right: 5px;
        }
        &-wrapper {
          display: flex;
          align-items: center;
          font-size: 14px;
          line-height: 26px;
          transition: 0.3s;
          cursor: pointer;
          font-weight: 700;
          width: fit-content;
          &:hover {
            color: #66bb6a;
          }
          &.active {
            color: #66bb6a;
            img {
              transform: rotate(180deg);
            }
          }
        }
      }
    }
  }
  &__container {
    & + & {
      margin-top: 50px;
    }
  }
  &__apart {
    margin-top: 50px;
  }
  &__house {
    &-box {
      background: #f9f9ff;
      border: 1px solid #ebebeb;
      border-radius: 5px;
      padding: 52px 70px 22px;
      display: flex;
      align-items: center;
    }
    &-input {
      &-box {
        background: #ffffff;
        box-sizing: border-box;
        border: 1px solid #c2c9dd;
        border-radius: 2px;
        height: 52px;
        input {
          font-weight: 700;
          line-height: 26px;
          font-size: 16px;
          color: #000;
        }
      }
      &-check {
        margin-left: 65px;
        margin-bottom: 0;
        & + & {
          margin-left: 40px;
        }
      }
      &-number {
        width: 100%;
        padding: 13px;
        &-box {
          display: flex;
          width: 70px;
        }
      }
      &-date {
        padding: 13px 13px;
        width: 100%;
        font-weight: 700;
        &-box {
          padding: 0;
          width: 230px;
          display: flex;
        }
      }
    }
    &-item {
      position: relative;
      & + & {
        margin-left: 40px;
      }
      &-head {
        font-size: 14px;
        line-height: 26px;
        margin-bottom: 4px;
        position: absolute;
        left: 0;
        bottom: 100%;
        width: max-content;
      }
      .calculate-form_radio + .calculate-form_radio {
        margin-left: 10px;
      }
      .calculate-form_radio {
        width: 100px;
      }
    }
  }
}
</style>
