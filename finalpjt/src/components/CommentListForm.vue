<template>
  <form @submit.prevent="onSubmit" >
    <div class="d-flex justify-content-around align-items-baseline">
    <input type="text" id="comment" v-model="content" required>
    <button class="commentbtn">댓글달기</button>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CommentListForm',
  data() {
    return {
      content: ''
    }
  },
  computed: {
    ...mapGetters(['article']),
  },
  methods: {
    ...mapActions(['createComment']),
    onSubmit() {
      this.createComment({ articlePk: this.article.id, content: this.content, })
      this.content = ''
    }
  }
}
</script>

<style>
.comment-list-form {
  border: 1px solid black;
  margin: 1rem;
  padding: 1rem;
}
#comment {
  height: 53px;
  border: 1px solid lightgray;
  border-radius: 5px;
}
.commentbtn {
    background-color: lightgrey;

  border: none;

  color: white;

  padding: 15px 30px;

  text-align: center;
  color: black;

  margin: 4px 2px;

  cursor: pointer;
  border-radius: 2px;
}

</style>