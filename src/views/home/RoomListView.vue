<template>
  <v-layout
    class="flex-column">
    <div
      v-if="roomListLoading"
      class="d-flex pa-4 align-center">
      <v-spacer>
      </v-spacer>
      <v-progress-circular
        color="primary"
        indeterminate>
      </v-progress-circular>
      <v-subheader>
        방 정보를 가져오는 중 입니다.
      </v-subheader>
      <v-spacer>
      </v-spacer>
    </div>
    <v-list
      v-else
      width="100%">
      <v-list-item
        v-for="(item, idx) in roomList"
        :key="`room-list-${idx}`"
        :to="`/room/${item.no}`">
        <v-list-item>
          <v-list-item-avatar
            rounded>
            <v-img :src="defaultRoomIcon">
            </v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ roomLastMessage(item) }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text>
              {{ roomLastMessageTime(item) }}
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
    <v-fab-transition>
      <v-btn
        @click="showAddRoom = true"
        color="primary"
        fixed
        bottom
        right
        fab>
        <v-icon>
          mdi-pencil
        </v-icon>
      </v-btn>
    </v-fab-transition>
    <dlg-add-room
      :show.sync="showAddRoom">
    </dlg-add-room>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import time from '@/util/time';
import dialogSupport, { makeShowFlag } from '@/components/mixins/dialog_support';
import DlgAddRoom from '@/components/dialog/DlgAddRoom.vue';

import defaultRoomIcon from '@/assets/default_room_icon.png';

export default {
  name: 'RoomListView',
  components: {
    DlgAddRoom,
  },
  mixins: [
    dialogSupport,
  ],
  data: () => ({
    defaultRoomIcon,
    time,
  }),
  computed: {
    ...mapGetters({
      roomListLoading: 'room/loading',
      roomList: 'room/roomList',
    }),
    showAddRoom: makeShowFlag('add_room'),
  },
  methods: {
    roomLastMessage(item) {
      let message = '';

      switch (item.msgType) {
        case 'text':
          message = item.contents.text;
          break;
        case 'img':
          message = '이미지';
          break;
        default:
          message = '';
      }

      return message;
    },
    roomLastMessageTime(item) {
      let msgTime = '';

      if (item.msgCreated != null) {
        const now = this.time.makeLocalDate();
        msgTime = this.time.makeLocalDate(item.msgCreated);

        if (now === msgTime) {
          msgTime = this.time.makeLocalTime(item.msgCreated);
        }
      }

      return msgTime;
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  text-align: start;
}
</style>
