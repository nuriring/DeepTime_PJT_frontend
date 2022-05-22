<template>
  <div>
    <li>
      {{ movie.title }}
    </li>
  </div>
</template>

<script>
 import { mapActions, mapGetters } from 'vuex'
 export default {

    name: 'PopularMovieList',

    computed: {
      ...mapGetters(['movies'])
    },
    methods: {
      ...mapActions(['fetchMovies'])
    },
    created() {
      this.fetchMovies()
    },
  }

</script>


<style>

</style>