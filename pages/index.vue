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
        <script src='/js/jquery-3.1.1.min.js'></script>
        <script src='/js/bootstrap.min.js'></script>
    </div>
</template>

<script>
    import HeaderView from "../components/header.vue";
    import FooterView from "../components/footer.vue";
    import MainContent from "../components/articlecontent/articlecontent.vue";
    import SideBar from "../components/sidebar/sidebar.vue";
    import store from "../store/index";

    export default {
        data({req}){
            return {
                loginUser:(req && req.session.user !== undefined) ? req.session.user:"none"
            }
        },
        store,
        mounted(){
            if (this.loginUser != "none"){
                //pass login status to store
                store.commit("login",this.loginUser);
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
        watch:{
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