<template>
    <div>
        <div class='input-group'>
            <input class='form-control' type="text" placeholder='点击浏览图片' readonly :value='unUploadedTitle'/>
            <span class='input-group-btn'>
                <button  class='btn btn-danger' v-if='unUploadedTitle !== ""' @click='preload.clearImages("unUploadedAttachments")'><i class='fa fa-trash'></i>&nbsp;清空</button>
                <button  class='btn btn-success' v-if='unUploadedTitle !== ""' @click='preload.onUpload()'><i class='fa fa-arrow-circle-o-up'></i>&nbsp;上传</button>
                <label for="_file" class='btn btn-default'><input type="file" @change="onImageChange" id="_file" style='display:none;' :multiple='preload.multiple' :accept='preload.accepts'/><i class='fa fa-folder-o'></i>&nbsp;浏览</label>
            </span>
        </div>
    </div>
</template>

<script>

    import ModalView from "~/components/minorcomponents/scmsmodal.vue";

    export default {
        props:[
            'preload','unUploaded','unUploadedTitle'
        ],
        methods:{
            onImageChange(e){

                const files = e.target.files || e.dataTransfer.files;

                if ( !files ){
                    return;
                }

                this.preload.appendImages( files );
                $("#_file").val('');
            }
        },
        components:{
            ModalView
        }
    }
</script>

