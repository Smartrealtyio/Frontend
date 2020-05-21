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

        <!-- / Выбор формы -->

        <calc-content></calc-content>

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
    calcContent,
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
