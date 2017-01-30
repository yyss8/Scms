<template>
    <div class='header_search'>
        <div class="input-group">
            <input type="text" class="form-control" placeholder="搜索" v-model='kyWrds'>
            <div class="input-group-btn">
                <button class="btn btn-default" type="button"><i class="fa fa-search"></i></button>
                <button class="btn btn-default" v-if='removeBtn ' type="button"><i class="fa fa-remove"></i></button>
                <button class='btn btn-default' data-toggle="modal" data-target="#settingField"><i class='fa fa-gear'></i></button>
            </div>
        </div>
    </div>
</template>

<script>



    export default {
        data () {
            return {
                kyWrds:'',
                schAlert:'',
                schAlertHid:false,
                removeBtn:false,
                users:[]
            }
        },
        watch:{
            kyWrds(){
                if (this.kyWrds.length != 0){
                    this.removeBtn = true;
                }else{
                    this.removeBtn = false;
                }
            }
        }
    }
</script>

<style>

</style>