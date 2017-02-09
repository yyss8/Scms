<template>
    <div class='container-fluid'>
        <br />
        <table class="table table-striped">
            <thead>
            <tr>
                <th>导航名称</th>
                <th class='text-center'>导航可见</th>
                <th class='text-center'>标题可见</th>
                <th>标题名称</th>
                <th class='text-center'>游客可见</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <th>心情随言</th>
                    <th class='text-center'><input type='checkbox' v-model='SelfMotto.display' /></th>
                    <th class='text-center'><input type='checkbox' v-model='SelfMotto.showTitle' /></th>
                    <th><input class='form-control' v-model='SelfMotto.title' style='margin-top:-3px;' /></th>
                    <th class='text-center'><input type='checkbox' v-model='SelfMotto.onlyAdmin' /></th>
                    <th class='text-center'><button class='btn btn-default' style='margin-top:-3px;' @click='modify("SelfMotto")'>编辑</button></th>
                </tr>
                <tr>
                    <th>个人介绍</th>
                    <th class='text-center'><input type='checkbox' v-model='SelfIntro.display' /></th>
                    <th class='text-center'><input type='checkbox' v-model='SelfIntro.showTitle' /></th>
                    <th><input class='form-control' v-model='SelfIntro.title' style='margin-top:-3px;' /></th>
                    <th class='text-center'><input type='checkbox' v-model='SelfIntro.onlyAdmin' /></th>
                    <th class='text-center'><button class='btn btn-default' style='margin-top:-3px;' @click='modify("SelfIntro")'>编辑</button></th>
                </tr>
                <tr>
                    <th>快捷按键</th>
                    <th class='text-center'><input type='checkbox' v-model='QuickBtns.display' /></th>
                    <th class='text-center'><input type='checkbox' v-model='QuickBtns.showTitle' /></th>
                    <th><input class='form-control' v-model='QuickBtns.title' style='margin-top:-3px;' /></th>
                    <th class='text-center'><input type='checkbox' v-model='QuickBtns.onlyAdmin' /></th>
                    <th class='text-center'><button class='btn btn-default' style='margin-top:-3px;' @click='modify("QuickBtns")'>编辑</button></th>
                </tr>
            </tbody>
        </table>

        <div class='admin-category-controls'>
            <br />
            <Result-View ref='resultView'></Result-View>
            <span class='pull-right'>
                <button class='btn btn-default' onclick='window.location.reload();' title='重置快捷栏'>重置</button>&nbsp;&nbsp;
                <button class='btn btn-default' @click='save' title='保存快捷栏'>保存</button>
            </span>
        </div>

        <Modal-View ref='modalView'>
            <template scope='props'>
                <div class='scms-modal-header'>
                    <span>{{modifyingName}}</span>
                    <button type="button" class='close' @click='props.toggle'>
                        <span>&times;</span>
                    </button>
                </div>
                <div class='scms-modal-body'>

                    <div v-if='modifyingName === "心情随言"'>
                        <label>内容</label>
                        <input v-model='SelfMotto.content' class='form-control' />
                    </div>

                    <div v-if='modifyingName === "个人介绍"'>
                        <div class="input-group">
                            <span class="input-group-addon">
                                显示名字
                                <input type="checkbox" v-model='SelfIntro.showName'>
                            </span>
                            <input type="text" class="form-control" v-model='SelfIntro.name'>
                        </div><br />
                        <div class="input-group">
                            <span class="input-group-addon">
                                显示邮箱
                                <input type="checkbox" v-model='SelfIntro.showEmail'>
                            </span>
                            <input type="text" class="form-control" v-model='SelfIntro.email'>
                        </div><br />
                        <div class="input-group">
                            <span class="input-group-addon">
                                显示地区
                                <input type="checkbox" v-model='SelfIntro.showLocation'>
                            </span>
                            <input type="text" class="form-control" v-model='SelfIntro.location'>
                        </div><br />
                        <div>
                            <span>显示介绍</span>&nbsp;&nbsp;
                            <input type="checkbox" v-model='SelfIntro.showIntros' /><br />
                            <textarea v-model='SelfIntro.intros' class='form-control' style='max-width:580px'></textarea>
                        </div>

                        <div class="checkbox">
                            <label>
                                <input type="checkbox" v-model='SelfIntro.showQQ'>
                                启用QQ二维码
                            </label>&nbsp;&nbsp;&nbsp;
                            <label>
                                <input type="checkbox" v-model='SelfIntro.showWechat'>
                                启用微信二维码
                            </label>
                        </div>
                        <div class="input-group">
                            <span class="input-group-addon">
                                启用微博
                                <input type="checkbox" v-model='SelfIntro.showWeibo'>
                            </span>
                            <input type="text" class="form-control" v-model='SelfIntro.weiboLink' placeholder="微博地址">
                        </div><br />
                        <div class="input-group">
                            <span class="input-group-addon">
                                启用 Facebook
                                <input type="checkbox" v-model='SelfIntro.showFacebook'>
                            </span>
                            <input type="text" class="form-control" v-model='SelfIntro.facebookLink' placeholder="Facebook地址">
                        </div><br />
                        <div class="input-group">
                            <span class="input-group-addon">
                                启用 Linkedin
                                <input type="checkbox" v-model='SelfIntro.showLinkedin'>
                            </span>
                            <input type="text" class="form-control" v-model='SelfIntro.linkedinLink' placeholder="Linkedin地址">
                        </div><br />
                    </div>

                    <div v-if='modifyingName === "快捷按键"'>
                        <span>
                            发布文章&nbsp;&nbsp;
                            <input type="checkbox" v-model='QuickBtns.quickPost'>
                        </span>
                    </div>
                </div>
                <div class='scms-modal-footer'>
                    <div class='scms-modal-footer-buttons'>
                        <button class='btn btn-primary' @click='props.toggle'>确定</button>
                    </div>
                </div>
            </template>
        </Modal-View>
    </div>
</template>

<script>

    import ResultView from "~components/minorcomponents/resultview.vue";
    import ModalView from "~components/minorcomponents/scmsmodal.vue";

    export default {
        data({store}){
            return {
                SelfMotto:store.state.sideBarComps.SelfMotto,
                SelfIntro:store.state.sideBarComps.SelfIntro,
                QuickBtns:store.state.sideBarComps.QuickBtns,
                modifyingName:"",
            }
        },
        methods:{
            modify(modifyType){
                if (modifyType == "SelfMotto"){
                    this.modifyingName = "心情随言"
                }else if (modifyType == "SelfIntro"){
                    this.modifyingName = "个人介绍"
                }else{
                    this.modifyingName = "快捷按键"
                }
                this.$refs.modalView.toggle();
            },
            save(){
                const data = {
                    SelfMotto:this.SelfMotto,
                    SelfIntro:this.SelfIntro,
                    QuickBtns:this.QuickBtns
                }
                $.ajax({
                    url: `/admin/nav/sidebar`,
                    type:"PUT",
                    contentType: "application/json",
                    data: JSON.stringify(data),
                    success: (result)=>{
                        if (result.status == "ok"){
                            this.$refs.resultView.sendMsg(result.content,"success");
                        }else{
                            this.$refs.resultView.sendMsg(result.content,"error");
                        }
                    }
                });
            }
        },
        components:{
            ResultView,
            ModalView
        }
    }
</script>