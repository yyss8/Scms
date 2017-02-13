<template>
    <div class="modal fade" id="confirmMsg" tabindex="-1" role="dialog" aria-labelledby="confirmMsgLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <span>确认框</span>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>{{confirmTxt}}</p>
                </div>
                <div class="modal-footer">
                    <Result-View ref='resultView' style='float:left'></Result-View>
                    <button type="button" class="btn btn-primary" @click='sendAction'>确定</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import ResultView from "./resultview.vue";

    export default {
        
        data(){
            return {
                confirmTxt:"",
                pendingAction:"",
                pendingAjax:{}
            }
        },
        methods:{
            getAction(txt,action){
                this.confirmTxt = txt;
                this.pendingAction = action;
            },
            sendAction(){
                this.pendingAction();
                $("#confirmMsg").modal('toggle');
            },
            onResult(content,t){
                this.$refs.resultView.sendMsg(content,t);
            }
        },
        components:{
            ResultView
        }
    }
</script>