<template>
<div class="Article">
  <index-nav></index-nav>

  <div class="container">

    <div class="panel panel-default">
      <div class="panel-heading">{{blog.title}}</div>
      <div class="panel-body">
        <div v-html="blog.content"></div>
      </div>
    </div>

    <index-footer></index-footer>
  </div>

  <my-footer></my-footer>
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
      api.request('get', '/article/'+this.$route.params.articleId, null)
      .then(response => {
        // console.log(response);
        _this.blog=response.data.result;
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
.panel-heading{
  text-align: center;
}

</style>
