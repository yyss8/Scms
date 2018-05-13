<template>
    <div>
        <div class='file-upload-preview' v-if='images.length != 0'>
            <ul v-for='(img,index) in images' class='list-group' :key='`image-${index}`'>
                <li class="list-group-item">
                    {{index + 1}}. {{img.name}} 
                    <a href='javascript:void(0)' class='btn btn-default btn-sm' @click='preview(index)'>预览</a>
                    <b class='pull-right' style='font-size:120%' :style='{color:img.src.includes("$ul") ? "#d9534f":"#5cb85c"}'>{{img.src.includes('$ul') ? "未上传":"已上传"}}</b>
                </li>
            </ul>
        </div>
        <Modal-View ref='modalView' :modalWidth='previewImgSize'>
            <template slot-scope='props'>
                <div class='scms-modal-header'>
                    图片预览
                    <button type="button" class='close' @click='props.toggle'>
                        <span>&times;</span>
                    </button>
                </div>
                <div class='scms-modal-body' style='text-align:center;'>
                    <img :src='previewingImgSrc'>
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
            "preload"
        ],
        data(){
            return {
                exisitedImgs:[],
                previewingImgSrc:"",
                previewImgSize:""
            }
        },
        computed:{
            images(){
                let imgAry = this.preload.existingImgs.slice();
                for (let i = 0;i < this.preload.newImgs.length;i++){
                    imgAry.push({
                        name:this.preload.newImgs[i].name,
                        src:`$ul${i}`
                    });
                }
                return imgAry
            }
        },
        methods:{
            preview(index){
                let _this = this;
                if (this.images[index].src.includes('$ul')){
                    const fileReader = new FileReader();
                    fileReader.onload = e => {
                        var image = new Image();
                        image.src = e.target.result;
                        image.onload = function() {
                            //获得图片宽度
                            _this.previewImgSize = `${this.width + 100}px`;
                            _this.$refs.modalView.toggle();
                        };
                        _this.previewingImgSrc = e.target.result;
                    };
                    fileReader.readAsDataURL(this.preload.newImgs[Number(this.images[index].src.replace('$ul',""))]);
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
        margin-top:15px;
    }
</style>