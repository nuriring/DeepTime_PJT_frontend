import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import MainView from '@/views/MainView.vue'

import MovieListView from '@/views/MovieListView.vue'
import MovieDetailView from '@/views/MovieDetailView.vue'
import YoutubeVideoDetailView from '@/views/YoutubeVideoDetailView.vue'
import ReviewDetailView from '@/views/ReviewDetailView.vue'
import ReviewNewView from '@/views/ReviewNewView.vue'
import ReviewEditView from '@/views/ReviewEditView.vue'

import ArticleListView from '@/views/ArticleListView.vue'
import Category1View from '@/views/Category1View.vue'
import Category2View from '@/views/Category2View.vue'
import Category3View from '@/views/Category3View.vue'
import ArticleDetailView from '@/views/ArticleDetailView.vue'
import ArticleNewView from '@/views/ArticleNewView.vue'
import ArticleEditView from '@/views/ArticleEditView.vue'

import LoginView from '@/views/LoginView.vue'
import LogoutView from '@/views/LogoutView.vue'
import SignupView from '@/views/SignupView.vue'
import ProfileView from '@/views/ProfileView.vue'
import NotFound404 from '@/views/NotFound404.vue'

import OttListView from '@/views/OttListView.vue'
import NetflixView from '@/views/NetflixView.vue'
import DisneyPlusView from '@/views/DisneyPlusView.vue'
import AmazonView from '@/views/AmazonView.vue'
import WatchaView from '@/views/WatchaView.vue'
import WavveView from '@/views/WavveView.vue'
import AppleTvView from '@/views/AppleTvView.vue'

Vue.use(VueRouter)

const routes = [
  /*
  accounts
    /login => LoginView
    /logout => LogoutView
    /signup => SignupView
    /profile/:username => ProfileView
  
  articles
    / => ArticleListView
    /articles/new => ArticleNewView
    /articles/:articlePk => ArticleDetailView
    /articles/:articlePk/edit => ArticleEditView
    /404 => NotFound404
    * => /404
  */
 // main
  {
    path:'/',
    name:'main',
    component: MainView
  },


  // user
  {
    path:'/login',
    name:'login',
    component: LoginView
  },
  {
    path:'/logout',
    name:'logout',
    component: LogoutView
  },
  {
    path:'/signup',
    name:'signup',
    component: SignupView
  },
  {
    path: '/profile/:username',  
    name: 'profile',
    component: ProfileView,
  },


  // articles
  {
    path: '/articles',  
    name: 'articles',
    component: ArticleListView
  },
  {
    path: '/articles/category1',  
    name: 'category1Articles',
    component: Category1View
  },
  {
    path: '/articles/category2',  
    name: 'category2Articles',
    component: Category2View
  },
  {
    path: '/articles/category3',  
    name: 'category3Articles',
    component: Category3View
  },
  {
    path: '/articles/new',
    name: 'articleNew',
    component: ArticleNewView
  },
  {
    path: '/articles/:articlePk',
    name: 'article',
    component: ArticleDetailView
  },
  {
    path: '/articles/:articlePk/edit',
    name: 'articleEdit',
    component: ArticleEditView
  },

  // movies
  {
    path: '/movies',
    name: 'movies',
    component: MovieListView
  },
  {
    path: '/movies/:moviePk',
    name: 'movieDetail',
    component: MovieDetailView
  },
  {
    path: '/movies/:moviePk/video',
    name: 'youtubeVideoDetail',
    component: YoutubeVideoDetailView
  },
  {
    path: '/movies/:moviePk/:reviewPk',
    name: 'movieReview',
    component: ReviewDetailView
  },
  {
    path: '/movies/:moviePk/review/new',
    name: 'reviewCreate',
    component: ReviewNewView
  },
  {
    path: '/movies/:moviePk/:reviewPk/edit',
    name: 'reviewEdit',
    component: ReviewEditView
  },
  // ott
  {
    path: '/otts',
    name: 'otts',
    component: OttListView
  },
  {
    path: '/otts/netflix',
    name: 'netflix',
    component: NetflixView
  },
  {
    path: '/otts/disneyplus',
    name: 'disneyPlus',
    component: DisneyPlusView
  },
  {
    path: '/otts/amazon',
    name: 'amazon',
    component: AmazonView
  },
  {
    path: '/otts/watcha',
    name: 'watcha',
    component: WatchaView
  },
  {
    path: '/otts/wavve',
    name: 'wavve',
    component: WavveView
  },
  {
    path: '/otts/apple',
    name: 'apple',
    component: AppleTvView
  },
  {
    path: '/404',
    name: 'NotFound404',
    component: NotFound404
  },
  {
    path: '*',
    redirect: '/404'
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

/*
Navigation Guard 설정
  (이전 페이지에서 있던 에러 메시지 삭제)

  로그인(Authentication)이 필요 없는 route 이름들 저장(/login, /signup)

  0. router 에서 이동 감지

  1. 현재 이동하고자 하는 페이지가 로그인이 필요한지 확인
  
  2. 로그인이 필요한 페이지인데 로그인이 되어있지 않다면
    로그인 페이지(/login)로 이동

  3. 로그인이 되어 있다면
    원래 이동할 곳으로 이동
  
  4. 로그인이 되어있는데 /login, /signup 페이지로 이동한다면
    메인 페이지(/)로 이동
    

*/
router.beforeEach((to, from, next) => {
  // 이전 페이지에서 발생한 에러메시지 삭제
  store.commit('SET_AUTH_ERROR', null)

  const { isLoggedIn } = store.getters

  const noAuthPages = ['login', 'signup', 'main']

  const isAuthRequired = !noAuthPages.includes(to.name)

  if (isAuthRequired && !isLoggedIn) {
    alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.')
    next({ name: 'login' })
  } else {
    next()
  }

  if (!isAuthRequired && isLoggedIn) {
    next({ name: 'movies' })
  }
})

export default router
