const HOST = 'http://localhost:8000/deeptime/'

const ACCOUNTS = 'accounts/'
const ARTICLES = 'articles/'
const COMMENTS = 'comments/'
const MOVIES = 'movies/'
const REVIEWS = 'reviews/'
const OTTS = 'ott/'

export default {
  accounts: {
    login: () => HOST + ACCOUNTS + 'login/',
    logout: () => HOST + ACCOUNTS + 'logout/',
    signup: () => HOST + ACCOUNTS + 'signup/',
    // Token 으로 현재 user 판단
    currentUserInfo: () => HOST + ACCOUNTS + 'user/',
    // username으로 프로필 제공
    profile: username => HOST + ACCOUNTS + 'profile/' + username,
  },
  articles: {
    articles: () => HOST + ARTICLES,
    article: articlePk => HOST + ARTICLES + `${articlePk}/`,
    likeArticle: articlePk => HOST + ARTICLES + `${articlePk}/` + 'like/',
    comments: articlePk => HOST + ARTICLES + `${articlePk}/` + COMMENTS,
    comment: (articlePk, commentPk) =>
      HOST + ARTICLES + `${articlePk}/` + COMMENTS + `${commentPk}/`,
  },
  movies: {
    movies: () => HOST + MOVIES,
    movie: moviePk => HOST + MOVIES + `${moviePk}/`,
    likeMovie: moviePk => HOST + MOVIES + `${moviePk}/` + 'like/',
    reviews: moviePk => HOST + MOVIES + `${moviePk}/` + REVIEWS,
    review: (moviePk, reviewPk) =>
      HOST + MOVIES + `${moviePk}/` + REVIEWS + `${reviewPk}/`,
    likeReview: (moviePk, reviewPk) =>
      HOST + MOVIES + `${moviePk}/` + REVIEWS + `${reviewPk}/` + 'like/',
    
  },

  otts : {
    netflix: () => HOST + MOVIES + OTTS + 'Netflix/',
    disneyPlus: () => HOST + MOVIES + OTTS + 'Disney Plus/',
    amazon: () => HOST + MOVIES + OTTS + 'Amazon Prime Video/',
    watcha: () => HOST + MOVIES + OTTS + 'Watcha/',
    wavve: () => HOST + MOVIES + OTTS + 'wavve/',
    apple: () => HOST + MOVIES + OTTS + 'Apple TV Plus/',
  }

}
