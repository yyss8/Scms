<template>
    <div class='admin-user-profile-field'>
        <div class='container-fluid'>
            <br />
            <div class='input-group'>
                <label>
                    用户名:
                    <input class='form-control' v-model='username'/>
                </label>
            </div>
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
            <div class='input-group'>
                <label>
                    用户权限:
                    <select class="form-control" v-model='usertype'>
                        <option value='1'>管理员</option>
                        <option value='2'>普通用户</option>
                    </select>
                </label>
            </div>
        </div><br />
        <div class='admin-control-buttons'>
            <br />
            <div style='width:25%;'>
                <Result-View ref='resultView'></Result-View>    
            </div><br />
            <button class='btn btn-default' @click='save'>保存</button>
        </div>
    </div>
</template>

<script>

    import ResultView from "~/components/minorcomponents/resultview.vue";

    export default {
        async asyncData( {req,route,redirect} ){

            if ( req ) {
                const { user } = req.preLoad;
                if (user.status != "err"){
                    return {
                        username:user.username,
                        password:user.password,
                        email:user.email,
                        usertype:user.usertype
                    }
                }

                redirect("/error");
            }
            
            const { result } = await $.get(`/admin/users/profile/${route.params.user}/client`);

            return {
                username:result.username,
                password:result.password,
                email:result.email,
                usertype:result.usertype
            };
        },
        methods:{
            save(){
                const data = {
                    id:this.$route.params.user,
                    username:this.username,
                    password:this.password,
                    email:this.email,
                    usertype:this.usertype
                };

                $.ajax({
                    url: `/admin/users/profile/${this.$route.params.user}`,
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