<template>
  <div class="d-flex justify-content-center my-5">
      <b-card class="article-card">
        <b-card-text>
          <h3 class="fw-bold float-left">{{article.title}}</h3>

          <h5 class="float-right"><v-icon>mdi-account-circle</v-icon>{{article.user.username }}</h5>

        </b-card-text>
        <br>
        <hr>
        <b-card-text class="text fs-5">
          {{ article.content }}
        </b-card-text>
        <div class="d-flex">
          <div class="d-flex ">
            <v-icon color=red small>mdi-heart</v-icon>
            <div class="body-1 ms-2">{{ article.like_users.length }}개</div>  
            </div> 
          <div class="d-flex ms-3">
            <v-icon color=secondary small>mdi-comment</v-icon>
            <div class="body-1 ms-2">{{ article.comments.length }}개</div>  
          </div> 
        </div>
        
        <hr>
        <button @click="likeArticle(articlePk)">
          <p class="subheading font-weight-bold red--text text--lighten-1 m-0">
            좋아요
          </p>

        </button>
        <hr>

        <comment-list :comments="article.comments"></comment-list> 
      </b-card>


    <!-- <h1>{{ article.title }}</h1>

    <p>
      {{ article.content }}
    </p>

    <div v-if="isAuthor">
      <router-link :to="{ name: 'articleEdit', params: { articlePk } }">
        <button>Edit</button>
      </router-link>
      |
      <button @click="deleteArticle(articlePk)">Delete</button>
    </div>

    <div>
      Likeit:
      <button
        @click="likeArticle(articlePk)"
      >{{ likeCount }}</button>
    </div>

    <hr />

    <comment-list :comments="article.comments"></comment-list> -->
    

  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import CommentList from '@/components/CommentList.vue'



  export default {
    name: 'ArticleDetail',
    components: { CommentList },
    data() {
      return {
        articlePk: this.$route.params.articlePk,
      }
    },
    computed: {
      ...mapGetters(['isAuthor', 'article']),
      likeCount() {
        return this.article.like_users?.length
      }
    },
    methods: {
      ...mapActions([
        'fetchArticle',
        'likeArticle',
        'deleteArticle',
      ])
    },
    created() {
      this.fetchArticle(this.articlePk)
    },
  }
</script>

  
<style>
  .article-card {

    display: flex;
    flex-direction: column;
    width: 50%;
    min-height: 100vh;

    background: #003566;
    border-radius: 36px;
  }

  .text{
    text-align: justify;
  }
</style>
