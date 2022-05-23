<template>
  <div>
    <h1>New Review</h1>
    <review-form :review="review" action="create"></review-form>
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

<style></style>