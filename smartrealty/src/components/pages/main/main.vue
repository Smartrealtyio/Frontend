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
          <div class="about-offers_item">
            <div class="about-offers_item_content">
              <div class="about-offers_item_img">
                <img src="../../../../public/images/offer-1.svg" />
              </div>
              <div class="about-offers_item_title">
                Продавцам
              </div>
              <div class="about-offers_item_desc">
                Продавцам. Введите данные вашей квартиры и желаемую стоимость.
                Получите прогнозируемый срок продажи.
              </div>
            </div>
          </div>
          <div class="about-offers_item">
            <div class="about-offers_item_content">
              <div class="about-offers_item_img">
                <img src="../../../../public/images/offer-3.svg" />
              </div>
              <div class="about-offers_item_title">
                Застройщикам
              </div>
              <div class="about-offers_item_desc">
                Получите расчет стоимости квартир для планируемого объекта.
                Построим зависимость прибыли в зависимости от квартирографии и
                срока продажи.
              </div>
            </div>
          </div>
          <div class="about-offers_item">
            <div class="about-offers_item_content">
              <div class="about-offers_item_img">
                <img src="../../../../public/images/offer-2.svg" />
              </div>
              <div class="about-offers_item_title">
                Агентам
              </div>
              <div class="about-offers_item_desc">
                Мы найдем вам недооцененные объекты на рынке для вас или ваших
                клиентов.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <calculate-block></calculate-block>

    <a id="team"></a>
    <section class="main_section main_section__team">
      <div class="content-wrapper">
        <div class="main_section__team_title">Команда</div>
        <div class="team-list">
          <div class="team-list_item">
            <div class="team-list_item_content">
              <div
                class="team-list_item_ava"
                style="background-image: url(../../../../public/images/team-5.jpg)"
              ></div>
              <div class="team-list_item_name">Антон Ботвин</div>
              <div class="team-list_item_position"></div>
              <div class="team-list_item_description">
                Основатель сервиса Новостройка.Rus. Выпускник Сколково. В
                прошлом руководитель направления новостройки в
                Яндекс.Недвижимость. Опыт в сфере интернет сервисов более 10
                лет.
              </div>
            </div>
          </div>

          <div class="team-list_item">
            <div class="team-list_item_content">
              <div
                class="team-list_item_ava"
                style="background-image: url(./../../../../public/images/team-7.jpg)"
              ></div>
              <div class="team-list_item_name">Татьяна Колоярова</div>
              <div class="team-list_item_position"></div>
              <div class="team-list_item_description">
                Генеральный директор Агентство Недвижимости “Хочу Квартиру”
              </div>
            </div>
          </div>

          <div class="team-list_item">
            <div class="team-list_item_content">
              <div
                class="team-list_item_ava"
                style="background-image: url(./../../../../public/images/team-1.png)"
              ></div>
              <div class="team-list_item_name">Владимир Тихомиров</div>
              <div class="team-list_item_position"></div>
              <div class="team-list_item_description">
                Серийный предприниматель в области высоких технологий. Кандидат
                технических наук, выпускник мат-меха СПбГУ. Основатель IT -
                компаний DDG, Манзони, MyWish и ряда других.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <template v-pre type="text/x-template" id="result-item-tpl">
      <a data-link="href" class="results-list_item" target="_blank">
        <div class="results-list_item_img">
          <div
            class="results-list_item_img_content"
            data-image="background"
          ></div>
        </div>

        <div class="results-list_item_desc">
          <span class="results-list_item_desc_rooms">
            <span data-full_sq="text"></span> м<sup>2</sup>,
            <span data-rooms="text"></span>-комнатная
          </span>
          <span
            class="results-list_item_desc_address"
            data-address="text"
          ></span>
          <span class="results-list_item_desc_metro" data-metro_hidden="hidden">
            <span data-metro="text"></span>,
            <span data-time_to_metro="text"></span> мин
          </span>
        </div>

        <div class="results-list_item_price">
          <span class="results-list_item_price_full">
            <span data-visible_price="text"></span> ₽
          </span>
          <span class="results-list_item_price_per">
            <span data-visible_price_per_m="text"></span> ₽ за м<sup>2</sup>
          </span>
          <div
            class="results-list_item_profit"
            data-visible_profit="text"
          ></div>
        </div>
      </a>
    </template>
  </main>
</template>

<script>
import calculateBlock from "../../calc/calcBlock";
export default {
  components: {
    calculateBlock,
  },
};
</script>

<style lang="scss" scoped></style>
