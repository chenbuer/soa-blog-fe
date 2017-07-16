<template>
<div class="container">
  <div class="row">    
    <div class="container">
      <div class="form-group">
        <label for="display_name">昵称：</label>
        <input class="form-control" type="text" value="nickName" v-model="nickName">
      </div>
      <div class="form-group">
        <label for="location">口号：</label>
        <input class="form-control" type="text" value="Sign" v-model="sign">
      </div>
    </div>
  </div>

  <label for="location">正文：</label>
  <div class="quill-editor-example">
    <!-- quill-editor -->
    <quill-editor ref="myTextEditor"
                  v-model="profile"
                  :options="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)">
    </quill-editor>
    <!--<div class="html ql-editor" v-html="profile"></div>-->
  </div>
    
  <button class="btn btn-primary" type="submit" @click="onSubmit">保存</button>
  
  </md-card>


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
      nickName:'',
      sign:'',
      profile: '请输入...',      
      editorOption: {}
    }
  },
  methods: {
    onEditorBlur(editor) {
      // console.log('editor blur!', editor)
      // console.log(this.profile)
    },
    onEditorFocus(editor) {
      // console.log('editor focus!', editor)
      // console.log(this.profile)
    },
    onEditorReady(editor) {
      // console.log('editor ready!', editor)
      // console.log(this.profile)
    },
    onSubmit(){
      api.request('post', '/admin/updateAboutMe',{
        'userName':window.sessionStorage.getItem("user"),
        'nickName':this.nickName,
        'sign':this.sign,
        'profile':this.profile})
      .then(response => {
        if(response.data.retCode==0){
          alert("修改成功");
        }else{
          alert("修改失败，内部错误。联系不二。");
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
    api.request('get', '/aboutMe',)
      .then(response => {
        var aboutMe=response.data.result;
        this.nickName=aboutMe.nickName;
        this.sign=aboutMe.sign;
        this.profile=aboutMe.profile;
        console.log(aboutMe);
      })
      .catch(error => {
        console.log(error);
      })
  }
}
</script>

<style lang="scss">
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