import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { needAuth: true, onlyNonAuth: false },
  },
  {
    path: '/signin',
    name: 'signin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SignInView.vue'),
    meta: { needAuth: false, onlyNonAuth: true },
  },
];

let isFirst = true;
let isBackward = false;
let isFromGoBack = false;

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior() {
  },
});

window.addEventListener('popstate', () => {
  isBackward = true;
});

router.beforeEach(async (to, from, next) => {
  try {
    const connected = store.getters['auth/connected'];
    const verified = store.getters['auth/verified'];

    console.log('to:', to, 'from:', from, connected, verified, store.getters['router/initPath']);

    if (isFirst) {
      // 최초 페이지 이동
      store.commit('router/route', to);

      next();
      isFirst = false;
    } else if (connected) {
      let didCloseDialog;

      if (isBackward && !isFromGoBack) {
        // 대화상자 표시 중일 경우 대화상자 닫기 동작
        didCloseDialog = (await store.dispatch('router/popDialog') != null);
      } else {
        didCloseDialog = isFromGoBack;
      }

      console.log(
        '!!!!',
        verified,
        didCloseDialog,
        !verified && to.meta.needAuth,
        verified && to.meta.onlyNonAuth,
      );

      // 닫은 대화상자가 없을 경우 페이지 이동 처리
      if (!didCloseDialog) {
        if (!verified && to.meta.needAuth) {
          next(false);
        } else if (verified && to.meta.onlyNonAuth) {
          next(false);
        } else {
          await store.dispatch('router/cleanupDialogStack');
          next();
        }
      } else {
        next(false);
      }
    } else {
      // 서버와 미 연결 상태일경우 이동 금지
      next(false);
    }

    isBackward = false;
    isFromGoBack = false;
  } catch (error) {
    console.log('Error:', error);
  }
});

router.afterEach(async (to) => {
  store.commit('router/route', to);

  const connected = store.getters['auth/connected'];

  if (connected) {
    await router.checkAuth();
  }
});

router.checkAuth = async () => {
  const to = router.currentRoute;

  const connected = store.getters['auth/connected'];
  const initialized = store.getters['auth/initialized'];
  const verified = store.getters['auth/verified'];

  console.log('checkAuth:', connected, initialized, verified);

  if (connected && initialized) {
    if (!verified && to.meta.needAuth) {
      store.commit('router/initPath', to);

      await router.push('/signin');
    } else if (verified && to.meta.onlyNonAuth) {
      await router.push(store.getters['router/initPath']);
    }
  }
};

router.goBack = () => {
  const dialogEmpty = (store.getters['router/dlgStack'].length === 0);

  console.log('goBack:', dialogEmpty);

  if (!dialogEmpty) {
    // 대화상자 표시 중일 경우 대화상자 닫기 동작
    store.dispatch('router/popDialog').then((value) => {
      isFromGoBack = (value != null);

      if (!isFromGoBack) {
        router.back();
      } else {
        isFromGoBack = false;
      }
    });
  } else {
    router.back();
  }

  return dialogEmpty;
};

// 전역 참조 허용 함수
(() => {
  window.$router = {
    goBack: router.goBack,
  };
})();

export default router;
