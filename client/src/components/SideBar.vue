<template>
  <div class="card my-4 ">
    <div class="card-body flex-container">
      <div class="flex-items">{{articles.length}} articles</div>
      <div class="flex-items">
        <button type="button" class="btn btn-danger btn-md btn-logout"  data-toggle="modal"
      data-target="#modalAdd">Create New Article</button>
      </div>

      <div id="modalAdd" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" align="left">New Articles</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
              <form class="ivu-form ivu-form-label-right">
                <div class="form-group">
                  <label class="form-title">Title</label>
                  <div class="form-group-content">
                    <div class="">
                      <i class="validate"></i>
                      <input type="text" placeholder="title.." class="form-control" v-model="addThisArticle.title">
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-title">Content</label>
                  <div class="form-group-content">
                    <div class="">
                      <i class="validate"></i>
                      <textarea placeholder="your article's content" rows="2" class="form-control" v-model="addThisArticle.content"></textarea>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-title">Image</label>
                  <div class="form-group-content">
                    <div class="">
                      <input type="file" class="form-control" id="recipient-name" @change="getPhotoAdd">
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-title">Category</label>
                  <div class="form-group-content">
                    <div class="">
                      <i class="validate"></i>
                      <select class="form-control form-control-sm" data-live-search="true" v-model="addThisArticle.category">
                        <option v-for="(category,i) in categories" :key="i" :value="category._id"> {{ category.name }} </option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button class="btn btn-primary" @click="addArticle" data-dismiss="modal">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'sidequestion',
  components: {
  },
  data () {
    return {
      addThisArticle: {},
      fileAdd: null,
      formData: new FormData()
    }
  },
  methods: {
    getPhotoAdd: function (event) {
      this.fileAdd = event.target.files[0]
    },
    addArticle: function () {
      const token = localStorage.getItem('token')
      if (!token) {
        alert('please login')
      } else {
        this.formData.set('image', this.fileAdd)
        this.formData.set('title', this.addThisArticle.title)
        this.formData.set('content', this.addThisArticle.content)
        this.formData.set('category', this.addThisArticle.category)
        axios({
          method: 'post',
          url: 'http://localhost:3000/articles',
          data: this.formData,
          headers: {
            token
          }
        }).then(({ data }) => {
          this.$router.go()
        })

        // clear add article form
        this.clearaddThisArticle()
      }
    },
    clearaddThisArticle: function () {
      this.addThisArticle = {}
    }
  },
  computed: {
    ...mapState([
      'articles',
      'categories'
    ])
  }
}
</script>
