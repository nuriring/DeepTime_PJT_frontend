<template>
  <div>
      <vue-glide-slide
        v-for="(movie, idx) in movies"
        :key="idx">
        <MovieDetail 
          :movie="movie"
        />
        <!-- <p>{{ movie.title }}</p> -->
      </vue-glide-slide>
  </div>
</template>

<script>
import { Glide, GlideSlide } from 'vue-glide-js'
import MovieDetail from "@/components/MovieDetail"
export default {
  name: "MovieListItem",
  props: {
    movies: {
      type: Array,
    }
  },
  components: {
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
    MovieDetail,
  }

}
</script>
<style>

</style>