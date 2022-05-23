<template>
  <div>
    <select-ott>
    </select-ott>
    <div v-for="(wavveMovie, idx) in wavveMovies" :key="idx" class="card" style="width: 18rem;">
      <img :src="`https://image.tmdb.org/t/p/w300${wavveMovie.poster_path}`" class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-text">{{ wavveMovie.title }}</p>
      </div>
    </div>
  </div>
  
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import SelectOtt from '@/components/SelectOtt.vue'
export default {
  name:"WavveView",
  components : {
    SelectOtt
  },
  computed: {
    ...mapGetters(['wavveMovies'])
  },
  methods: {
    ...mapActions(['fetchWavveMovies']),

  },

  created() {
    this.fetchWavveMovies()
  },

}
</script>

<style>

</style>