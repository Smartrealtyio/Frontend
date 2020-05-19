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
          <calc-content></calc-content>

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
import calcContent from "./calcContent";
export default {
  components: {
    calcContent
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped></style>
