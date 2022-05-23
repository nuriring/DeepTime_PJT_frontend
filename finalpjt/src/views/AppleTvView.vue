<template>
  <div>
    <select-ott>
    </select-ott>
    <div v-for="(appleMovie, idx) in appleMovies" :key="idx" class="card" style="width: 18rem;">
      <img :src="`https://image.tmdb.org/t/p/w300${appleMovie.poster_path}`" class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-text">{{ appleMovie.title }}</p>
      </div>
    </div>
  </div>
  
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SelectOtt from '@/components/SelectOtt.vue'
export default {
  name:"AppleTvView",
  components : {
    SelectOtt
  },
  computed: {
    ...mapGetters(['appleMovies'])
  },
  methods: {
    ...mapActions(['fetchAppleMovies']),

  },

  created() {
    this.fetchAppleMovies()
  },
}
</script>

<style>

</style>