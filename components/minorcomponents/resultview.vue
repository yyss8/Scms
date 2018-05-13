<template>
    <transition name="fade">
        <div class='alert' :class='{"alert-success":successMsg,"alert-danger":errMsg}' style='padding:10px;' v-if='hasMsg'>
            <i class='fa' :class='{"fa-check":successMsg,"fa-exclamation":errMsg}'></i>&nbsp;&nbsp;{{resultMsg}}
        </div>
    </transition>
</template>

<script>
    export default {
        data(){
            return {
                resultMsg:"",
                hasMsg:false,
                errMsg:false,
                successMsg:false,
                timeout:""
            }
        },
        methods:{
            sendMsg(txt,msgType){
                this.resultMsg = txt;
                this.dismissMsg(msgType);
            },
            dismissMsg(msgType){
                clearTimeout(this.timeout);
                if (msgType == "error"){
                    let _this = this;
                    this.errMsg = true;
                    this.timeout = setTimeout(() => {
                        _this.resultMsg = "";
                        _this.errMsg = false;
                    },2500);
                }else if (msgType == "success"){
                    let _this = this;
                    this.successMsg = true;
                    this.timeout = setTimeout(() => {
                        _this.resultMsg = "";
                        _this.successMsg = false;
                    },2500);
                }         
            },
            clearMsg(){
                if (this.resultMsg != ""){
                    clearTimeout(this.timeout);
                    this.resultMsg = "";
                    this.errMsg = false;
                    this.successMsg = false;
                }
            }
        },
        watch:{
            resultMsg(){
                if (this.resultMsg != ""){
                    this.hasMsg = true;
                }else{
                    this.hasMsg = false;
                    this.errMsg = false;
                    this.successMsg = false;
                }
            }
        }
    }
</script>