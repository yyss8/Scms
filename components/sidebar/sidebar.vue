<template>
    <div>
        <Self-Motto v-if='SelfIntro'></Self-Motto>
        <Self-Intro v-if='SelfMotto'></Self-Intro>
        <Quick-Btns v-if='isLogin && QuickBtns'></Quick-Btns>
    </div>
</template>

<script>
    import SelfIntro from "./selfintros.vue";
    import SelfMotto from "./selfmotto.vue";
    import QuickBtns from "./quickbtns.vue";

    export default {
        data(){
            return {
                SelfIntro:false,
                SelfMotto:false,
                QuickBtns:false
            }
        },
        props:[
            'comps'
        ],
        computed:{
            isLogin(){
                return this.$store.state.isLogin
            },
            sideBarComps(){
                return this.$store.state.sideBarComps
            }
        },
        components:{
            SelfIntro,
            SelfMotto,
            QuickBtns
        },
        methods:{
            show(){
                console.log(this.compss);
            }
        },
        watch:{
            sideBarComps(){
                //根据后台设置加载sidebar组件
                for (let comp in this.sideBarComps){
                    if (this.sideBarComps[comp].display){
                        this[comp] = true;
                    }
                }
            }
        }
    }
</script>

<style>
    .sidebar{
        background-color: white;
    }
</style>