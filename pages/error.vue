<template>
    <div>
        <header class="navbar navbar-default header-nav">
            <Header-View></Header-View>
        </header>
        <Header-Nav></Header-Nav>
        <div class='mainContent'>
            <div class='row'>
                <div class='col-md-9'>
                    <div class='panel panel-info'>
                        <div class='panel-body'>
                            <br />
                            <div class='article-title'>
                                <a href='javascript:void(0)'> ERROR ~ !!!!!</a>
                            </div>
                            <div class='article-content'>
                                <div class='text-center'>
                                    <h2>出现错误</h2><br />
                                    <h3>这个页面可能不存在</h3><br />
                                    <nuxt-link :to="{path:'/pages/1'}">点击返回首页</nuxt-link>
                                </div>
                            </div>
                        </div>
                    </div>
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
        data({req,redirect}){

        },
        components:{
            HeaderView,
            FooterView,
            SideBar,
            HeaderNav
        },
        head(){
            return {
                title:`错误页面 | ${this.$store.state.blogTitle} | ${this.$store.state.blogScnTitle}`,
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