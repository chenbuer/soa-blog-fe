<template>
<div class="container">
  <div class="form-group">
    <label for="display_name">文章标题：</label>
    <input class="form-control" type="text" placeholder="请输入文章标题" v-model="title">
  </div>

  <label for="location">正文：</label>
      <div class="quill-editor-example">
        <!-- quill-editor -->
        <quill-editor ref="myTextEditor"
                      v-model="content"
                      :options="editorOption">
        </quill-editor>
        <!--<div class="html ql-editor" v-html="content"></div>-->
      </div>
    
    <button class="btn btn-primary" type="submit" @click="onSubmit">保存</button>


</div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
 import api from '../../../api'
  
export default {
  components:{
    quillEditor
  },
  data() {
    return {
      name: 'base-example',
      editorOption: {},
      title:'',
      type:'',//type暂时写死，后面处理
      content:''
    }
  },
  methods: {
    onSubmit(){
      api.request('post', '/admin/addBlog',{
        'title':this.title,
        'type':this.type,
        'content':this.content})
      .then(response => {
        if(response.data.retCode==0){
          alert("添加文章成功");
        }else{
          alert("添加失败，内部错误。联系不二。");
        }
      })
      .catch(error => {
        console.log(error);
        alert(error);
      })
    }
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill
    }
  },
  mounted() {
    console.log('this is my editor', this.editor)
  }
}
</script>

<style>
  .ql-container .ql-editor {
    min-height: 20em;
    padding-bottom: 1em;
    max-height: 25em;
  }
  .html {
    height: 9em;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-top: none;
    resize: vertical;
  }
</style>