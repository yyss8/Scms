<template>
    <div>
        <div class='input-group'>
            <input class='form-control' type="text" placeholder='点击浏览图片' readonly :value='currentFilesName'/>
            <span class='input-group-btn'>
                <button  class='btn btn-danger' v-if='currentImageFile != ""' @click='deleteUploadingFile'><i class='fa fa-trash'></i>&nbsp;删除</button>
                <button  class='btn btn-success' v-if='currentImageFile != ""'><i class='fa fa-arrow-circle-o-up'></i>&nbsp;上传</button>
                <label for="file" class='btn btn-default'><input type="file" @change="onImageChange" id="file" style='display:none;' multiple/><i class='fa fa-folder-o'></i>&nbsp;浏览</label>
            </span>
        </div>
        <div class='file-upload-preview'>
            <div class='container-fluid'>
                <p v-for='(img,index) in images'>{{index + 1}}. {{img.name}} <a href='javascript:void(0)' @click='preview(index)'>预览</a> {{img.src.includes('$ul') ? "未上传":""}}</p>
            </div>
        </div>
        <Modal-View ref='modalView' :modalWidth='previewImgSize'>
            <div class='scms-modal-header'>
                图片预览
            </div>
            <div class='scms-modal-body' style='text-align:center;'>
                <img :src='previewingImgSrc'>
            </div>
        </Modal-View>
    </div>
</template>

<script>

    import ModalView from "~components/minorcomponents/scmsmodal.vue";

    export default {
        data(){
            return {
                currentImageFile:"",
                exisitedImgs:[],
                previewingImgSrc:"",
                previewImgSize:""
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
            },
            images(){
                let imgAry = this.exisitedImgs.slice();
                for (let i = 0;i<this.currentImageFile.length;i++){
                    imgAry.push({
                        name:this.currentImageFile[i].name,
                        src:`$ul${i}`
                    });
                }
                return imgAry
            }
        },
        methods:{
            onImageChange(e){
                this.currentImageFile = e.target.files || e.dataTransfer.files;
            },
            deleteUploadingFile(){
                $('#file').wrap('<form>').closest('form').get(0).reset();
                $("#file").unwrap();
                this.currentImageFile = "";
                this.uploadingImages.length = 0;
            },
            preview(index){
                this.$refs.modalView.toggle();
                let _this = this;
                if (this.images[index].src.includes('$ul')){
                    const fileReader = new FileReader();
                    fileReader.onload = e => {
                        var image = new Image();
                        image.src = e.target.result;
                        image.onload = function() {
                            // access image size here 
                            _this.previewImgSize = `${this.width + 100}px`;
                        };
                        _this.previewingImgSrc = e.target.result;
                    };
                    fileReader.readAsDataURL(this.currentImageFile[Number(this.images[index].src.replace('$ul',""))]);
                }else{
                    this.previewingImgSrc = this.images[index].src;
                }
            }
        },
        components:{
            ModalView
        }
    }
</script>

<style>
    .file-upload-preview{
        margin-top:5px;
        border-radius: 5px;
        border:1px solid lightgray;
    }
</style>