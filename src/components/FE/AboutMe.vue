<template>
<div class="AboutMe">
  <index-nav></index-nav>

  <div class="container">

    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">
          <i class="icon ion-happy"></i>&nbsp;关于我</big>
        </h3>
      </div>
      <div class="panel-body">
        <div v-html="aboutMe.profile"></div>
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
      api.request('get', '/aboutMe', null)
      .then(response => {
        // console.log(response);
        _this.aboutMe=response.data.result;
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

</style>
