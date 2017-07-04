<template>
  <div class="panel panel-default" id="indexSliderLinks"> 
    <div class="panel-heading">
      <h3 class="panel-title">
        <i class="icon ion-link"></i>&nbsp;友情链接
      </h3>
    </div>
    <div class="panel-body">
      <ul class="list-group" v-for="(link,inde) in links">
        <li class="list-group-item">
          <a :href="link.linkUrl" target="_blank">{{link.linkName}}</a>
        </li>
      </ul>
    </div>
    </div>
</template>

<script>
import api from '../../../../api';

export default {
  name: 'indexSliderLinks',
  data() {
    return{
      links:{}
    }
  },
  mounted: function () {
      this.$nextTick(function () {
          this.getLinks();
      })
  },
  methods:{
      getLinks: function () {
          var _this=this;
          api.request('get', '/getLinks', null)
          .then(response => {
            // console.log(response);
            _this.links=response.data.result;
          })
          .catch(error => {
            console.log(error);
          })

      }
  }
}
</script>

<style scoped>
</style>
