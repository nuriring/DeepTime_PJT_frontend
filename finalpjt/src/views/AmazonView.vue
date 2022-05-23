<template>
  <div>
    <select-ott>
    </select-ott>
    <div v-for="(amazonMovie, idx) in amazonMovies" :key="idx" class="card" style="width: 18rem;">
      <img :src="`https://image.tmdb.org/t/p/w300${amazonMovie.poster_path}`" class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-text">{{ amazonMovie.title }}</p>
      </div>
    </div>
  </div>
  
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SelectOtt from '@/components/SelectOtt.vue'
export default {
  name:"AmazonView",
  components : {
    SelectOtt
  },
  computed: {
    ...mapGetters(['amazonMovies'])
  },
  methods: {
    ...mapActions(['fetchAmazonMovies']),

  },

  created() {
    this.fetchAmazonMovies()
  },
  
}
</script>

<style>

</style>