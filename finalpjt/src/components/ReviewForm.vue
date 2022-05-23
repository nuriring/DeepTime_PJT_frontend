<template>
  <form @submit.prevent="onSubmit" class="review-list-form">
    <label for="review-title">title: </label>
    <input type="text" id="review-title" v-model="title" required>
    <label for="review-content">content: </label>
    <input type="text" id="review-content" v-model="content" required>
    <button @click="success">Create</button>
    <router-link  :to="{ name: 'movieDetail', params: {moviePk: moviePk} }">
      back
    </router-link>
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ReviewForm',
  data() {
    return {
      title: '',
      content: '',
      moviePk: this.$route.params.moviePk,
    }
  },
  computed: {
    ...mapGetters(['movie']),
  },
  methods: {
    ...mapActions(['createReview']),
    onSubmit() {
      this.createReview({ moviePk: this.movie.id, title: this.title, content: this.content, })
      console.log(this.movie)
      this.title = ''
      this.content = ''
    },
    success() {
      alert('리뷰가 성공적으로 작성되었습니다!')
    }
  },
 //새로고침했을 때 영화 정보 사라짐..억까야 억까 새로고침하지마
}
</script>

<style>
.review-list-form {
  border: 1px solid black;
  margin: 1rem;
  padding: 1rem;
}
</style>