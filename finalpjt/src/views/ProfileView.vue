<template>
  <div class="total">
    <v-container class="container">
        <img id="id2" src="@/assets/profile.jpg" alt="">
      <h1>{{ profile.username }}</h1>
    <!-- Using modifiers -->
    <div>
      <b-button id="id1" v-b-toggle.collapse-1 class="m-1">{{ profile.username }} 님이 쓴 게시글</b-button>
      <b-collapse id="collapse-1">
        <b-card v-if="!profile.articles.length">작성한 게시글이 없어요.</b-card>
        <b-card class="text-decoration-none" v-for="article in profile.articles" :key="article.pk"><router-link class="text-decoration-none"  :to="{ name: 'article', params: { articlePk: article.id } }">
              <v-icon>mdi-account-circle</v-icon><p>{{ profile.username }}</p>
              <p>{{ article.title }}</p>
            </router-link></b-card>
      </b-collapse>
    </div>
    <!-- Using value -->
    <div>
      <b-button id="id1" v-b-toggle.collapse-2 class="m-1">{{ profile.username }} 님이 쓴 리뷰</b-button>

      <!-- Element to collapse -->
      <!-- <b-collapse id="collapse-1">
        <b-card>{{ profile.username }} 님이 쓴 게시글</b-card>
        <b-card class="text-decoration-none" v-for="article in profile.articles" :key="article.pk"><router-link class="text-decoration-none"  :to="{ name: 'article', params: { articlePk: article.id } }">
              {{ article.title }}
            </router-link></b-card>
      </b-collapse> -->
      <b-collapse id="collapse-2">
        <b-card v-if="!profile.reviews.length">작성한 리뷰가 없어요.</b-card>
        <b-card v-for="review in profile.reviews" :key="review.pk"><router-link class="text-decoration-none" :to="{ name: 'movieReview', params: { moviePk: review.movie_id, reviewPk: review.id } }">
              {{ review.content }}
        </router-link></b-card>
      </b-collapse>
    </div>

  <!--

    <h2>{{ profile.username }} 님이 쓴 게시글</h2>
    <ul>
      <li v-for="article in profile.articles" :key="article.pk">
        <router-link :to="{ name: 'article', params: { articlePk: article.id } }">
          {{ article.title }}
        </router-link>
      </li>
    </ul>

    <h2>{{ profile.username }} 님이 쓴 리뷰</h2>
    <ul>
      <li v-for="review in profile.reviews" :key="review.pk">
        <router-link :to="{ name: 'movieReview', params: { moviePk: review.movie_id, reviewPk: review.id } }">
          {{ review.content }}
        </router-link>
      </li>
    </ul> -->
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'


export default {
  name: 'ProfileView',
  computed: {
    ...mapGetters(['profile'])
  },
  methods: {
    ...mapActions(['fetchProfile'])
  },
  created() {
    const payload = { username: this.$route.params.username }
    this.fetchProfile(payload)
    console.log(payload)
  },
}
</script>

<style scoped>
#id1 {
  width: 300px;
}
#id2 {
  width: 1300px;
  height: 250px;
  margin-top: 1rem;
  opacity: 80%;
}
.container {
  background: #001D3D;
  margin-top: 5rem;
  border-radius: 15px;
}
.card-body {
  color: black;
  padding: 0.5rem 1rem;
  background: lightblue;
}
.card-body:hover {
  transform: scale(1.05);
  transition: 100ms ease-in;
}
.v-application p {
    margin-bottom: 0px;
}
.v-application a {
    color: black;
}
.container h1 {
  color: lightgrey;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
  .total{
  background: #001D3D;
  min-height: 100vh;
  color: white;
}

.container {
  margin: 0;
 
}
</style>