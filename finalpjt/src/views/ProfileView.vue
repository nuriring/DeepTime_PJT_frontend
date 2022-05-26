<template>
  <div class="total">
    <v-container class="container d-flex justify-content-center">
      <v-card
    max-width="800"
    height ="550"
    class="mx-auto"
  >
    <v-img
      src="@/assets/profile.png"
      height="300px"
      dark
      class ="profile-img"
    >
      <v-row class="fill-height">
      
        <v-spacer></v-spacer>

        <v-card-title class="white--text pl-12 pt-12">
          <div class="text-h4 pl-12 pt-12 fw-bold">
            {{ profile.username }}'s Profile
          </div>
        </v-card-title>
      </v-row>
    </v-img>

    <v-list two-line>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-pencil
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            <div>
                <b-button id="id1" v-b-toggle.collapse-1 class="m-1">{{ profile.username }} 님이 쓴 게시글<v-icon>mdi-chevron-double-down</v-icon></b-button>
                <b-collapse id="collapse-1">
                  <b-card v-if="!profile.articles.length">작성한 게시글이 없어요.</b-card>
                  <b-card id="id3" class="text-decoration-none" v-for="article in profile.articles" :key="article.pk"><router-link class="text-decoration-none"  :to="{ name: 'article', params: { articlePk: article.id } }">
                        <p>{{ profile.username }}</p>
                        <p>{{ article.title }}</p>
                      </router-link></b-card>
                </b-collapse>
            </div>
       </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-message-text
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <div>
            <b-button id="id1" v-b-toggle.collapse-2 class="m-1">{{ profile.username }} 님이 쓴 리뷰 <v-icon>mdi-chevron-double-down</v-icon></b-button>

              <b-collapse id="collapse-2">
                  <b-card v-if="!profile.reviews.length">작성한 리뷰가 없어요.</b-card>
                  <b-card id="id3" v-for="review in profile.reviews" :key="review.pk"><router-link class="text-decoration-none" :to="{ name: 'movieReview', params: { moviePk: review.movie_id, reviewPk: review.id } }">
                      {{ review.content }}
                    </router-link></b-card>
            </b-collapse>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider inset></v-divider>

    




  

    </v-card>

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
  color: #001D3D;
  width: 200px;
  background: none;
  border: none;
  text-align: start;
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
#id1:hover {
  transform: scale(1.05);
  transition: 100ms ease-in;
}
#id1:hover {
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
  margin-top: 100px;
  margin-left: 270px;
 
}
#id3:hover {
  transform: scale(1.05);
  transition: 100ms ease-in;
}
</style>