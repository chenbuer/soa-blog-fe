<template>
<div>
  <my-nav></my-nav>

  <div class="container">

    <div class="panel panel-default">
      <div class="panel-heading">{{blog.title}}</div>
      <div class="panel-body">
        <div v-html="blog.content"></div>
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
      blog: {}
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
      axios.get("http://localhost:8080/article/"+this.$route.params.articleId)
            .then(function (response) {
              console.log(response);
              _this.blog=response.data.result;
            })
            .catch(function (error) {
              console.log(error);
            });
    }
  }
}
</script>


<style scoped>
.panel-heading{
  text-align: center;
}

</style>
