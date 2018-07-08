<template>
    <div>
        <h6>附件</h6>
        <div class='file-upload-preview' v-if='images.length > 0'>
            <ul class='list-group'>
                <li class="list-group-item" v-for='(img,index) in images'  :key='`image-${index}`'>
                    <span>
                        {{index + 1}}. {{img.name}} &nbsp;&nbsp;
                        <button class='btn btn-default btn-sm' @click='preview(index)'>预览</button>&nbsp;&nbsp;
                        <button class='btn btn-success btn-sm' v-if='!img.isUploaded' @click='onUpload( $event, img.imgIndex )'>上传</button>
                        <button class='btn btn-default btn-sm' v-else @click='onUseImage(img.imgIndex)'>使用</button>&nbsp;&nbsp;
                        <button class='btn btn-danger btn-sm' @click='removeImage(img.imgIndex, img.isUploaded ? "uploadedAttachments":"unUploadedAttachments")'>删除</button>
                    </span>
                    <b class='pull-right upload-status' :style='{color:!img.isUploaded ? "#d9534f":"#5cb85c"}'>{{!img.isUploaded ? "未上传":"已上传"}}</b>
                </li>
            </ul>
        </div>
        <div v-else>
            <span>尚无任何附件</span>
        </div>
        <Modal-View ref='modalView' :modalWidth='previewImgSize'>
            <template slot-scope='props'>
                <div class='scms-modal-header'>
                    图片预览
                    <button type="button" class='close' @click='props.toggle'>
                        <span>&times;</span>
                    </button>
                </div>
                <div class='scms-modal-body'>
                    <img :src='previewingImgSrc' width='500'>
                </div>
                <div class='scms-modal-footer'>
                    <div class='scms-modal-footer-buttons'>
                        <button class='btn btn-primary' @click='props.toggle'>返回</button>
                    </div>
                </div>
            </template>
        </Modal-View>
    </div>
</template>

<script>

    import ModalView from "~/components/minorcomponents/scmsmodal.vue";

    export default {
        props:[
            "previewImages","removeImage", "onUpload", 'onUseImage'
        ],
        data(){
            return {
                previewingImgSrc:"",
                previewImgSize:""
            }
        },
        computed:{
            images(){
                return [
                    ...this.previewImages.unUploadedAttachments.map( (file, index) => ({ name:file.name, url:URL.createObjectURL( file ), isUploaded:false, imgIndex:index }) ),
                    ...this.previewImages.uploadedAttachments.map( (imageObj, index) =>{
                        return {    
                            name:imageObj.key,
                            url:`${imageObj.env === 'prod' ? process.env.OSS_SRC:process.env.OSS_SRC_TEMP}/${imageObj.key}`,
                            isUploaded:true,
                            imgIndex:index
                        };
                    })
                ];
            }
        },
        methods:{
            preview(index){
                this.previewingImgSrc = this.images[index].url;
                this.$refs.modalView.toggle();
            }
        },
        components:{
            ModalView
        }
    }
</script>

<style>

    .scms-modal-body{
        text-align: center;
    }

    .list-group{
        border-radius: 3px;
        border:1px solid lightgray;
    }

    .upload-status{
        font-size: 15px;
    }

    .file-upload-preview{
        margin-top:15px;
    }

    .list-group-item{
        border:none;
        margin-bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>