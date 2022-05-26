<template>
  <div>
    <v-container class="d-flex justify-content-center wrapper">
    <b-card class="articleform content">
        <article-form v-if="isArticle" :article="article" action="update"></article-form>
      </b-card>
    </v-container>
  </div>
</template>

<script>
import ArticleForm from '@/components/ArticleForm.vue'
import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'AritcleEditView',
    components: { ArticleForm },
    computed: {
      ...mapGetters(['article', 'isArticle',])
    },
    methods: {
      ...mapActions(['fetchArticle'])
    },
    created() {
      this.fetchArticle(this.$route.params.articlePk)
    },
  }
</script>

<style scoped>
  .articleform{
    background-color: #001D3D;
    width: 50%;
    height: 700px;
      }
      .wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;

    }

    
    .content {
      font-size: 2rem; 
      padding: 3rem;
      border-radius: 1rem;
      
    }
</style>
