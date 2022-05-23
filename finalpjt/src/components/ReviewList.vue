<template>
<div>
  <!-- Using modifiers -->
  <b-button v-b-toggle.collapse-2 class="m-1">결말포함리뷰!</b-button>

  <!-- Element to collapse -->
  <b-collapse id="collapse-2">
    <b-card>
      <div class="review-list">
        <div v-for="review in reviews" :key="review.pk">
          {{ review }}
          {{ moviePk }}
        </div>
          <router-link :to="{ name: 'reviewCreate', params: { moviePk } }">New</router-link>
      </div>
      </b-card>
  </b-collapse>

 
  </div>
</template>

<script>
// import ReviewListItem from '@/components/ReviewListItem.vue'
// import CommentListForm from '@/components/CommentListForm.vue'
// import { mapGetters, mapActions } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  name: 'ReviewList',
  // components: { CommentListForm, CommentListItem },
  // components: {ReviewListItem},
  props: { reviews: Array,
           moviePk: Number },

  computed: {
    ...mapGetters(['movie']),
    },

  }

</script>

<style>
.review-list {
  border: 1px solid blue;
}
</style>