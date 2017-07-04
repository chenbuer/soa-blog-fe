<template>
<div>
  <my-nav></my-nav>

  <div class="container">
    

    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">
          <span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>
          &nbsp;博客类别：<big>{{$route.params.typeName}}</big>
        </h3>
      </div>

      <div class="panel-body">
        <ul class="list-group" v-for="blog in blogs">
          <li class="list-group-item">
            <router-link :to="{ name: 'article', params: { 'articleId': blog.id }}">{{blog.title}}</router-link>
            &nbsp;&nbsp;&nbsp;&nbsp;发表于:{{blog.releaseDate|timeFormat}}
          </li>
        </ul>
      </div>
    </div>

    
  </div>

  <my-footer></my-footer>
</div>
</template>

<script>
import Vue from 'vue';
// 注册Nav组件
Vue.component('my-nav', function (resolve) {
  require(['./common/IndexNav'], resolve)
});
// 注册footer组件
Vue.component('my-footer', function (resolve) {
  require(['./common/IndexFooter'], resolve)
});


export default {
  name: 'blogIndex',
  data () {
    return {
      blogs: {}
    }
  },
  mounted:function(){
    this.$nextTick(function () {
      this.getAboutMe();
    })
    
  },
  methods:{
    getAboutMe:function(){
      var _this=this;
      axios.get("http://localhost:8080/type/"+this.$route.params.typeName)
            .then(function (response) {
              console.log(response);
              _this.blogs=response.data.result;
              console.log(_this.blogs);
            })
            .catch(function (error) {
              console.log(error);
            });
    }
  }
}
</script>


<style scoped>
big{
  color: red;
}
</style>
