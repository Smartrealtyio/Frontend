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
        <input
          type="radio"
          name="form-type"
          value="for-build"
          id="for-build"
          class="novisible"
        />

        <calc-content></calc-content>

      </div>
    </section>
  </div>
</template>

<script>
import calcContent from "./calcContent";
export default {
  components: {
    calcContent,
  }
};
</script>

<style lang="scss" scoped></style>
