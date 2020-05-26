<template>
  <div class="calculate-form_field">
    <div class="calculate-form_field_control">
      <div class="calculate-form_radios-group wide-group-2">
        <label
          class="calculate-form_radio"
          v-for="(item, i) in cities"
          :key="i"
        >
          <input
            type="radio"
            name="city_id"
            :value="i"
            required
            :checked="i == currentCity"
            @click="changeActiveCity(i)"
          />
          <span class="calculate-form_radio_mask"></span>
          <span
            :class="[
              'calculate-form_radio_text',
              'icon',
              `icon-${item.cat}`,
              {'icon-msk-active': item.cat == 'msk' && i  == currentCity},
              {'icon-spb-active': item.cat == 'spb' && i  == currentCity},
            ]"
            >{{ item.text }}</span
          >
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentCity: {
      type: Number,
    },
  },
  data() {
    return {
      cities: [
        {
          text: "Москва",
          cat: "msk",
        },
        {
          text: "Санкт-Петербург",
          cat: "spb",
        },
      ],
    };
  },
  methods: {
    changeActiveCity(i) {
      this.$emit("change-city", i);
    },
  },
};
</script>
