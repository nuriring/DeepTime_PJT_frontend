<template>
  <div>
    <h2>MovieList</h2>
    <br>
    <p>Swipe to see more</p>
    <!-- 로그인 했으면 조건 걸어주기 -->
    <div class="m-5">
      <vue-glide v-if="movies.length">
        <vue-glide-slide v-for="(movie, idx) in movies" :key="idx">
          <div class="px-4 py-5" @click="toDetail(movie)">
            <b-card class="text-dark font-weight-bold" :title="movie.title" :img-src="getImgUrl(movie.poster_path)" img-alt="Image" img-top>
              <b-card-text id="overview" class="text-dark">
                <!-- {{ movie.overview }} -->
              </b-card-text>
              <template #footer>
                <small class="text-muted">{{ movie.genre_ids.name }}</small>
              </template>
            </b-card>
          </div>
          <!-- <img :src="getImgUrl(movie.poster_path)" alt="" class="mb-5">
          <h2>{{ movie.title }}</h2> -->
        </vue-glide-slide>
      </vue-glide>
    </div>
    
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