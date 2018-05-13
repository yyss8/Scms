<template>
    <div>
        <header class="navbar navbar-default header-nav">
            <Header-View></Header-View>
        </header>
        <Header-Nav></Header-Nav>
        <div class='mainContent'>
            <div class='row'>
                <div class='col-md-9'>
                    <router-view></router-view>      
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
    import SideBar from "../components/sidebar/sidebar.vue";
    import HeaderNav from "../components/header/headernavlist.vue";

    export default {
        fetch({redirect,route}){
            if (route.path == "/"){
                redirect('/pages/1');
            }
        },
        components:{
            HeaderView,
            FooterView,
            SideBar,
            HeaderNav
        },
        head(){
            return {
                title:`${this.$store.state.blogTitle} | ${this.$store.state.blogScnTitle}`,
                meta: [
                    {charset:'utf-8'},
                    { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1,minimum-scale=1' },
                    { name: 'description', content: this.$store.state.blogDescription },
                    { name:'keywords', content: this.$store.state.blogKyWrds },
                    { name:'author', content: this.$store.state.blogAuthor}

                ],
                metaInfo: {
                    base: { target: '_blank', href: '/' }
                }
            }
        }
    }

</script>
