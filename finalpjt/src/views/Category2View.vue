<template>
  <div class ="text-white">
    
    <v-app-bar
      class="bar text-white"
      
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

    

      <v-app-bar-title class="fs-4 fw-bold">본자들 커뮤니티</v-app-bar-title>

      <v-spacer></v-spacer>

    
      <template v-slot:extension>
        <v-tabs align-with-title>
        <router-link :to="{ name: 'articles' }" class="text-decoration-none text-white" >
          <v-tab class="fs-5">전체</v-tab>
        </router-link>
        <router-link :to="{ name: 'category1Articles'}" class="text-decoration-none text-white" >
          <v-tab class="fs-5">결말포함</v-tab>   
        </router-link>
        <router-link :to="{ name: 'category2Articles'}" class="text-decoration-none text-white" >
          <v-tab class="fs-5">세계관</v-tab>
        </router-link>
        <router-link :to="{ name: 'category3Articles'}" class="text-decoration-none text-white" >
          <v-tab class="fs-5">이스터에그</v-tab>
        </router-link>
        
        </v-tabs>
      </template>
      

    </v-app-bar>
    <div class="body text-white">
        <div class="listtitle text-white">
          <v-list-tile class="fs-5 fw-bold">
              <v-list-tile-content>
                <v-list-tile-title class="text-white">
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
        <hr class="headline">
  
          <v-container >
            <div class="listgroup">

                <v-app id="list-sample">
                
                
                <v-flex sm6 offset-sm3>
                  
                  <v-list two-line
                          v-for="(listItem, index) in calData"
                          :key="index"
                          class ="list"
                          dark
                          >
                        
                    <v-list-tile class="fs-5">
                      
                      <v-list-tile-content>
                        <v-list-tile-title class="text-white">
                          {{ listItem.id }}
                        </v-list-tile-title>
                        &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  
                      <router-link class="text-decoration-none text-secondary" 
                        :to="{ name: 'article', params: {articlePk: listItem.id} }">
                        <v-list-tile-sub-title class="text-white">
                          {{ listItem.title }}
                        </v-list-tile-sub-title>
                      </router-link>

                        &nbsp;&nbsp;&nbsp;
                        <v-list-tile-sub-title class="caption" >
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
                  <v-btn class="fs-5 fw-bold"  style="width:700px; height:50px;">나만의 본자들 컨텐츠 쓰러가기</v-btn>
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
    name: 'Category2View',
    data() {
      return {

        dataPerPage: 10,
        curPageNum: 1,
        
      }

    },
    computed: {
      ...mapGetters(['category2Articles']),


      startOffset() {
        return ((this.curPageNum - 1) * this.dataPerPage);
      },
      endOffset() {
        return (this.startOffset + this.dataPerPage);
      },
      numOfPages() {
        return Math.ceil(this.category2Articles.length / this.dataPerPage);
      },
      calData() {
        return this.category2Articles.slice(this.startOffset, this.endOffset)
      }
    },
    
    methods: {
      ...mapActions(['fetchCategory2Articles']),



    },
    created() {
      this.fetchCategory2Articles(),
      this.listData = this.category2Articles
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
.body{
  
  margin-left: 250px;
  margin-top: 50px;
}
.headline{
  margin-left: 325px;
  width: 670px;
  height: 5px;
}

.list{
  color: white;
  background: #001D3D;
}

.theme--light {
 background: #001D3D;
}

.v-application {
 background: #001D3D;
    }
div {
  font-family: 'Gowun Batang', serif;
}    
  

</style>
