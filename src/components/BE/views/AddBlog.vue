<template>
<div id="form-container" >
  <form>
    <div class="row">
      <div class="col-xs-4">
      </div>
      <div class="col-xs-8">
        <div class="form-group">
          <label for="display_name">Display name</label>
          <input class="form-control" name="display_name" type="text" value="Wall-E">
        </div>
        <div class="form-group">
          <label for="location">Location</label>
          <input class="form-control"  name="location" type="text" value="Earth">
        </div>
      </div>
    </div>


    <div class="row form-group">
      <label for="about">About me</label>
      <input name="about" type="hidden">
      <quill-editor></quill-editor>
      <!--<div id="editor-container">
        <p>A robot who has developed sentience, and is the only robot of his kind shown to be still functioning on Earth.</p>
      </div>-->
    </div>

    <div class="row">
      <button class="btn btn-primary" type="submit" @click="onSubmit">保存</button>
    </div>
  </form>
</div> 
</template>


<script>

import { quillEditor } from 'vue-quill-editor'

export default {
    data () {
        return {
            content: '<h2>I am Example</h2>',
            editorOption: {
                debug: 'info',
                modules: {
                    toolbar: [
                    ['bold', 'italic'],
                    ['link', 'blockquote', 'code-block', 'image'],
                    [{ list: 'ordered' }, { list: 'bullet' }]
                    ]
                },
                placeholder: '请输入正文...',
                readOnly: false,
                theme: 'snow',
                formats:{
                }
            }
        }
    },
    components: {
        quillEditor
    },
    methods:{
        onSubmit:function(){
            // Populate hidden form on submit
            var about = document.querySelector('input[name=about]');
            about.value = JSON.stringify(quill.getContents());

            console.log("Submitted", $(form).serialize(), $(form).serializeArray());

            // No back end to actually submit to!
            alert('Open the console to see the submit data!')
            return false;
        }
    }
}

</script>

<style>
#form-container {
  width: 100%;
}

.row {
  margin-top: 15px;
}
.row.form-group {
  padding-left: 15px;
  padding-right: 15px;
}
.btn {
  margin-left: 15px;
}

.change-link {
  background-color: #000;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  bottom: 0;
  color: #fff;
  opacity: 0.8;
  padding: 4px;
  position: absolute;
  text-align: center;
  width: 150px;
}
.change-link:hover {
  color: #fff;
  text-decoration: none;
}

img {
  width: 150px;
}

#editor-container {
  height: 130px;
}
</style>