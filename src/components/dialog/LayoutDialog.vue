<template>
  <div>
    <v-dialog
      v-model="showFlag"
      :max-width="maxWidth"
      :persistent="persistent"
      :fullscreen="fullscreen"
      scrollable>
      <v-card
        :tile="!fullscreen">
        <v-card-title
          :style="{
            backgroundColor: 'var(--v-primary-base)',
            color: '#ffffff',
          }"
          color="primary"
          flat
          tile>
          <v-btn
            @click="$emit('update:show', false)"
            dark
            class="mr-4"
            icon>
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
          <span>
              {{ title }}
            </span>
        </v-card-title>
        <v-card-text>
          <slot>
          </slot>
        </v-card-text>
      </v-card>
    </v-dialog>
    <slot name="extension"></slot>
  </div>
</template>

<script>
export default {
  name: 'LayoutDialog',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: 'TITLE',
    },
    persistent: {
      type: Boolean,
      default: false,
    },
    maxWidth: {
      type: Number,
      default: 800,
    },
  },
  computed: {
    showFlag: {
      get() {
        return this.show;
      },
      set(value) {
        this.$emit('update:show', value);
      },
    },
    fullscreen() {
      return this.$vuetify.breakpoint.xs;
    },
  },
};
</script>

<style scoped>

</style>
