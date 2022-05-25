<template>
  <form @submit.prevent="onSubmit">
    <div>
      <div v-if="action==='create'">
        <v-select
          v-model="newArticle.category"
          :items="categoryList"
          item-text="cont"
          label="카테고리"
          required
        >
        </v-select>
    


      </div>
      <label for="article-title">title</label>
      <br>
      <input v-model="newArticle.title" type="text" id="article-title" />
    </div>
    <div>
      <label for="article-content">content</label>
      <br>
      <textarea v-model="newArticle.content" type="text" id="article-content"></textarea>
    </div>
    
    <div class="d-flex justify-content-end">
      <div>
        <button>{{ action }}</button>
      </div>
      <div v-if="action==='update'">
        <router-link  :to="{ name: 'article', params: {articlePk: articlePk} }" class="text-decoration-none ms-3">
          back
        </router-link>
      </div>
      <div v-if="action==='create'">
        <router-link  :to="{ name: 'articles' }" class="text-decoration-none ms-3">
          back
        </router-link>
      </div>

    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

  export default {
    name: 'ArticleForm',
    props: {
      article: Object,
      action: String,
    },
    data() {
      return {
        newArticle: {
          title: this.article.title,
          content: this.article.content,
          category: this.article.category
        },
        categoryList : [
          { cont: "결말포함" },
          { cont: "세계관" },
          { cont: "이스터에그" }
        ],
        articlePk: this.$route.params.articlePk,
      }
    },

    methods: {
      ...mapActions(['createArticle','updateArticle']),
      onSubmit() {
        if (this.action === 'create') {
          this.createArticle(this.newArticle)
        } else if (this.action === 'update') {
          const payload = {
            pk: this.article.id,
            // category: this.article.category,
            // title: this.article.title,
            // content: this.article.content,
            ...this.newArticle,
          }
          console.log(payload) //왜 다 1번이지카테고리id로 들어오는중
          this.updateArticle(payload)
        }
      },
    },
  }
</script>

<style>
#article-title{
  /* Rectangle 38 */

  width: 100%;
  height: 94px;


  background: linear-gradient(0deg, #6C7B8B, #6C7B8B), linear-gradient(0deg, #6C7B8B, #6C7B8B), linear-gradient(0deg, #6C7B8B, #6C7B8B), #6C7B8B;
  border-radius: 10px;

}
#article-content{
  /* Rectangle 36 */


width: 100%;
height: 300px;


background: linear-gradient(0deg, #6C7B8B, #6C7B8B), linear-gradient(0deg, #6C7B8B, #6C7B8B), linear-gradient(0deg, #6C7B8B, #6C7B8B), #6C7B8B;
border-radius: 10px;

}
</style>
