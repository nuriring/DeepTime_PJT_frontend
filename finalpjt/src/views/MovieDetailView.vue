<template>
  <div>
    <p v-if="movie.overview">
      {{ movie.title }}<br>   
      {{ movie.overview }}
    </p>
  

    <!-- Movie Like UI -->
    <div>
      Likeit:
      <button
        @click="likeMovie(moviePk)"
      >{{ likeCount }}</button>
    </div>

    <hr />
    <!-- Comment UI -->
    <!-- <comment-list :comments="article.comments"></comment-list> -->

  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  // import CommentList from '@/components/CommentList.vue'



  export default {
    name: 'MovieDetail',
    // components: { CommentList },
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