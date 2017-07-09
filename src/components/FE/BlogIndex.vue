<template>
<div id="blogIndex">
  <index-nav></index-nav>
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
                  <a @click="getBlogsWithPage(pageInfo.curPage-1)">&laquo;</a>
                </li>
                <li v-for="pageId in pageInfo.listPages" :class="pageInfo.curPage==pageId?'active':''">
                  <a @click="getBlogsWithPage(pageId)">{{pageId}}</a>
                </li>
                <li :class="pageInfo.showNext==false?'disabled':''">
                  <a @click="getBlogsWithPage(pageInfo.curPage+1)">&raquo;</a>
                </li>
              </ul>
            </nav>
          </div>

        </div>
      </div>


      <!--slider开始-->
      <div class="col-md-4">
        <slider-types></slider-types>
        <slider-links></slider-links>
      </div>
      <!--slider结束-->
      
      <index-footer></index-footer>
  </div>
  
</div>  
</template>

<script>
import Vue from 'vue';
import api from '../../api';
import IndexNav from './common/IndexNav';
import IndexFooter from './common/IndexFooter';
import SliderLinks from './common/indexSlider/IndexSliderLinks';
import SliderTypes from './common/indexSlider/IndexSliderTypes';

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
  },
  components:{IndexNav,IndexFooter,SliderLinks,SliderTypes}
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
