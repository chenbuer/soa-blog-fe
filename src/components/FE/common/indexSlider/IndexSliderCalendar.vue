<template>
  <div class="panel panel-default" id="indexCalendar">
    <div class="panel-heading">
      <h3 class="panel-title">
        <span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>&nbsp;按日期类别
      </h3>
    </div>
    <div class="panel-body">
      <ul class="list-group">
        <li class="list-group-item" v-for="blogType in blogTypeCountList">
          <span class="badge">{{blogType.blogCount}}</span>
          {{blogType.typeName}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '../../../../api';

export default {
  name: 'indexCalendar',
  data() {
    return{
      blogTypeCountList:{}
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
          api.request('get', '/allBlogs', null)
          .then(response => {
            // console.log(response);
            _this.blogTypeCountList=response.data.result;
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
