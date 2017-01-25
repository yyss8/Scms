<template>
    <div class='panel panel-default'>
        <div class='panel-heading'>
            个人介绍
        </div>
        <div class='panel-body'>
            <div class='self-intro-content'>
                <div class='self-intro-content-name'>
                    Shen Chen
                </div>
                <div>
                    <i class='fa fa-envelope-o'></i><span><a href="mailto:yyss10@gmail.com">yyss10@gmail.com</a></span>
                </div>
                <div>
                    <i class='fa fa-drivers-license-o'></i><span>New York</span>
                </div>
                <div>
                    A recent graduate from Baruch College with a BBA degree in CIS major.
                </div>
            </div>
            <div class='self-intro-contact-btns'>
                <a href='javascript:void(0)'><i class='fa fa-qq'></i></a>
                <a href='javascript:void(0)'><i class='fa fa-weixin'></i></a>
                <a style='color:black'><i class='fa fa-weibo'></i></a>
                <a href='https://www.facebook.com/yyss8'><i class='fa fa-facebook'></i></a>
                <a href='https://www.linkedin.com/in/%E7%87%8A-%E9%99%88-489145134'><i class='fa fa-linkedin'></i></a>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        
    }
</script>

<style>

    .self-intro-content{
        padding:15px;
    }

    .self-intro-content div{
        margin-bottom: 15px;
    }

    .self-intro-content span{
        padding-left:15px;
    }

    .self-intro-content-name{
        font-size:20px
    }

    .self-intro-contact-btns{
        margin-top:10px;
        text-align: center;
    }

    .self-intro-contact-btns a{
        padding-right:20px;
        text-decoration: none;
        font-size:20px;
    }
</style>