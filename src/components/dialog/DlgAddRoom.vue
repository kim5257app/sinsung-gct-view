<template>
  <layout-dialog
    title="방 생성"
    :show.sync="showFlag"
    @click:close="$router.goBack()"
    :persistent="loading"
    :max-width="540">
    <v-form
      @submit.prevent="addRoom">
      <v-text-field
        v-model="form.name"
        label="방 이름">
      </v-text-field>
      <v-switch
        v-model="form.public"
        label="회원 간 대화 공개">
      </v-switch>
      <v-switch
        v-model="form.write"
        label="회원 대화 쓰기 가능">
      </v-switch>
      <v-btn
        :loading="loading"
        type="submit"
        color="primary"
        block>
        확인
      </v-btn>
    </v-form>
  </layout-dialog>
</template>

<script>
import LayoutDialog from '@/components/dialog/LayoutDialog.vue';
import dialogLayoutSupport from '@/components/mixins/dialog_layout_support';
import alertSupport from '@/components/mixins/alert_support';

export default {
  name: 'DlgAddRoom',
  mixins: [
    dialogLayoutSupport,
    alertSupport,
  ],
  components: {
    LayoutDialog,
  },
  data: () => ({
    loading: false,
    form: {
      name: '',
      public: false,
      write: false,
    },
  }),
  methods: {
    addRoom() {
      this.loading = true;

      this.$socket.emit('rooms.add', this.form, (resp) => {
        if (resp.result === 'success') {
          // Do nothing.
        } else {
          this.showAlert({
            color: 'error',
            message: resp.message,
          });
        }

        this.loading = false;
        this.$router.goBack();
      });
    },
  },
};
</script>

<style scoped>

</style>
