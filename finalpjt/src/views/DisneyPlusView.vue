<template>
  <div>
    <select-ott>
    </select-ott>
    <div v-for="(disneyPlusMovie, idx) in disneyPlusMovies" :key="idx" class="card" style="width: 18rem;">
      <img :src="`https://image.tmdb.org/t/p/w300${disneyPlusMovie.poster_path}`" class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-text">{{ disneyPlusMovie.title }}</p>
      </div>
    </div>
  </div>
  
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import SelectOtt from '@/components/SelectOtt.vue'
export default {
  name:"DisneyPlusView",
  components : {
    SelectOtt
  },
  computed: {
    ...mapGetters(['disneyPlusMovies'])
  },
  methods: {
    ...mapActions(['fetchDisneyPlusMovies']),

  },

  created() {
    this.fetchDisneyPlusMovies()
  },
}

</script>

<style>

</style>