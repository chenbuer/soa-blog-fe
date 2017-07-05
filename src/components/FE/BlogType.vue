<template>
<div>
  <index-nav></index-nav>
  <div class="container">
    

    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">
          <i class="icon ion-ios-folder"></i>&nbsp;&nbsp;博客类别：<big>{{$route.params.typeName}}</big>
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

    <index-footer></index-footer>
  </div>

</div>
</template>

<script>
import Vue from 'vue';
import api from '../../api';
import IndexNav from './common/IndexNav';
import IndexFooter from './common/IndexFooter';

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
      api.request('get', '/type/'+this.$route.params.typeName, null)
      .then(response => {
        // console.log(response);
         _this.blogs=response.data.result;
      })
      .catch(error => {
        console.log(error);
      })
    }
  },
  components:{IndexNav,IndexFooter}
}
</script>


<style scoped>
big{
  color: red;
}
</style>
