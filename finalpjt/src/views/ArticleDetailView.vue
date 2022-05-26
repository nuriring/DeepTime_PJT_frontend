<template>
<div class="please">

  <div class="d-flex justify-content-center">
      <b-card class="article-card mt-5">
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
          <div class="d-flex">
            <v-icon color=red small>mdi-heart</v-icon>
            <div class="body-1 ms-2">{{ article.like_users.length }}개</div>  
            </div> 
          <div class="d-flex ms-3">
            <v-icon color=secondary small>mdi-comment</v-icon>
            <div class="body-1 ms-2">{{ article.comments.length }}개</div>  
          </div> 
        </div>
        
        <hr>
        <div class="d-flex justify-content-between">
        <button @click="likeArticle(articlePk)">
          <p class="subheading font-weight-bold red--text text--lighten-1 m-0">
            좋아요
          </p>

        </button>
        <router-link id="articlelink" :to="{ name: 'articles' }" class="text-decoration-none">
        <span class="subheading font-weight-bold text--lighten-1 m-0">게시글 목록</span>
        </router-link>
        </div>
        <hr>

        <comment-list :comments="article.comments"></comment-list> 
          <div class="d-flex justify-content-center mt-5" v-if="isAuthor">
          <router-link :to="{ name: 'articleEdit', params: { articlePk } }" class="text-decoration-none">
            <v-btn>Edit</v-btn>
          </router-link>
          
          <v-btn @click="deleteArticle(articlePk)" class="ms-3">Delete</v-btn>
        </div>
      </b-card>



  
    

  </div>
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

  
<style scoped>
  .article-card {

    display: flex;
    flex-direction: column;
    width: 50%;
    min-height: 100vh;

    border-radius: 10px;
  }

  .text{
    text-align: justify;
  }

  .please{
  background-color: #001D3D;
  min-height: 100vh;
  color: black;
}

  #articlelink {
    color: grey;
  }

</style>
