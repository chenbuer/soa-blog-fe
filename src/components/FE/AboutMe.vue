<template>
<div>
  <my-nav></my-nav>

  <div class="container">

    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">
          <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
          &nbsp;关于我</big>
        </h3>
      </div>
      <div class="panel-body">
        <div v-html="aboutMe.profile"></div>
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
      aboutMe: {}
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
      axios.get("http://localhost:8080/aboutMe")
            .then(function (response) {
              // console.log(response);
              _this.aboutMe=response.data.result;
            })
            .catch(function (error) {
              console.log(error);
            });
    }
  }
}
</script>


<style scoped>

</style>
