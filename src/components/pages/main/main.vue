<template>
  <main class="main">
    <a id="home"></a>
    <section class="main_section main_section__home">
      <div class="content-wrapper">
        <div class="main_section__home_title">
          Платформа для расчета и прогноза стоимости недвижимости
        </div>
        <div class="main_section__home_description">
          Используем технологии Искусственного Интеллекта для расчета стоимости
          и прогноза сроков продажи недвижимости.
        </div>
        <div class="main_section__home_button">
          <a href="#calculate" type="button" class="btn btn-submit"
            >Рассчитать</a
          >
        </div>
      </div>
    </section>
    <a id="about"></a>
    <section class="main_section main_section__about">
      <div class="content-wrapper">
        <div class="main_section_title">
          О проекте
        </div>
        <div class="main_section__about_description">
          Наша платформа собирает данные о&nbsp;недвижимости из&nbsp;открытых
          источников и от&nbsp;партнеров. Сопоставив время продажи объекта, его
          характеристики и стоимость мы&nbsp;строим прогнозы и&nbsp;рекомендации
        </div>

        <div class="about-offers">
          <label
            class="about-offers_item"
            :class="{ active: activeOfferCard === i }"
            v-for="(item, i) in aboutCards"
            :key="i"
            :id="item.id"
            :for="item.label"
            @click="setActiveCard(i)"
          >
            <div class="about-offers_item_content">
              <div class="about-offers_item_img">
                <img :src="item.img" />
              </div>
              <div class="about-offers_item_title">
                {{ item.head }}
              </div>
              <div class="about-offers_item_desc">
                {{ item.text }}
              </div>
            </div>
            <div class="about-offers_item_box">
              {{ item.subhead }}
            </div>
          </label>
        </div>
      </div>
    </section>

    <calculate-block></calculate-block>

    <a id="team"></a>
    <section class="main_section main_section__team">
      <div class="content-wrapper">
        <div class="main_section__team_title">Команда</div>
        <div class="team-list">
          <div class="team-list_item" v-for="(item, i) in teamData" :key="i">
            <div class="team-list_item_content">
              <div
                class="team-list_item_ava"
                :style="`background-image: url(${item.img})`"
              ></div>
              <div class="team-list_item_name">{{ item.name }}</div>
              <div class="team-list_item_position">{{ item.position }}</div>
              <img
                :src="require('@/assets/images/icons/team-icon.svg')"
                alt=""
                class="team-list_item_icon"
              />
              <div class="team-list_item_description">{{ item.text }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import calculateBlock from "../../calc/calcBlock";
export default {
  components: {
    calculateBlock,
  },
  methods: {
    setActiveCard(index) {
      this.activeOfferCard = index;
    },
  },
  data() {
    return {
      activeOfferCard: 0,
      aboutCards: [
        {
          img: require("@/assets/images/offer-1.svg"),
          head: "Продавцам",
          text: "Укажите параметры квартиры и узнайте срок и стоимость продажи",
          subhead: "Рассчитать цену квартиры",
          id: "analyze-init",
          label: "calc-price",
        },
        {
          img: require("@/assets/images/offer-2.svg"),
          head: "Застройщикам",
          text:
            "Задайте квартирографию,  участок строительства иполучите график продажи квартир в реализуемом объекте",
          subhead: "Рассчитать цену квартиры",
          id: "build-init",
          label: "for-build",
        },
        {
          img: require("@/assets/images/offer-3.svg"),
          head: "Агентам",
          text: "Найдите выгодные предложения для вас и ваших клиентов",
          subhead: "Найти выгодные предложения",
          id: "search-init",
          label: "search-price",
        },
      ],
      teamData: [
        {
          img: require("@/assets/images/team-5.jpg"),
          name: "Антон Ботвин",
          position: "Основатель сервиса Новостройка.Rus.",
          text:
            "Выпускник Сколково. В прошлом руководитель направления новостройки в Яндекс.Недвижимость. Опыт в сфере интернет сервисов более 10 лет.",
        },
        {
          img: require("@/assets/images/team-7.jpg"),
          name: "Татьяна Колоярова",
          position:
            "Генеральный директор Агентство Недвижимости  “Хочу Квартиру”",
          text:
            "Эксперт управления и инвестирования в области недвижимости бизнес и премиум класса.",
        },
        {
          img: require("@/assets/images/team-1.png"),
          name: "Владимир Тихомиров",
          position: "Серийный предприниматель в области высоких технологий.",
          text:
            "Кандидат технических наук, выпускник мат-меха СПбГУ. Основатель IT - компаний DDG, Манзони, MyWish и ряда других.",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
