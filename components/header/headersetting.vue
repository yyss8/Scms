<template>
    <div class='container-fluid'>
        <div>
            <br />
            <label>用户名: {{username}}</label><br />
            <div class='input-group'>
                <label>
                    密码:
                    <input type='password' class='form-control' v-model='password'/>
                </label>
            </div>
            <div class='input-group'>
                <label>
                    邮箱:
                    <input type='email' class='form-control' v-model='email'/>
                </label>
            </div>
        </div><br />
        <div class='quick-setting-view'>
            <Result-View ref='resultView'></Result-View>
            <span class='quick-setting-view-btns'>
                <button class='btn btn-default btn' @click='toAdmin' v-if='$store.state.user.usertype == 1'><i class='fa fa-gear'></i>&nbsp;管理</button>&nbsp;&nbsp;
                <button class='btn btn-default btn' @click='save'><i class='fa fa-save'></i>&nbsp;保存</button>&nbsp;&nbsp;
                <button class='btn btn-default btn' onclick="window.location='/user/logout'"><i class='fa fa-sign-out'></i>&nbsp;注销</button>
            </span>
        </div>
        <br /><br /><br />
    </div>
</template>

<script>

    import ResultView from "~/components/minorcomponents/resultview.vue";

    export default {
        data(){
            return {
                username:this.$store.state.user.username,
                password:this.$store.state.user.password,
                email:this.$store.state.user.email
            }
        },
        methods:{
            toAdmin(){
                location.href = "/admin/general";
            },
            save(){
                const data = {
                    id:this.$store.state.user._id,
                    password:this.password,
                    email:this.email
                };
                $.ajax({
                    url: `/user/${this.$store.state.user._id}`,
                    type:"PUT",
                    contentType: "application/json",
                    data: JSON.stringify(data),
                    success: (result)=>{
                        
                        this.$refs.resultView.sendMsg(result.content,"success");
                    },
                    error: err => {
                        this.$refs.resultView.sendMsg(err.responseJSON.content,"error");
                    }
                });
            }
        },
        components:{
            ResultView
        }
    }
</script>
