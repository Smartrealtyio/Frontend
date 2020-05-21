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
          Наша платформа собирает данные о недвижимости из открытых источников и
          от партнеров. Сопоставив время продажи объекта, его характеристики и
          стоимость мы строим прогнозы и рекомендации
        </div>

        <div class="about-offers">
          <label
            class="about-offers_item"
            :class="{'active': activeOfferCard === i}"
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
              <div class="team-list_item_name">{{item.name}}</div>
              <div class="team-list_item_position">{{item.position}}</div>
              <img src="../../../assets/images/icons/team-icon.svg" alt="" class="team-list_item_icon">
              <div class="team-list_item_description">{{item.text}}</div>
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
      this.activeOfferCard = index
    }
  },
  data() {
    return {
      activeOfferCard: 0,
      aboutCards: [
        {
          img: "static/images/offer-1.svg",
          head: "Продавцам",
          text: "Укажите параметры квартиры и узнайте срок и стоимость продажи",
          subhead: "Рассчитать цену квартиры",
          id: 'analyze-init',
          label: 'calc-price'
        },
        {
          img: "static/images/offer-2.svg",
          head: "Застройщикам",
          text:
            "Задайте квартирографию,  участок строительства иполучите график продажи квартир в реализуемом объекте",
          subhead: "Рассчитать цену квартиры",
        },
        {
          img: "static/images/offer-3.svg",
          head: "Агентам",
          text: "Найдите выгодные предложения для вас и ваших клиентов",
          subhead: "Найти выгодные предложения",
          id: 'search-init',
          label: 'search-price'
        },
      ],
      teamData: [
        {
          img: 'static/images/team-1.png',
          name: 'Владимир Тихомиров',
          position: 'Генеральный директор и Основатель',
          text: 'Как крипто-энтузиаст и предприниматель, Владимир имеет более 11 лет опыта работы в ИТ-бизнесе, в том числе бывший менеджер по продуктам в Motorola Solutions (в течение 7 лет). Владимир является одним из основателей DDG, центра разработки программного обеспечения с 50 сотрудниками. В дополнение к своему практическому опыту, он имеет докторскую степень в области компьютерных наук, объединяя все знания и опыт. Совсем недавно он основал MyWish Platform, ведущую платформу для создания смарт контрактов, поддерживаемую TRON, сообществом EOS, NEO, Waves и Binance.'
        },
        {
          img: require('@/assets/images/team-8.png'),
          name: 'Питер Лин',
          position: 'Бывший директор R&D NEO',
          text: 'Питер - бывший директор по исследованиям и разработкам NEO Global Development (NGD) и один из первых разработчиков NEO. Он имеет 8-летний опыт разработки интернет-технологий и 6-летний опыт работы в индустрии блокчейна. В течение этого времени он активно занимался развитием сетей консорциума и публичных сетей.'
        },
        {
          img: require('@/assets/images/team-9.png'),
          name: 'Эрик Бенц',
          position: 'Генеральный директор Changelly',
          text: 'Эрик имеет более чем 10-летний опыт работы в сфере финансовых технологий. Он установил инновационные системы SaaS для некоторых из крупнейших на сегодня учреждений, связанных с платежами, идентификацией и банковской инфраструктурой. Эрик работает в блокчейне с 2012 года и участвует в ряде проектов, связанных с блокчейном и финтехом, в качестве инвестора, директора и основателя совета директоров.'
        },
      ]
    };
  },
};
</script>

<style lang="scss" scoped></style>
