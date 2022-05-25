<template>
  <div>
    <h1>본자들 커뮤니티</h1>

      <v-app id="list-sample">
      <v-flex sm6 offset-sm3>
        <v-list two-line
                v-for="(listItem, index) in calData"
                :key="index">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title class="text--primary">
                {{ listItem.title }}
              </v-list-tile-title>
              <v-list-tile-sub-title>
                {{ listItem.user.username }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
  

          </v-list-tile>
          <v-divider></v-divider>
        </v-list>
        <br/>
        <v-pagination
          v-model="curPageNum"
          :length="numOfPages">
        </v-pagination>
      </v-flex>
    </v-app>
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

        dataPerPage: 10,
        curPageNum: 1,
        
      }

    },
    computed: {
      ...mapGetters(['articles']),


      startOffset() {
        return ((this.curPageNum - 1) * this.dataPerPage);
      },
      endOffset() {
        return (this.startOffset + this.dataPerPage);
      },
      numOfPages() {
        return Math.ceil(this.articles.length / this.dataPerPage);
      },
      calData() {
        return this.articles.slice(this.startOffset, this.endOffset)
      }
    },
    
    methods: {
      ...mapActions(['fetchArticles']),



    },
    created() {
      this.fetchArticles(),
      this.listData = this.articles
      console.log(this.calData)
    },
  }
</script>

<style></style>
