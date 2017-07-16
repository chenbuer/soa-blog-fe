<template>
<div class="container">
  <div class="form-group">
    <label>文章标题：</label>
    <input class="form-control" type="text" placeholder="请输入文章标题" v-model="title">
  </div>

  <div>
    <label>文章类型：</label>
    <br/>
    <b-form-select v-model="selected"
                   :options="blogTypes"
                   class="mb-3"
    ></b-form-select>
  </div>

  <label>正文：</label>
      <div class="quill-editor-example">
        <!-- quill-editor -->
        <quill-editor ref="myTextEditor"
                      v-model="content"
                      :options="editorOption"
                      id="quill">
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
      selected: null,
      name: 'base-example',
      editorOption: {
        placeholder: '请输入...'
      },
      title:'',
      content:'',
      blogTypes:[]
    }
  },
  methods: {
    onSubmit(){
      var summary=this.$children[1].quill.getText().substr(0, 155);      
      api.request('post', '/admin/save',{
        'title':this.title,
        'content':this.content,
        'summary':summary,
        'typeId':this.selected,
        'keyWord':''
        })
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
    // console.log('this is my editor', this.editor)
    api.request('get', '/admin/blogsTypes',)
      .then(response => {
        this.blogTypes=response.data.result;
        //添加一个默认的提示
        this.blogTypes.splice(0,0,{text: '请选择博客类型',value: null});
      })
      .catch(error => {
        console.log(error);
      })
  }
}
</script>

<style scoped>
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