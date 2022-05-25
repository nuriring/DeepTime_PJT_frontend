<template>
  <div>
    <v-container>
    <h1>원하시는 OTT서비스를 골라 내가 보고싶은 영화를 빠르게 찾아보세요!</h1>
    </v-container>
    <select-ott></select-ott>
    
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import SelectOtt from '@/components/SelectOtt.vue'

  export default {
    name: 'OttListView',
    components: {
      SelectOtt
    },
    computed: {
      ...mapGetters(['ottMovies'])
    },
    methods: {
      ...mapActions(['fetchOttMovies']),

    },

    created() {
      this.fetchOttMovies()
      console.log(this.ottMovies.poster_path)
    },
  }
</script>

<style>

</style>