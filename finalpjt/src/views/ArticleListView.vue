<template>
  <div>
    <h1>본자들 커뮤니티</h1>
    <ul>
      <li v-for="article in articles" :key="article.pk">
        <!-- 작성자 -->
        {{ article.category.name }}
        {{ article.user.username }} : 

        <!-- 글 이동 링크 (제목) -->
      
        <router-link 
          :to="{ name: 'article', params: {articlePk: article.id} }">
          {{ article.title }}
        </router-link>

        <!-- 댓글 개수/좋아요 개수 -->
        =>
        ({{ article.comment_count }}) | +{{ article.like_count }}


      </li>
    </ul>
        <router-link :to="{ name: 'articleNew'}">
          <button>글쓰러가기</button>
        </router-link>
   
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'ArticleList',
    computed: {
      ...mapGetters(['articles'])
    },
    methods: {
      ...mapActions(['fetchArticles'])
    },
    created() {
      this.fetchArticles()
    },
  }
</script>

<style></style>
