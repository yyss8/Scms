<template>
    <div class='header_search'>
        <div class="input-group">
            <input type="text" class="form-control" placeholder="搜索" v-model='kyWrds'>
            <span class="input-group-btn">
                <button class="btn btn-default" v-if='removeBtn ' type="button" @click='clear'><i class="fa fa-remove"></i></button>
                <button class="btn btn-default" type="button" @click='search'><i class="fa fa-search"></i></button>
                <button class='btn btn-default' data-toggle="modal" data-target="#settingField"><i class='fa fa-gear'></i></button>
            </span>
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
        methods:{
            search(){
                const keywords = this.kyWrds.replace(" ","+");
                this.$router.push(`/keywords/${keywords}/pages/1`);
            },
            clear(){
                this.kyWrds = "";
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