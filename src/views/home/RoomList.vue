<template>
  <v-layout>
    <v-list
      width="100%">
      <v-list-item>
        <v-list-item>
          <v-list-item-avatar
            rounded>
            <v-img :src="defaultRoomIcon">
            </v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              신규 방
            </v-list-item-title>
            <v-list-item-subtitle>
              네 알겠습니다!!
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text>
              17:55
            </v-list-item-action-text>
            <v-chip
              :color="'#C00000'"
              small
              dark>
              5
            </v-chip>
          </v-list-item-action>
        </v-list-item>
      </v-list-item>
    </v-list>
  </v-layout>
</template>

<script>
import defaultRoomIcon from '@/assets/default_room_icon.png';

export default {
  name: 'RoomList',
  data: () => ({
    defaultRoomIcon,
  }),
};
</script>

<style lang="scss" scoped>
.layout {
  text-align: start;
}
</style>
