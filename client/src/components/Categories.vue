<template>
  <div class="card my-4">
    <h5 class="card-header">Categories</h5>
    <div class="card-body">
      <div class="row">
        <div class="col-lg-6">
          <ul class="list-unstyled mb-0">
            <li v-for="(category,i) in categories" :key="i">
              <a><router-link :to="{ path: '/' + category._id, params: { id: category._id } }"> {{ category.name }} </router-link></a>
            </li>
          </ul>
        </div>
      </div>
      <hr>
      <button type="button" class="btn btn-danger btn-sm"  data-toggle="modal"
      data-target="#modalNewCategory">New Category</button>
      <div id="modalNewCategory" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" align="left">New Category</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
              <form class="ivu-form ivu-form-label-right">
                <div class="form-group">
                  <label class="form-title">Name</label>
                  <div class="form-group-content">
                    <div class="">
                      <i class="validate"></i>
                      <input type="text" placeholder="category name.." class="form-control" v-model="addThisCategory.name">
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button class="btn btn-primary" @click="addCategory" data-dismiss="modal">Save</button>
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
  name: 'categories',
  components: {
  },
  data () {
    return {
      addThisCategory: {
        name: ''
      }
    }
  },
  methods: {
    addCategory: function () {
      const token = localStorage.getItem('token')
      if (!token) {
        alert('please login')
      } else if (!this.addThisCategory.name) {
        alert('please input category name')
      } else {
        axios.post(`http://localhost:3000/categories`, {
          name: this.addThisCategory.name
        }, {
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

        // clear add category form
        this.clearAddThisCategory()
      }
    },
    clearAddThisCategory: function () {
      this.addThisCategory.name = ''
    }
  },
  computed: {
    ...mapState([
      'categories'
    ])
  }
}
</script>
