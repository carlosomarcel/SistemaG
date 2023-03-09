
const routes = [
  {
    path: '',
    component: () => import('src/pages/LoginPage.vue'),
    children: [
      { path: '/login', name: 'LoginPage', component: () => import('src/pages/LoginPage.vue') }
    ]
  },
  {
    path: '/admin',
    component: () => import('src/pages/HomePage.vue'),
    children: [
      { path: '/admin', name: 'Index', component: () => import('src/pages/HomePage.vue') }
    ]
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/home', name: 'home', component: () => import('src/pages/HomePage.vue') },
      { path: '/users', name: 'usersPage', component: () => import('src/pages/UsersPage.vue') },
      { path: '/systems', name: 'SystemsPage', component: () => import('src/pages/SystemsPage.vue') },
      { path: '/access', name: 'AccessPage', component: () => import('src/pages/AccessPage.vue') },
      { path: '/chart', name: 'ChartPage', component: () => import('src/components/charts/chartDemo.vue') },
      { path: '/form-user/:id?', name: 'formUser', component: () => import('src/pages/admin/Forms/FormUser.vue') },
      { path: '/form-access/:id?', name: 'formAccess', component: () => import('src/pages/admin/Forms/FormAccess.vue') },
      { path: '/form-system/:id?', name: 'FormSystem', component: () => import('src/pages/admin/Forms/FormSystem.vue') }

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
