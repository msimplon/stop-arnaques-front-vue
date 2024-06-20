import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth-store';
import { storeToRefs } from 'pinia';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'articles-home',
      component: () => import('../views/HomeArticles.vue'),
      children: [
        {
          path: 'infoCards', component: () => import('../components/articles/InfoCards.vue'),
          name: "infoCards"
        }],
    }, {
      path: '/admin/articles',
      name: 'articles-edit',
      component: () => import('../components/articles/Edit.vue'),
      meta: {
        requiresAuth: true,
        permission: 'admin'
      }
    },
    {
      path: '/recours/articles',
      name: 'dgccrf',
      beforeEnter() { location.href = 'https://www.economie.gouv.fr/dgccrf' }

    },
    {
      path: '/actualité/articles',
      name: 'actualité',
      component: () => import('../views/Actualité.vue'),
      meta: {
        requiresAuth: true,
        permission: 'admin'
      }

    },

    {
      path: '/admin/article/create',
      name: 'articles-create',
      component: () => import('../components/articles/Create.vue'),
      meta: {
        requiresAuth: true,
        permission: 'admin'
      }
    }, {
      path: '/articles/:id/detail',
      name: 'article-detail',
      component: () => import('../components/articles/Detail.vue')
    }, {
      path: '/admin/article/:id/update',
      name: 'article-update',
      component: () => import('../components/articles/Update.vue'),
      meta: {
        requiresAuth: true,
        permission: 'admin'
      }
    },
    {
      path: '/article/signal',
      name: 'article-signal-arnaque',
      component: () => import('../views/SignalArnaque.vue')
    },

    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/Contact.vue')
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: () => import('../views/SignIn.vue')
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: () => import('../views/SignUp.vue')
    },
    {
      path: '/cgu',
      name: 'cgu',
      component: () => import('../views/cgu.vue')
    },
    {
      path: '/401',
      name: '/unauthorized',
      component: () => import('../views/errors/ErrorUnauthorized.vue')
    }

  ]

})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  const { isLoggedIn, userRole } = storeToRefs(authStore);
  console.log("Logged in: ", isLoggedIn.value, " ROLE: ", userRole.value);
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return '/signIn'
  }
  if (to.meta.permission == 'admin' && userRole.value == "USER") {
    return '/error/401'
  }
})

export default router;
