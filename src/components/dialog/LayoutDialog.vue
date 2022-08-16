<template>
  <v-dialog>
    <v-card>
      <v-card-title>
        TITLE
      </v-card-title>
    </v-card>
    <v-card-text>
      <slot name="default">
      </slot>
    </v-card-text>
    <v-card-actions>
      <slot name="action">
      </slot>
    </v-card-actions>
  </v-dialog>
</template>

<script>
export default {
  name: 'LayoutDialog',
};
</script>

<style scoped>

</style>
