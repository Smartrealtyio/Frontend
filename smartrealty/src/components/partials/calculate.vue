<template>
  <div>
    <a id="calculate"></a>
    <section class="main_section main_section__calculate">
      <div class="content-wrapper">
        <!-- Выбор формы -->
        <input
          type="radio"
          checked
          name="form-type"
          value="calc-price"
          id="calc-price"
          class="novisible"
        />
        <input
          type="radio"
          name="form-type"
          value="search-price"
          id="search-price"
          class="novisible"
        />

        <div class="form-type-setter">
          <div class="form-type-setter_btn" id="analyze-init">
            <label for="calc-price">Рассчитаем стоимость<br />квартиры</label>
          </div>
          <div class="form-type-setter_btn" id="search-init">
            <label for="search-price">Найти выгодное<br />предложение</label>
          </div>
        </div>
        <!-- / Выбор формы -->

        <div class="calculate-form">
          <div class="calculate-form_map">
            <div class="calculate-form_map_label" data-search-map-title>
              Поиск будет происходит на видимом участке карты
            </div>
            <div class="calculate-form_map_label" data-analyze-map-title>
              Укажите точку на карте
            </div>
            <div class="calculate-form_map_container" id="realty-map">
              <map-block :coord="mapCoord"></map-block>
            </div>
          </div>

          <!-- Форма поиска выгодных предложений -->
          <form class="calculate-form_fields" id="search-form">
            <div class="calculate-form_map_label calculate-form_map_label_hide">укажите точку на карте</div>
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
                  <input
                    type="number"
                    name="life_sq"
                    data-validator
                    min="5"
                  />&nbsp;
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
                  <span class="calculate-form_checkbox_text"
                    >Хороший ремонт</span
                  >
                </label>
                <label class="calculate-form_checkbox">
                  <input type="checkbox" name="has_elevator" />
                  <span class="calculate-form_checkbox_mask"></span>
                  <span class="calculate-form_checkbox_text">Есть лифт</span>
                </label>
                <label class="calculate-form_checkbox">
                  <input type="checkbox" name="floor_first" />
                  <span class="calculate-form_checkbox_mask"></span>
                  <span class="calculate-form_checkbox_text"
                    >Первый жилой этаж</span
                  >
                </label>
                <label class="calculate-form_checkbox">
                  <input type="checkbox" name="floor_last" />
                  <span class="calculate-form_checkbox_mask"></span>
                  <span class="calculate-form_checkbox_text"
                    >Последний этаж</span
                  >
                </label>
              </div>
            </div>
            <div class="calculate-form_btn">
              <button type="submit" class="btn btn-submit">Найти</button>
            </div>
          </form>

          <!-- Форма расчета стоимости квартиры -->
          <form class="calculate-form_fields" id="calculate-form">
            <div class="calculate-form_map_label calculate-form_map_label_hide">укажите точку на карте</div>

            <div class="calculate-form_field">
              <div class="calculate-form_field_control">
                <div class="calculate-form_radios-group wide-group-2">
                  <label class="calculate-form_radio">
                    <input
                      checked
                      type="radio"
                      name="city_id"
                      value="0"
                      required
                    />
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
                <input
                  type="hidden"
                  name="lat"
                  id="calculate_form_lat"
                  required
                />
                <input
                  type="hidden"
                  name="lng"
                  id="calculate_form_lng"
                  required
                />
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
                    <input
                      type="radio"
                      name="is_rented"
                      checked
                      value="1"
                      required
                    />
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

          <!-- Результаты поиска выгодных предложений -->
          <div class="calculate-form_error" id="search-form_error">
            <span
              >Предложений не найдено. Пожалуйста, измените масштаб карты или
              настройки фильтра.</span
            >
          </div>

          <div
            class="calculate-form_map"
            id="results-list-block"
            style="display: none"
          >
            <div class="results-list">
              <a id="results-list" style="position: relative; top: -80px;"></a>
              <div class="main_section__team_title">
                <!--<span id="visible-items-count"></span> из-->
                Найдено <span id="search-items-count"></span> предложений
              </div>
              <div id="visible-results"></div>
              <div class="show-more">
                <button class="show-more_btn" id="show-more-button">
                  Показать ещё
                </button>
              </div>
            </div>
          </div>
          <div
            class="calculate-form_loading"
            id="loading_results"
            style="display: none;"
          ></div>
        </div>

        <div class="calculate-form_result" id="results" style="display: none;">
          <div class="calculate-form_result_item">
            <div class="calculate-form_result_item_title">
              Рекомендованная цена
            </div>
            <div
              class="calculate-form_result_item_value"
              id="result_price"
            ></div>
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
    </section>
  </div>
</template>

<script>
import mapBlock from './map'
export default {
  components: {
    mapBlock
  },
  data() {
    return {
      mapCoord: [55.76, 37.64]
    }
  },
  mounted() {
    const inputsNewHouse = document.querySelectorAll("input[name='secondary']")
    const inputsChangeCity = document.querySelectorAll('input[name="city_id"]')

    //  $('input[name="city_id"]').on('change', (e) => {
    //         switch(e.target.value) {
    //             case '0' :
    //                 myMap.setCenter([55.76, 37.64],12);
    //                 break;
    //             case '1' :
    //                 myMap.setCenter([59.93, 30.31],12);
    //                 break;
    //             default :
    //                 myMap.setCenter([55.76, 37.64],12);
    //                 break;
    //         }
    //     })

    inputsNewHouse.forEach(item => item.addEventListener('change', this.changeNewHouse))
    inputsChangeCity.forEach(item => item.addEventListener('change', this.changeCity))
  },
  methods: {
    changeNewHouse(e) {
      let blocks = document.querySelectorAll('.newhouse')
      console.log(blocks)
      if(e.target.value == 1) {
        blocks[0].classList.remove('show')
        blocks[1].classList.remove('show-flex')
        blocks.forEach(item => item.classList.add('hide'))
      } else {
        blocks[0].classList.add('show')
        blocks[1].classList.add('show-flex')
      }
    },
    changeCity(e) {
      switch(e.target.value) {
          case '0' :
              this.mapCoord = [55.76, 37.64];
              break;
          case '1' :
              this.mapCoord = [59.93, 30.31];
              break;
          default :
              this.mapCoord = [55.76, 37.64];
              break;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
