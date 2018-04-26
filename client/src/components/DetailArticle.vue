<template>
  <div>
    <div class="card mb-4" v-for="(article,i) in articles" :key="i" v-if="article._id == articleid">
      <img class="card-img-top" v-bind:src="article.image" alt="Card image cap">
      <div class="card-body">
        <h2 class="card-title">{{ article.title }}</h2>
        <p class="card-text">{{ article.content }}</p>
        <div class="row justify-content-center">
          <div class="ml-5">
            <a v-on:click="likeArticle(article._id)"><i class="far fa-thumbs-up grow"></i></a>
            <span class="badge badge-light">{{article.likes.length}}</span>
          </div>
          <div class="">
            <a v-on:click="dislikeArticle(article._id)"><i class="far fa-thumbs-down grow"></i></a>
            <span class="badge badge-light">{{article.dislikes.length}}</span>
          </div>
          <button v-if="article.author._id === userid" class="btn btn-info btn-sm" @click="changeEditThisArticle(article)" data-toggle="modal" data-target="#modalEditArticle">Edit</button>
          <button v-if="article.author._id === userid" class="btn btn-danger btn-sm" @click="deleteArticle(article._id)">Delete</button>
          <div id="modalEditArticle" class="modal fade" role="dialog">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" align="left">Edit Article</h4>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                  <form class="ivu-form ivu-form-label-right">
                    <div class="form-group">
                      <label class="form-title">Title</label>
                      <div class="form-group-content">
                        <div class="">
                          <i class="validate"></i>
                          <input type="text" class="form-control" v-model="editThisArticle.title">
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="form-title">Content</label>
                      <div class="form-group-content">
                        <div class="">
                          <i class="validate"></i>
                          <textarea rows="2" class="form-control" v-model="editThisArticle.content"></textarea>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="form-title">Category</label>
                      <div class="form-group-content">
                        <div class="">
                          <i class="validate"></i>
                          <select class="form-control form-control-sm" data-live-search="true" v-model="editThisArticle.category">
                            <option v-for="(category,i) in categories" :key="i" :value="category._id"> {{ category.name }} </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  <button class="btn btn-primary" @click="editArticle" data-dismiss="modal">Edit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr>
        <p class="comment-user">Comment:</p>
        <hr>
        <div class="card mb-4" v-for="(comment,i) in article.comments" :key="i">
          <div class="card-body">
            <p>{{ comment.comment }}</p>
            <div class="row justify-content-center">
              <div class="ml-5">
                <a v-on:click="likeComment(comment._id)"><i class="far fa-thumbs-up grow"></i></a>
                <span class="badge badge-light">{{comment.likes.length}}</span>
              </div>
              <div class="">
                <a v-on:click="dislikeComment(comment._id)"><i class="far fa-thumbs-down grow"></i></a>
                <span class="badge badge-light">{{comment.dislikes.length}}</span>
              </div>
              <button v-if="comment.user._id === userid" class="btn btn-info btn-sm" @click="changeEditThisComment(comment)" data-toggle="modal" data-target="#modalEditComment">Edit</button>
              <div id="modalEditComment" class="modal fade" role="dialog">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h4 class="modal-title" align="left">Edit Comment</h4>
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                      <form class="ivu-form ivu-form-label-right">
                        <div class="form-group">
                          <label class="form-title">Comment</label>
                          <div class="form-group-content">
                            <div class="">
                              <i class="validate"></i>
                              <input type="text" class="form-control" v-model="editThisComment.comment">
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                      <button class="btn btn-primary" @click="editComment" data-dismiss="modal">Edit</button>
                    </div>
                  </div>
                </div>
              </div>
              <button v-if="comment.user._id === userid" class="btn btn-danger btn-sm" @click="deleteComment(comment._id)">Delete</button>
            </div>
          </div>
          <div class="card-footer card-footer-answer text-muted">
            Commented on {{comment.createdAt.slice(0, 10)}}; Last Update on {{comment.updatedAt.slice(0, 10)}} by {{comment.user.email}}
          </div>
        </div>
        <div class="comment-user">
          <textarea rows="4" cols="27" class="boxsizingBorder" v-model="newComment"></textarea> <br/>
          <button class="btn" @click="addComment(article._id)">Post Your Comment</button>
        </div>
      </div>
      <div class="card-footer text-muted">
        Posted on {{article.createdAt.slice(0, 10)}}; Last Update on {{article.updatedAt.slice(0, 10)}} by
        <a href="#">{{article.author.email}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'Post',
  data () {
    return {
      userid: '',
      category: this.$route.params.id,
      articleid: this.$route.params.articleid,
      newComment: '',
      editThisArticle: {
        id: '',
        title: '',
        content: '',
        category: ''
      },
      editThisComment: {
        id: '',
        comment: ''
      }
    }
  },
  created: function () {
    this.userid = localStorage.getItem('iduser')
  },
  methods: {
    changeEditThisArticle: function (post) {
      console.log('post--', post)
      this.editThisArticle.id = post._id
      this.editThisArticle.title = post.title
      this.editThisArticle.content = post.content
      this.editThisArticle.category = post.category._id
    },
    changeEditThisComment: function (comment) {
      console.log('comment--', comment)
      this.editThisComment.id = comment._id
      this.editThisComment.comment = comment.comment
    },
    editArticle: function () {
      let token = localStorage.getItem('token')
      const {id, title, content, category} = this.editThisComment
      axios.put(`http://localhost:3000/articles/${id}`, {
        title, content, category
      }, {
        headers: {
          token
        }
      })
        .then(response => {
          console.log('berhasil', response)
          this.$router.go()
        })
        .catch(err => {
          console.log(err)
        })
    },
    editComment: function () {
      let token = localStorage.getItem('token')
      const {id, comment} = this.editThisComment
      axios.put(`http://localhost:3000/comments/${id}`, {
        comment
      }, {
        headers: {
          token
        }
      })
        .then(response => {
          console.log('berhasil', response)
          this.$router.go()
        })
        .catch(err => {
          console.log(err)
        })
    },
    addComment: function (postid) {
      let token = localStorage.getItem('token')
      if (!token) {
        alert('Login first')
      } else {
        axios.post('http://localhost:3000/articles/addcomment', {
          id: postid,
          comment: this.newComment
        }, {
          headers: {
            token
          }
        })
          .then(response => {
            console.log(response)
            this.newComment = ''
            this.$router.go()
          })
          .catch(err => {
            console.error(err)
          })
      }
    },
    likeArticle: function (articleid) {
      let token = localStorage.getItem('token')
      axios.put(`http://localhost:3000/articles/like/${articleid}`, {}, {
        headers: {
          token: token
        }
      })
        .then(response => {
          console.log('berhasil', response)
          this.$router.go()
        })
        .catch(err => {
          console.log(err)
        })
    },
    dislikeArticle: function (articleid) {
      let token = localStorage.getItem('token')
      axios.put(`http://localhost:3000/articles/dislike/${articleid}`, {}, {
        headers: {
          token: token
        }
      })
        .then(response => {
          console.log('berhasil', response)
          this.$router.go()
        })
        .catch(err => {
          console.log(err)
        })
    },
    likeComment: function (commentid) {
      let token = localStorage.getItem('token')
      axios.put(`http://localhost:3000/comments/like/${commentid}`, {}, {
        headers: {
          token: token
        }
      })
        .then(response => {
          console.log('berhasil', response)
          this.$router.go()
        })
        .catch(err => {
          console.log(err)
        })
    },
    dislikeComment: function (commentid) {
      let token = localStorage.getItem('token')
      axios.put(`http://localhost:3000/comments/dislike/${commentid}`, {}, {
        headers: {
          token: token
        }
      })
        .then(response => {
          console.log('berhasil', response)
          this.$router.go()
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteArticle: function (articleid) {
      let token = localStorage.getItem('token')
      axios.delete(`http://localhost:3000/articles/${articleid}`, {
        headers: {
          token
        }
      })
        .then(response => {
          console.log('berhasil', response)
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteComment: function (commentid) {
      let token = localStorage.getItem('token')
      axios.delete(`http://localhost:3000/comments/${commentid}`, {
        headers: {
          token
        }
      })
        .then(response => {
          console.log('berhasil', response)
          this.$router.go()
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    ...mapState([
      'articles',
      'categories'
    ])
  },
  watch: {
    $route: function (to, from) {
      this.$router.go()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comment-user {
  font-weight: bold;
}

.boxsizingBorder {
    -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
            box-sizing: border-box;
}

.card-footer-answer {
  text-align: right;
}

.grow {
  -webkit-transition:all 0.5s ease-out;
  -moz-transition:all 0.5s ease-out;
  -ms-transition:all 0.5s ease-out;
  -o-transition:all 0.5s ease-out;
  transition:all 0.5s ease-out;
}

.grow:hover {
  -webkit-transform:scale(1.3);
  -moz-transform:scale(1.3);
  -ms-transform:scale(1.3);
  -o-transform:scale(1.3);
  transform:scale(1.3);
}
</style>
