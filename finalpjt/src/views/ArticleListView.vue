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
    <button @click="[categoryEnd(),toggle()]">결말포함</button>
      <div v-if="show">
        <div v-if="ends.length">
          <ul>
          <li v-for="(end,idx) in ends" :key="idx">
            <!-- 작성자 -->

              {{ end.category.name }}
              {{ end.user.username }} : 

              <!-- 글 이동 링크 (제목) -->
            
              <router-link 
                :to="{ name: 'article', params: {articlePk: end.id} }">
                {{ end.title }}
              </router-link>

              <!-- 댓글 개수/좋아요 개수 -->
              =>
              ({{ end.comment_count }}) | +{{ end.like_count }}




          </li>
        </ul>
        </div>
      </div>
      <!--#############-->
      <button @click="categoryWorld">세계관</button>
      <div v-if="worlds.length">
        <ul>
        <li v-for="(world,idx) in worlds" :key="idx">
          <!-- 작성자 -->

            {{ world.category.name }}
            {{ world.user.username }} : 

            <!-- 글 이동 링크 (제목) -->
          
            <router-link 
              :to="{ name: 'article', params: {articlePk: world.id} }">
              {{ world.title }}
            </router-link>

            <!-- 댓글 개수/좋아요 개수 -->
            =>
            ({{ world.comment_count }}) | +{{ world.like_count }}




        </li>
      </ul>
      </div>
   
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
        show: true
      }

    },
    computed: {
      ...mapGetters(['articles'])
    },
    methods: {
      ...mapActions(['fetchArticles']),
      toggle: function(){
        this.show =!this.show;
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
