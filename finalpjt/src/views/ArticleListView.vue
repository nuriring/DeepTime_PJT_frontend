<template>
  <div>
    
    <v-app-bar
      class="bar"
      color="#6A76AB"
      dark
      prominent
  
      src="@/assets/see.png"
 

    >
      <template v-slot:img="{ props }">
        <v-img
         
          
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

    

      <v-app-bar-title>본자들 커뮤니티</v-app-bar-title>

      <v-spacer></v-spacer>


      <template v-slot:extension>
        <v-tabs align-with-title>
        <rotuer-link :to="{ name: 'articles' }" class="text-decoration-none text-white" >
          <v-tab>전체</v-tab>
        </rotuer-link>
        <router-link :to="{ name: 'category1Articles'}" class="text-decoration-none text-white" >
          <v-tab>결말포함</v-tab>   
        </router-link>
        <router-link :to="{ name: 'category2Articles'}" class="text-decoration-none text-white" >
          <v-tab>세계관</v-tab>
        </router-link>
        <router-link :to="{ name: 'category3Articles'}" class="text-decoration-none text-white" >
          <v-tab>이스터에그</v-tab>
        </router-link>
        
        </v-tabs>
      </template>
 
    </v-app-bar>
    <div class="total">
        <div class="listtitle">
          <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title class="text-primary">
                  번호
                </v-list-tile-title>
                &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                
                <v-list-tile-sub-title class="text-start">
                  제목
                </v-list-tile-sub-title>
                &nbsp;&nbsp;&nbsp;
                <v-list-tile-sub-title >
                  [댓글수]
                </v-list-tile-sub-title>

                <v-list-tile-sub-title class="float-right">
                  작성자
                </v-list-tile-sub-title>

              </v-list-tile-content>
            </v-list-tile>
        </div>
        

          <v-container >
            <div class="listgroup">

                <v-app id="list-sample">
                
                
                <v-flex sm6 offset-sm3>
                  
                  <v-list two-line
                          v-for="(listItem, index) in calData"
                          :key="index">
                    <v-list-tile>
                      
                      <v-list-tile-content>
                        <v-list-tile-title class="text-primary">
                          {{ listItem.id }}
                        </v-list-tile-title>
                        &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <!-- <router-link 
                :to="{ name: 'article', params: {articlePk: listItem.id} }">
                {{ end.title }}
              </router-link> -->


                        <v-list-tile-sub-title class="text-start">
                          {{ listItem.title }}
                        </v-list-tile-sub-title>
                        &nbsp;&nbsp;&nbsp;
                        <v-list-tile-sub-title >
                          [{{ listItem.comment_count }}]
                        </v-list-tile-sub-title>


                        <v-list-tile-sub-title class="float-right">
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
              <div>
                <router-link :to="{ name: 'articleNew'}" class="text-decoration-none d-flex justify-content-center mt-5">
                  <v-btn>나만의 본자들 컨텐츠 쓰러가기</v-btn>
                </router-link>

              </div>
        </v-app>
      </div>
    </v-container>
  </div>

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

<style scoped>
.listgroup{
  margin-top: 20px;

}
 #scrolling-techniques-3 {
  max-height: 100vh !important;
  
}
.listtitle{
  margin-left: 320px;
  margin-top: 20px;

  width: 670px;
}
.container {
  margin: 0;
  padding: 0;
}
.total{
  margin-left: 200px;
  margin-top: 50px;
}



</style>
