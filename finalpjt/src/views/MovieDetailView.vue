<template>
  <div>
    <p v-if="movie.overview">
      {{ movie.title }}<br>   
      {{ movie.overview }}
      {{ movie.id }}
    </p>
  

    <!-- Movie Like UI -->
    <div>
      Likeit:
      <button
        @click="likeMovie(moviePk)"
      >{{ likeCount }}</button>
    </div>

    <hr />
    <!-- Review UI -->
    <review-list
    :reviews="movie.reviews"
    :moviePk="movie.id">
    </review-list>

  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import ReviewList from '@/components/ReviewList.vue'



  export default {
    name: 'MovieDetail',
    components: { ReviewList },
    data() {
      return {
        moviePk: this.$route.params.moviePk,
      }
    },
    computed: {
      ...mapGetters(['movie',]),
      likeCount() {
        return this.movie.like_users?.length
      }
    },
    methods: {
      ...mapActions([
        'fetchMovie',
        'likeMovie',
      ])
    },
    created() {
      this.fetchMovie(this.moviePk)
    },
  }
</script>

<style></style>