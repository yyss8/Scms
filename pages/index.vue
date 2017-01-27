<template>

    <div>
        <header class="navbar navbar-default header-nav">
            <Header-View></Header-View>
        </header>
        
        <div class='mainContent'>
            <div class='row'>
                <div class='col-md-9'>
                    <Main-Content></Main-Content>
                </div>
                <div class='col-md-3'>
                    <Side-Bar></Side-Bar>
                </div>
            </div>
        </div>
        <footer class='footer'>
            <Footer-View></Footer-View>
        </footer>
    </div>
</template>

<script>
    import HeaderView from "../components/header.vue";
    import FooterView from "../components/footer.vue";
    import MainContent from "../components/articlecontent/articlecontent.vue";
    import SideBar from "../components/sidebar/sidebar.vue";
    import axios from "axios";
    

    export default {
        data(context){
            return {
                loginUser:(context.req && context.req.session.user !== undefined) ? context.req.session.user:"none",
            }
        },
        mounted(){
            $.get('/setting/all',result =>{
                this.$store.commit('loadSetting',result.settings);
            });
            if (this.loginUser != "none"){
                //pass login status to store
                this.$store.commit("login",this.loginUser);
            }
        },
        methods:{
            ccc:function(){
                console.log(this.$store);
            }
        },
        components:{
            HeaderView,
            FooterView,
            MainContent,
            SideBar
        },
        head:{
            script:[
                {src:'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'},
                {src:'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'}
            ]
        }
    }

</script>


<style>

    .mainContent{
        position: relative;
        top:15px;
        margin:0 auto;
        width:70%;
        min-height:79.2vh;
    }

    a{
        text-decoration: none;
        color:#6FBADE;
    }

    a:hover{
        color:#4673F8;
    }

    .navbar{
        margin-bottom: 0;
    }

    body{
        font-family: "微软雅黑";
        background-color:#F2F2F2;
        padding:0;
        margin:0;
    }

    .header-nav{
        padding-top:20px;
        background-color:#6FBADE;
    }

    footer{
        background-color:#95C2D8;
        position:relative;
        bottom: 0;
        margin-top:10px;
        width: 100%;
        height: 80px;
        line-height: 80px;
        color:white;
    }

    @media only screen and (max-width: 991px){
        .mainContent{
            width:95%;
        }
    }
</style>