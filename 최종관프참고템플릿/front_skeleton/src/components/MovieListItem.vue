<template>
  <div>
    <vue-glide v-if="movies.length"
      class="glide__track"
      data-glide-el="track"
      ref="slider"
      type="carousel"
      :breakpoints="{3000: {perView: 7}, 1100: {perView: 5}, 600: {perView: 3}}"
    >
      <vue-glide-slide
        v-for="(movie, idx) in movies"
        :key="idx">
        <MovieDetail 
          :movie="movie"
        />
        <!-- <p>{{ movie.title }}</p> -->
      </vue-glide-slide>
    </vue-glide>
    
  </div>
</template>

<script>
import { Glide, GlideSlide } from 'vue-glide-js'

import MovieDetail from "@/components/MovieDetail"

export default {
  name: "MovieCard",
  data: function () {
    return {
      show: false,
      variants: ["light", "dark"],
      headerBgVariant: "dark",
      headerTextVariant: "light",
      bodyBgVariant: "dark",
      bodyTextVariant: "light",
      footerBgVariant: "dark",
      footerTextVariant: "dark",
    }
  },
  props: {
    movies: {
      type: Array,
    }
  },
  components: {
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
    MovieDetail,
  },
  methods: {
    movieDetail: function () {
      this.show = true
    },
    close: function () {
      this.show = false
    }
  },
}
</script>
<style>

</style>