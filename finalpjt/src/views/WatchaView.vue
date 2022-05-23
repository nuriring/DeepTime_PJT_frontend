<template>
  <div>
    <select-ott>
    </select-ott>
    <div v-for="(watchaMovie, idx) in watchaMovies" :key="idx" class="card" style="width: 18rem;">
      <img :src="`https://image.tmdb.org/t/p/w300${watchaMovie.poster_path}`" class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-text">{{ watchaMovie.title }}</p>
      </div>
    </div>
  </div>
  
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SelectOtt from '@/components/SelectOtt.vue'
export default {
  name:"WatchaView",
  components : {
    SelectOtt
  },
  computed: {
    ...mapGetters(['watchaMovies'])
  },
  methods: {
    ...mapActions(['fetchWatchaMovies']),

  },

  created() {
    this.fetchWatchaMovies()
  },
}
</script>

<style>

</style>