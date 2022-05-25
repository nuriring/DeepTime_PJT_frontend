<template>
<div>

    <b-list-group class="d-flex justify-content-center">
      <b-list-group-item class="comment-list-item">
            <router-link :to="{ name: 'profile', params: { username: comment.user.username } }" class="text-decoration-none">
              <v-icon>mdi-account-circle</v-icon>
              {{ comment.user.username }}
            </router-link>
            <br>
            
            <span v-if="!isEditing">{{ payload.content }}</span>
            <div class="caption text-secondary">
            <span v-if="isEditing">
              <input type="text" v-model="payload.content" class="comment-edit">
              <button @click="onUpdate">수정</button> |
              <button @click="switchIsEditing">삭제</button>
            </span>

            <span v-if="currentUser.username === comment.user.username && !isEditing">
              <button @click="switchIsEditing">수정</button> |
              <button @click="deleteComment(payload)">삭제</button>
            </span>

            </div>
      </b-list-group-item>

    </b-list-group>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CommentListItem',
  props: { comment: Object },
  data() {
    return {
      isEditing: false,
      payload: {
        articlePk: this.comment.article,
        commentPk: this.comment.id,
        content: this.comment.content
      },
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
  },
  methods: {
    ...mapActions(['updateComment', 'deleteComment']),
    switchIsEditing() {
      this.isEditing = !this.isEditing
    },
    onUpdate() {
      this.updateComment(this.payload)
      this.isEditing = false
    }
  },

}
</script>

<style scoped>
.comment-list-item{
  border: none;
}
.comment-edit{
    height: 53px;
  border: 1px solid lightgray;
  border-radius: 5px;
}

</style>