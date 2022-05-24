<template>
  <div>
    <h1>본자들 커뮤니티</h1>
    <div>
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
    </div>
        <router-link :to="{ name: 'articleNew'}">
          <button>글쓰러가기</button>
        </router-link>
        <router-link :to="{ name: 'category1Articles'}">
          <button>결말포함</button>
        </router-link>
        <router-link :to="{ name: 'category2Articles'}">
          <button>세계관</button>
        </router-link>
        <router-link :to="{ name: 'category3Articles'}">
          <button>이스터에그</button>
        </router-link>
    
   
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'ArticleList',
    data() {
      return {
        ends : [],
        worlds : [],
        eggs : [],
        show: true,
        all: false
      }

    },
    computed: {
      ...mapGetters(['articles'])
    },
    methods: {
      ...mapActions(['fetchArticles']),
      toggle: function(){
        this.show = !this.show;
        this.all = !!this.all;
      },
      categoryEnd: function(){

        // console.log(this.articles)
        var arr = this.articles
        const result = arr.filter(function(elem){
          return elem.category.name === "결말포함"
        });
        this.ends = result
      },
      categoryWorld: function(){

        // console.log(this.articles)
        var arr = this.articles
        const result = arr.filter(function(elem){
          return elem.category.name === "세계관"
        });
        this.worlds = result
      },

    },
    created() {
      this.fetchArticles()
    },
  }
</script>

<style></style>
