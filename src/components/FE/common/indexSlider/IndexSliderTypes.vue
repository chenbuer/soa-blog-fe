<template>
  <div class="panel panel-default" id="indexSliderTypes">
    <div class="panel-heading">
      <h3 class="panel-title">
        <i class="icon ion-ios-folder"></i>&nbsp;按博客类别
      </h3>
    </div>
    <div class="panel-body">
      <ul class="list-group" v-for="type in types">
        <li class="list-group-item">
          <span class="badge">{{type.orderNo}}</span>
          <router-link :to="{ name: 'blogType', params: { 'typeName': type.typeName }}">{{type.typeName}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '../../../../api';
export default {
  name: 'indexSliderTypes',
  data() {
    return{
      types:{}
    }
  },
  mounted: function () {
      this.$nextTick(function () {
          this.getBlogTypes();
      })
  },
  methods:{
      getBlogTypes: function () {
          var _this=this;
          api.request('get', '/blogTypes', null)
          .then(response => {
            // console.log(response);
            _this.types=response.data.result; 
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
