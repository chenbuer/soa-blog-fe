<template>
<div id="blogIndex">
  <my-nav></my-nav>
  <div class="container">
      <div class="col-md-8">
        
        <div class="panel panel-default">
          <!--开头一个标识-->
          <div class="panel-heading">
            <h3 class="panel-title">
              <i class="icon ion-ios-list"></i>&nbsp;&nbsp;最新文章
            </h3>
          </div>
          
          <!--文章具体列表展示-->
          <div class="panel-body">
              <ul v-for="blog in blogs">
                  <li style="margin-bottom: 30px">
                    <span class="title">
                      <router-link :to="{ name: 'article', params: { 'articleId': blog.id }}">{{blog.title}}</router-link>
                    </span>
                    <br>
                    <span class="summary">摘要:{{blog.summary}}...</span> 
                      <br>
                    <span class="info pull-right">
                      发表于 {{blog.releaseDate|prettyDate}}
                    阅读({{blog.clickHit}}) 评论({{blog.replyHit}}) 
                    </span>
                  </li>
                  <hr style="height: 5px; border: none; border-top: 1px dashed gray; padding-bottom: 10px;" ></hr>
              </ul>
          </div>

          <!--分页信息-->
          <div class="panel-footer">
            <nav aria-label="Page navigation">
              <ul class="pagination">
                <li :class="pageInfo.showPre==false?'disabled':''">
                  <a>&laquo;</a>
                </li>
                <li v-for="pageId in pageInfo.listPages" :class="pageInfo.curPage==pageId?'active':''">
                  <a @click="getBlogsWithPage(pageId)">{{pageId}}</a>
                </li>
                <li :class="pageInfo.showNext==false?'disabled':''">
                  <a>&raquo;</a>
                </li>
              </ul>
            </nav>
          </div>

        </div>
      </div>


      <!--slider开始-->
      <div class="col-md-4">
        <my-types></my-types>
        <!--<my-calender></my-calender>-->
        <my-links></my-links>
      </div>
      <!--slider结束-->

  </div>
  <my-footer></my-footer>
</div>  
</template>

<script>
import Vue from 'vue';
import api from '../../api';
import {prettyDate} from '../../filters';

// 注册Nav组件
Vue.component('my-nav', function (resolve) {
  require(['./common/IndexNav'], resolve)
});
// 注册footer组件
Vue.component('my-footer', function (resolve) {
  require(['./common/IndexFooter'], resolve)
});
// 注册旁边的Slider三个组件
Vue.component('my-types', function (resolve) {
  require(['./common/indexSlider/IndexSliderTypes'], resolve)
});
// 按照日期进行分类，暂时先不写
// Vue.component('my-calender', function (resolve) {
//   require(['./common/indexSlider/IndexSliderCalendar'], resolve)
// });
Vue.component('my-links', function (resolve) {
  require(['./common/indexSlider/IndexSliderLinks'], resolve)
});



export default {
  name: 'blogIndex',
  data () {
    return {
      blogs: {},
      pageInfo:''
    }
  },
  mounted: function () {
      this.$nextTick(function () {
        var pageId=0;
        if(this.$route.params.pageId>0){
          pageId=this.$route.params.pageId;
        }else{
          pageId=1;
        }
        
        this.getBlogsWithPage(pageId);
      })
  },
  methods:{
      getBlogsWithPage: function (pageId) {
          var _this=this;
          // axios.get('http://localhost:8080/blogsWithPage',{
          //             params: {
          //               pageId: pageId
          //             }
          //           })
          //     .then(function (response) {
          //         //console.log("getTypes");
          //         //console.log(response);
          //         // history.pushState(null, null, '/page/'+pageId);
          //         _this.$router.push('/page/'+pageId);
          //         _this.blogs=response.data.result.blogPageList; 
          //         _this.pageInfo=response.data.result.pageInfo;

          //     })
          //     .catch(function (error) {
          //         console.log(error);
          //     });

          api.request('get', '/blogsWithPage?pageId='+pageId, null)
          .then(response => {
            // console.log(response);
            // history.pushState(null, null, '/page/'+pageId);
            _this.$router.push('/page/'+pageId);
            _this.blogs=response.data.result.blogPageList; 
            _this.pageInfo=response.data.result.pageInfo;
          })
          .catch(error => {
            console.log(error);
          })

      }
  }
}
</script>


<style scoped>
.panel-heading{
  text-align: left;
}
.pagination{
  margin: 0;
}
</style>
