<template>
    <span>
        <a><i class='fa fa-share' @click='shareArticle' style='font-size:20px;cursor:pointer'></i></a>
        <Modal-View ref='modalView'>
            <template scope='props'>
                <div class='scms-modal-header'>
                    <span>分享本文</span>
                    <button type="button" class='close' @click='props.toggle'>
                        <span>&times;</span>
                    </button>
                </div>
                <div class='scms-modal-body'>
                    <ul class="nav nav-tabs">
                            <li class="nav-item active">
                                <a class="nav-link" href="javascript:void(0)"><i class='fa fa-link'></i></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link share-btns" href="javascript:void(0)"><i class='fa fa-qq'></i></a>
                            </li>
                        <li class="nav-item">
                            <a class="nav-link share-btns" href="javascript:void(0)"><i class='fa fa-weixin'></i></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link share-btns" href="javascript:void(0)"><i class='fa fa-weibo'></i></a>
                        </li>
                    </ul>
                    <br />
                    <div>
                        <label>
                            复制本文地址:
                        </label>&nbsp;
                        <input :value='url' class='form-control' readonly/>
                    </div>
                </div>
                <div class='scms-modal-footer'>
                    <div class='scms-modal-footer-buttons'>
                        <button class='btn btn-primary' @click='props.toggle'>确定</button>
                    </div>
                </div>
            </template>
        </Modal-View>
    </span>

</template>

<script>
    import ModalView from "~components/minorcomponents/scmsmodal.vue";

    export default {
        props:[
            "id"  
        ],
        computed:{
            url(){
                return `http://${location.host}/articles/${this.id}`
            }
        },
        methods:{
            shareArticle(){
                this.$refs.modalView.toggle();
            }
        },
        components:{
            ModalView
        }
    }
</script>