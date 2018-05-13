<template>
    <div>
        <header class="navbar navbar-default header-nav">
            <Header-View></Header-View>
        </header>
        <Header-Nav></Header-Nav>
        <div class='mainContent'>
            <div class='row'>
                <div class='col-md-9'>
                    <nuxt-child></nuxt-child>
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
        data(){
            return {

            }
        },
        components:{
            HeaderView,
            FooterView,
            SideBar,
            HeaderNav
        }
    }
</script>