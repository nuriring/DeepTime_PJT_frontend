<template>
<div>
    <!-- <review-detail-view>

    </review-detail-view> -->
  <!-- Using modifiers -->
  <b-button v-b-toggle.collapse-2 class="m-1">결말포함리뷰!</b-button>

  <!-- Element to collapse -->
  <b-collapse id="collapse-2">
    <b-card>
      <div class="review-list">
        <div v-for="review in reviews" :key="review.pk">
          작성자: {{ review.user.username }}<br>
          <router-link :to="{ name: 'movieReview', params: { moviePk: review.movie.id, reviewPk: review.id }}">
            제목: {{ review.title }}<br>
          </router-link>
          내용: {{ review.content }}
          {{ review.pk }}

        </div>
          <router-link :to="{ name: 'reviewCreate', params: { moviePk } }">New</router-link>
      </div>
      </b-card>
  </b-collapse>

 
  </div>
</template>

<script>
// import ReviewDetailView from '@/views/ReviewDetailView.vue'

// import { mapGetters, mapActions } from 'vuex'
import { mapGetters } from 'vuex'


export default {
  name: 'ReviewList',
  // components: { CommentListForm, CommentListItem },
  // components: {ReviewDetailView},
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