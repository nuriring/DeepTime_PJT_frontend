<template>
  <div>
    <select-ott>
    </select-ott>
    <div v-for="(netflixMovie, idx) in netflixMovies" :key="idx" class="card" style="width: 18rem;">
      <img :src="`https://image.tmdb.org/t/p/w300${netflixMovie.poster_path}`" class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-text">{{ netflixMovie.title }}</p>
      </div>
    </div>
  </div>
  
</template>


<script>
import { mapActions, mapGetters } from 'vuex'
import SelectOtt from '@/components/SelectOtt.vue'
export default {
  name:'NetflixView',
  components: {
    SelectOtt
  },
  computed: {
    ...mapGetters(['netflixMovies'])
  },
  methods: {
    ...mapActions(['fetchNetflixMovies']),

  },

  created() {
    this.fetchNetflixMovies()
  },
}

</script>

<style>

</style>