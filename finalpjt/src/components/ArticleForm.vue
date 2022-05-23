<template>
  <form @submit.prevent="onSubmit">
    <div>
      <label for="title">title: </label>
      <input v-model="newArticle.title" type="text" id="title" />
    </div>
    <div>
      <label for="content">contnet: </label>
      <textarea v-model="newArticle.content" type="text" id="content"></textarea>
    </div>
    <div v-if="action==='create'">
  
      <select v-model="newArticle.category">
        <option disabled value="">Please select one</option>
        <option>결말포함</option>
        <option>세계관</option>
        <option>이스터에그</option>
      </select>


    </div>
    
    <div>
      <button>{{ action }}</button>
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
        }
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

<style></style>
