<template>
  <div class="total">
    <v-container class="container">
      <v-card
    max-width="375"
    class="mx-auto"
  >
    <v-img
      src="@/assets/profile.png"
      height="300px"
      dark
    >
      <v-row class="fill-height">
        <v-card-title>
          <v-btn
            dark
            icon
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            dark
            icon
            class="mr-4"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

          <v-btn
            dark
            icon
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-card-title>

        <v-spacer></v-spacer>

        <v-card-title class="white--text pl-12 pt-12">
          <div class="text-h4 pl-12 pt-12">
            Ali Conners
          </div>
        </v-card-title>
      </v-row>
    </v-img>

    <v-list two-line>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-phone
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>    <div>
      <b-button id="id1" v-b-toggle.collapse-1 class="m-1">{{ profile.username }} 님이 쓴 게시글</b-button>
      <b-collapse id="collapse-1">
        <b-card v-if="!profile.articles.length">작성한 게시글이 없어요.</b-card>
        <b-card id="id3" class="text-decoration-none" v-for="article in profile.articles" :key="article.pk"><router-link class="text-decoration-none"  :to="{ name: 'article', params: { articlePk: article.id } }">
              <v-icon>mdi-account-circle</v-icon><p>{{ profile.username }}</p>
              <p>{{ article.title }}</p>
            </router-link></b-card>
      </b-collapse>
    </div></v-list-item-title>
          <v-list-item-subtitle>Mobile</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon>mdi-message-text</v-icon>
        </v-list-item-icon>
      </v-list-item>

      <v-list-item>
        <v-list-item-action></v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>(323) 555-6789</v-list-item-title>
          <v-list-item-subtitle>Work</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon>mdi-message-text</v-icon>
        </v-list-item-icon>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-email
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>aliconnors@example.com</v-list-item-title>
          <v-list-item-subtitle>Personal</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-action></v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>ali_connors@example.com</v-list-item-title>
          <v-list-item-subtitle>Work</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-map-marker
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>1400 Main Street</v-list-item-title>
          <v-list-item-subtitle>Orlando, FL 79938</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
        <b-card
    title="Card Title"
    img-src=@/assets/profile.png
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-text>
      Some quick example text to build on the card title and make up the bulk of the card's content.
    </b-card-text>

    <b-button href="#" variant="primary">Go somewhere</b-button>
  </b-card>
        <img id="id2" src="@/assets/profile.png"  alt="">
      <h1>{{ profile.username }}</h1>
    <!-- Using modifiers -->
    <div>
      <b-button id="id1" v-b-toggle.collapse-1 class="m-1">{{ profile.username }} 님이 쓴 게시글</b-button>
      <b-collapse id="collapse-1">
        <b-card v-if="!profile.articles.length">작성한 게시글이 없어요.</b-card>
        <b-card id="id3" class="text-decoration-none" v-for="article in profile.articles" :key="article.pk"><router-link class="text-decoration-none"  :to="{ name: 'article', params: { articlePk: article.id } }">
              <v-icon>mdi-account-circle</v-icon><p>{{ profile.username }}</p>
              <p>{{ article.title }}</p>
            </router-link></b-card>
      </b-collapse>
    </div>
    <!-- Using value -->
    <div>
      <b-button id="id1" v-b-toggle.collapse-2 class="m-1">{{ profile.username }} 님이 쓴 리뷰</b-button>

      <b-collapse id="collapse-2">
        <b-card v-if="!profile.reviews.length">작성한 리뷰가 없어요.</b-card>
        <b-card v-for="review in profile.reviews" :key="review.pk"><router-link class="text-decoration-none" :to="{ name: 'movieReview', params: { moviePk: review.movie_id, reviewPk: review.id } }">
              {{ review.content }}
        </router-link></b-card>
      </b-collapse>
    </div>



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
#id3:hover {
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