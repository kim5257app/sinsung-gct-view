<template>
  <div>
    In {{ roomNo }} Room.
  </div>
</template>

<script>
export default {
  name: 'RoomView',
  props: {
    roomNo: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>
