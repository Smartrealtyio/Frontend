<template>
  <div>
    <!-- Результаты поиска выгодных предложений -->
    <div class="calculate-form_error" id="search-form_error">
      <span
        >Предложений не найдено. Пожалуйста, измените масштаб карты или
        настройки фильтра.</span
      >
    </div>
    <div class="calculate-form_map" id="results-list-block">
      <div class="results-list" v-show="searchData.length">
        <a id="results-list" style="position: relative; top: -80px;"></a>
        <div class="main_section__team_title">
          <!--<span id="visible-items-count"></span> из-->
          <span id="search-items-count">{{ searchData.length }}</span> из
          предложений <span>12</span>
        </div>
        <div class="calculate-form__sort">
          <div class="calculate-form__sort-head">Сортировать:</div>
          <div
            class="calculate-form__sort-btn"
            v-for="(item, i) in sortData"
            :key="i"
            :class="{ active: item.cat === currentCat }"
            @click="onClickSortBtn(item.cat)"
          >
            <span>{{ item.text }}</span>
            <div class="calculate-form__sort-btn-cloud" v-if="item.cloud">
              {{item.cloud}}
            </div>
          </div>
        </div>
        <div id="visible-results">
          <a
            data-link="href"
            class="results-list_item"
            target="_blank"
            v-for="(item, i) in filtredData"
            :key="i"
            :href="item.link"
          >
            <div class="results-list_item_img">
              <div
                class="results-list_item_img_content"
                data-image="background"
                :style="`background-image: url(${item.image})`"
              ></div>
            </div>

            <div class="results-list_item_desc">
              <span class="results-list_item_desc_rooms">
                <span data-full_sq="text">{{ item.full_sq }}</span>
                м<sup>2</sup>, <span data-rooms="text"></span>-комнатная
              </span>
              <span
                class="results-list_item_desc_address"
                data-address="text"
                >{{ item.address }}</span
              >
              <span
                class="results-list_item_desc_metro"
                data-metro_hidden="hidden"
              >
                <span data-metro="text">{{ item.metro }}</span
                >,
                <span data-time_to_metro="text">{{ item.time_to_metro }}</span>
                мин
              </span>
            </div>

            <div class="results-list_item_price">
              <span class="results-list_item_price_full">
                <span data-visible_price="text">{{ item.visible_price }}</span>
                ₽
              </span>
              <span class="results-list_item_price_per">
                <span data-visible_price_per_m="text">{{
                  item.visible_price_per_m
                }}</span>
                ₽ за м<sup>2</sup>
              </span>
              <div class="results-list_item_profit" data-visible_profit="text">
                {{ item.visible_profit + '%' }}
              </div>
            </div>
          </a>
        </div>
        <div class="show-more">
          <button class="show-more_btn" id="show-more-button">
            Показать ещё
          </button>
        </div>
      </div>
    </div>
    <!-- <div class="calculate-form__pagination">

    </div> -->
    <div
      class="calculate-form_loading"
      id="loading_results"
      style="display: none;"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    searchData: {
      type: Array,
    },
  },
  data() {
    return {
      currentCat: "visible_price",
      sortData: [
        {
          text: "по цене",
          cat: "visible_price",
        },
        {
          text: "по выгодности %",
          cat: "visible_ profit",
          cloud: '% выгодности предложения относительно среднерыночной стоимости'
        },
      ],
    };
  },
  computed: {
    filtredData() {
      const flats = [...this.searchData]
      return flats.sort((elem1, elem2) => {
        return +(elem1[this.currentCat].split(' ').join('')) - +(elem2[this.currentCat].split(' ').join(''))
      })
    }
  },
  methods: {
    onClickSortBtn(cat) {
      this.currentCat = cat
    }
  }
};
</script>

<style lang="scss" scoped></style>
