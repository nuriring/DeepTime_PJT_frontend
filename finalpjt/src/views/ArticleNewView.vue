<template>
  <div class="total">
    <v-container class="d-flex justify-content-center wrapper">
      <b-card class="articleform content">
        <article-form :article="article" action="create"></article-form>

      </b-card>
    </v-container>
  </div>
</template>

<script>
  import ArticleForm from '@/components/ArticleForm.vue'
  export default {
    name: 'AritcleNewView',
    components: { ArticleForm },
    data() {
      return {
        article: {
          pk: null,
          title: '',
          content: '',
          category: '',
        }
      }
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
  .total{
  background: #001D3D;
  min-height: 100vh;
  color: white;
}
</style>
