<template>
    <ul id='header_phone_navList'>
        <li v-for='link in headerLink'>
            <button class="navbtn" @click='onBtnClick(link)'><i v-if='link.icon !== ""' class='fa' :class='link.icon'>&nbsp;&nbsp;&nbsp;</i><b style='position: relative;top:-2px'>{{link.name}} <span class='caret' v-if='link.hasSub'></span></b></button>
            <ul class='sub_Nav_List' v-if='link.hasSub' :id='subNavId'>
                <button class='navbtn' v-for='sub in link.subLinks' @click='onSubClick(sub.url)'><b>{{sub.name}}</b></button>
            </ul>
        </li>
        <li class="dropdown_divider"></li>
        <li style='padding:15px;'>
            <Search-Bar></Search-Bar>
        </li>
    </ul>
</template>

<script>
    import SearchBar from "./searchBar.vue";
    export default {
        data(){
            return {
                subNavNum:0
            }
        },
        computed:{
            headerLink(){
                return this.$store.state.headerLink
            }
        },
        methods:{
            onBtnClick(link){
                if (link.hasSub){
                    this.openSub();
                }else if (link.url != ""){
                    window.location=link.url;
                }
            },
            subNavId(){
                this.subNavNum += 1;
                return "subnav" + this.subNavNum.toString()
            },
            onSubClick(url){
                window.location = url;
            },
            openSub(){
                $('.sub_Nav_List').animate({height: 'toggle'});
            }
        },
        components:{
            SearchBar
        }
    }
</script>

<style>

</style>