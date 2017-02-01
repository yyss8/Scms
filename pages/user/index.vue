<template>

    <div>
        <h2>{{ b }}</h2>
        <h2>{{ c }}</h2>
        <button @click='abc'>login</button>
        <button @click='add'>add</button>
    </div>
</template>

<script>

    import store from "../../store/index";
    export default {
        data(context){
            return {
                b: (context.isServer) ? 'server' : 'client',
                c: context.req.session.auth
            }
        },
        store,
        computed:{
            count(){
                return store.state.count
            }
        },
        methods:{
            abc(){
                $.get('/user/login/yyss8').done(result =>{
                    alert("ok");
                });
            },
            add(){
                console.log(this);
            }
        }
    }

</script>
