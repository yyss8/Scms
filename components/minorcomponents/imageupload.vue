<template>
    <div>
        <div class='input-group'>
            <input class='form-control' type="text" placeholder='点击浏览图片' readonly :value='currentFilesName'/>
            <span class='input-group-btn'>
                <button  class='btn btn-danger' v-if='currentImageFile != ""' @click='deleteUploadingFile'><i class='fa fa-trash'></i>&nbsp;删除</button>
                <button  class='btn btn-success' v-if='currentImageFile != ""' @click='upload'><i class='fa fa-arrow-circle-o-up'></i>&nbsp;上传</button>
                <label for="file" class='btn btn-default'><input type="file" @change="onImageChange" id="file" style='display:none;' :multiple='preload.multiple' :accept='preload.accepts'/><i class='fa fa-folder-o'></i>&nbsp;浏览</label>
            </span>
        </div>
    </div>
</template>

<script>

    import ModalView from "~/components/minorcomponents/scmsmodal.vue";

    export default {
        props:[
            "preload"
        ],
        data(){
            return {
                currentImageFile:""
            }
        },
        computed:{
            currentFilesName(){
                if (this.currentImageFile == ""){
                    return ""
                }else{
                    let filename = [];
                    Array.from(this.currentImageFile).forEach(file => {
                        filename.push(file.name);
                    });
                    return filename.join(',')
                }
            }
        },
        methods:{
            onImageChange(e){
                this.currentImageFile = e.target.files || e.dataTransfer.files;
                this.preload.getImg(this.currentImageFile);
            },
            deleteUploadingFile(){
                $('#file').wrap('<form>').closest('form').get(0).reset();
                $("#file").unwrap();
                this.currentImageFile = "";
                this.preload.delImg();
            },
            upload(){
                let formData = new FormData();
                for (let i = 0; i<this.currentImageFile.length;i ++){
                    formData.append(this.currentImageFile[i].name, this.currentImageFile[0]);
                }

                // $.ajax({
                //     url: `/post/${this.$route.params.id}/comments/upload`,
                //     type: 'POST',
                //     // Form data
                //     data: formData,

                //     // Tell jQuery not to process data or worry about content-type
                //     // You *must* include these options!
                //     cache: false,
                //     contentType: false,
                //     processData: false,

                //     // Custom XMLHttpRequest
                //     xhr: function() {
                //         var myXhr = $.ajaxSettings.xhr();
                //         if (myXhr.upload) {
                //             // For handling the progress of the upload
                //             myXhr.upload.addEventListener('progress', function(e) {
                //                 if (e.lengthComputable) {
                //                     $('progress').attr({
                //                         value: e.loaded,
                //                         max: e.total,
                //                     });
                //                 }
                //             } , false);
                //         }
                //         return myXhr;
                //     },
                // });
            }
        },
        components:{
            ModalView
        }
    }
</script>

