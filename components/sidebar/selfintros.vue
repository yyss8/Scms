<template>
    <div class='panel panel-default'>
        <div class='panel-heading' v-if='$store.state.sideBarComps.SelfIntro.showTitle'>
            {{$store.state.sideBarComps.SelfIntro.title}}
        </div>
        <div class='panel-body'>
            <div class='self-intro-content'>
                <div class='self-intro-content-name' v-if='$store.state.sideBarComps.SelfIntro.showName'>
                    {{$store.state.sideBarComps.SelfIntro.name}}
                </div>
                <div v-if='$store.state.sideBarComps.SelfIntro.showEmail'>
                    <i class='fa fa-envelope-o'></i><span><a :href="sendEmail">{{$store.state.sideBarComps.SelfIntro.email}}</a></span>
                </div>
                <div v-if='$store.state.sideBarComps.SelfIntro.showLocation'>
                    <i class='fa fa-drivers-license-o'></i><span>{{$store.state.sideBarComps.SelfIntro.location}}</span>
                </div>
                <div v-if='$store.state.sideBarComps.SelfIntro.showIntros'>
                    {{$store.state.sideBarComps.SelfIntro.intros}}
                </div>
            </div>
            <div class='self-intro-contact-btns'>
                <span class='dropdown' v-if='$store.state.sideBarComps.SelfIntro.showQQ'>
                    <a href='javascript:void(0)'><i class='fa fa-qq'></i></a>
                    <div class="dropdown-content dropdown-tdc">
                        <img src='~static/images/tdcimgs/qq.jpg'></img>
                    </div>
                </span>
                <a v-else style='color:black'><i class='fa fa-qq'></i></a>

                <span class='dropdown' v-if='$store.state.sideBarComps.SelfIntro.showWechat'>
                    <a href='javascript:void(0)'><i class='fa fa-weixin'></i></a>
                    <div class="dropdown-content dropdown-tdc">
                        <img src='~static/images/tdcimgs/weixin.jpg'></img>
                    </div>
                </span>
                <a v-else style='color:black'><i class='fa fa-weixin'></i></a>
                
                <a v-if='$store.state.sideBarComps.SelfIntro.showWeibo' :href='$store.state.sideBarComps.SelfIntro.weiboLink'><i class='fa fa-weibo'></i></a>
                <a v-else style='color:black'><i class='fa fa-weibo'></i></a>

                <a v-if='$store.state.sideBarComps.SelfIntro.showFacebook' :href='$store.state.sideBarComps.SelfIntro.facebookLink'><i class='fa fa-facebook'></i></a>
                <a v-else style='color:black'><i class='fa fa-facebook'></i></a>

                <a v-if='$store.state.sideBarComps.SelfIntro.showLinkedin' :href='$store.state.sideBarComps.SelfIntro.linkedinLink'><i class='fa fa-linkedin'></i></a>
                <a v-else style='color:black'><i class='fa fa-linkedin'></i></a>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data () {
            return {

            }
        },
        computed:{
            sendEmail(){
                const sendEmail = `mailto:${this.$store.state.sideBarComps.SelfIntro.email}`;
                return sendEmail
            }
        }
    }
</script>

<style>


</style>