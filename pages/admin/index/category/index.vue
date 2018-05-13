<template>
    <div class='container-fluid'>
        <br />
        <div class='admin-category-links'>
            <div class='row'>
                <div class='col-md-3'><span>导航名称</span></div>
                <div class='col-md-4'><span>导航地址</span></div>
                <div class='col-md-2'><span>导航图标</span></div>
                <div class='col-md-2'><span>多级导航</span></div>
            </div>
            <div v-for='(link,index) in links' class='admin-category-linkInfo' :key='`link-${index}`'>
                <div class='row'>
                    <div class='col-md-3'><input placeholder='名称' v-model='link.name' class='form-control'/></div>
                    <div class='col-md-4'><input placeholder='地址' v-model='link.url' class='form-control'/></div>
                    <div class='col-md-2'><input placeholder='图标' v-model='link.icon' class='form-control'/></div>
                    <div class='col-md-3'>
                        <input type='checkbox' v-model='link.hasSub' style='margin-top:11px;margin-left:30px;'/>
                        <div class='pull-right'>
                            <button v-if='index != 0' class='btn btn-default btn-sm' @click='moveUp(index)' title='导航向上'><i class='fa fa-chevron-up'></i></button>
                            <button v-if='index != links.length - 1' class='btn btn-default btn-sm' @click='moveDown(index)' title='导航向下'><i class='fa fa-chevron-down'></i></button>
                            <button v-if='link.hasSub' class='btn btn-default btn-sm' @click='addSubLink(index)' title='添加副导航'><i class='fa fa-plus'></i></button>
                            <button class='btn btn-default btn-sm' @click='removeLink(index)' title='删除导航'><i class='fa fa-trash'></i></button>
                        </div>
                    </div>
                </div>
                <div class='row' v-if='link.hasSub' v-for='(sub,subindex) in link.subLinks' :key='`sub-link-${subindex}`'>
                    <div class='col-sm-3'>
                        <div class='col-sm-2'><label><img src='/images/nav.png' /></label></div>
                        <div class='col-sm-10'>
                            <input v-model='sub.name' class='form-control' />
                        </div>
                    </div>
                    <div class='col-sm-4'>
                        <div class='col-sm-12'>
                            <input v-model='sub.url' class='form-control' />
                        </div>
                    </div>
                    <div class='col-sm-4'>
                        <div class='col-sm-12'>
                            <button class='btn btn-default ' @click='removeSubLinks(index,subindex)' title='删除副导航'><i class='fa fa-times'></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div class='admin-category-controls'>
                <br />
                <Result-View ref='resultView'></Result-View>
                <span class='pull-right'>
                    <button class='btn btn-default' @click='addNav'>添加导航</button>&nbsp;&nbsp;
                    <button class='btn btn-default' onclick='window.location.reload();' >重置导航</button>&nbsp;&nbsp;
                    <button class='btn btn-default' @click='saveNav'>保存导航</button>
                </span>
            </div>
        </div>
        <Confirm-View ref='confirmView'></Confirm-View>
    </div>
</template>

<script>

    import ResultView from "~/components/minorcomponents/resultview.vue";
    import ConfirmView from "~/components/minorcomponents/confirmview.vue";

    export default {
        
        data(){
            return {
                links:this.$store.state.headerLink
            }
        },
        methods:{
            removeSubLinks(index,subindex){
                this.links[index].subLinks.splice(subindex,1);
            },
            removeLink(index){
                const link = this.links;
                this.$refs.confirmView.getAction("是否删除该导航",function (){
                    link.splice(index,1);
                });
                $("#confirmMsg").modal('toggle');
            },
            addNav(){
                this.links.push({
                    name:"",
                    url:"",
                    icon:"",
                    hasSub:false,
                    subLink:[]
                });
            },
            addSubLink(index){
                this.links[index].subLinks.push({
                    name:"",
                    url:""
                });
            },
            saveNav(){
                const data = {
                    links:this.links
                }

                $.ajax({
                    url: `/admin/nav/headers`,
                    type:"PUT",
                    contentType: "application/json",
                    data: JSON.stringify(data),
                    success: (result)=>{
                        this.$store.commit('updateHeaderLinks',this.links);
                        this.$refs.resultView.sendMsg(result.content,"success");
                    },
                    error: err => {
                        this.$refs.resultView.sendMsg(err.responseJSON.content,"error");
                    }
                });
            },
            moveUp(index){
                const temp = this.links[index];
                this.links.splice(index, 1, this.links[index - 1]);
                this.$set(this.links, index - 1, temp);
            },
            moveDown(index){
                const temp = this.links[index];
                this.links.splice(index, 1, this.links[index + 1]);
                this.$set(this.links, index + 1, temp);
            }
        },
        components:{
            ResultView,
            ConfirmView
        }
    }
</script>