<template>
  <div class="panel panel-default" id="indexSliderLinks"> 
    <div class="panel-heading">
      <h3 class="panel-title">
        <span class="glyphicon glyphicon-link" aria-hidden="true"></span>&nbsp;友情链接
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
          axios.get('http://localhost:8080/getLinks')
              .then(function (response) {
                  // console.log("getLinks");
                  // console.log(response);
                  _this.links=response.data.result;

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
