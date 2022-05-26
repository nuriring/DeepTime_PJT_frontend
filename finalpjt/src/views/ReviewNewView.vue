<template>
  <div class="total" >
    <v-container class="wrapper">

    <b-card class="content reviewform">

        <review-form :review="review" action="create"></review-form>

    </b-card>
    </v-container>

  </div>
</template>

<script>
  import ReviewForm from '@/components/ReviewForm.vue'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'ReviewNewView',
    components: { ReviewForm },
    data() {
      return {
        review: {
          pk: null,
          title: '',
          content: '',
        }
      }
    },
    computed: {
    ...mapGetters(['movie']),
    },
    methods: {
      ...mapActions(['createReview']),
    onSubmit() {
      this.createReview({ moviePk: this.movie.pk, title: this.title, content: this.content, })
      this.title = ''
      this.content = ''
    }
  }
  }
</script>

<style scoped>
    .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;

  }

  
  .content {
    font-size: 2rem; 
    padding: 3rem;
    border-radius: 1rem;
    
  }
.review { 
  
  width: 80%;


}
.reviewform{
  background-color: #001D3D;
  width: 50%;
  height: 700px;
}
.total{
  background: #001D3D;
  min-height: 100vh;
  color: white;
}
div {
  font-family: 'Gowun Batang', serif;
}
.card {
  border: none;
}
</style>