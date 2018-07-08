<template>
    <div>
        <div class='panel panel-default'>
            <div class='panel-heading' v-if='$store.state.sideBarComps.QuickBtns.showTitle'>
                {{$store.state.sideBarComps.QuickBtns.title}}
            </div>
            <div class='quick-btns' v-if='$store.state.sideBarComps.QuickBtns.quickPost'>
                <button class='btn btn-default' data-toggle="modal" data-target="#quickPostField">发布文章</button>
            </div>
        </div>
        <div class="modal fade" id="quickPostField" tabindex="-1" role="dialog" aria-labelledby="quickPostFieldLabel">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <Post-Editor :submit='submit' :preLoads='editLoads'>
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" v-model='allowComments'/>允许评论
                            </label>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <label>
                                <input type="checkbox" v-model='allowSubComments'/>允许子评论
                            </label>
                        </div>
                    </Post-Editor>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PostEditor from "../minorcomponents/posteditor.vue";

    export default {
        data(){
            return {
                editLoads:{
                    hasCategory:true,
                    categoryList:this.$store.state.postCategories,
                    submit:this.submit,
                    cancel:this.cancel
                },
                allowComments:true,
                allowSubComments:true
            }
        },
        components:{
            PostEditor
        },
        methods:{
            submit(data,onResult){
                const postData = Object.assign(data,{
                    allowComments:this.allowComments,
                    allowSubComments:this.allowSubComments
                });

                const url = '/post';
                this.$scms.Request.postJson( data, url )
                                  .then( res =>{
                                      if ( res.status === 'ok' ){
                                          onResult(res.content,"success");
                                          location.href = "/pages/1";
                                      }else{
                                          onResult(res.content,"error");
                                      }
                                  });
            },
            cancel(){
                $("#quickPostField").modal('hide');
            }
        }
    }
</script>