<template>
  <header class="header" id="header" ref="header">
    <div class="content-wrapper">
      <div class="header_logo">
        <img src="static/images/logo.svg" />
      </div>
      <nav class="header_menu">
        <ul class="header_menu_list">
          <li class="header_menu_list_item">
            <a href="#home" class="header_menu_list_item_link">Главная</a>
          </li>
          <li class="header_menu_list_item">
            <a href="#about" class="header_menu_list_item_link">О проекте</a>
          </li>
          <li class="header_menu_list_item">
            <a href="#calculate" class="header_menu_list_item_link"
              >Оценить квартиру</a
            >
          </li>
          <li class="header_menu_list_item">
            <a href="#team" class="header_menu_list_item_link">Команда</a>
          </li>
          <li class="header_menu_list_item">
            <a href="#contacts" class="header_menu_list_item_link">Контакты</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
    methods: {
        headerScroll() {
            const scrolled = window.pageYOffset || document.documentElement.scrollTop;
            const header = this.$refs.header
            if (header.classList.contains('scrolled') && (scrolled < 50)) {
                header.classList.remove('scrolled');
            } else if (!header.classList.contains('scrolled') && (scrolled > 50)) {
                header.classList.add('scrolled');
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.headerScroll)
    },
    destroyed() {
        window.removeEventListener('scroll', this.headerScroll)
    }
};
</script>

<style lang="scss" scoped></style>
