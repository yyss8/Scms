<template>
    <div class='row'>
        <div class='col-md-5'>
            <slot></slot>
        </div>
        <div class='col-md-7'>
            <ul class="nav navbar-nav pull-right" id='admin-heading-right'>
                <li><a href='#'><img src='~static/images/scmslogo.png'></a></li>
                <li><button class='btn btn-default btn-lg'><i class='fa  fa-user'></i>&nbsp; yyss8 &nbsp;<span class="caret"></span></button></li>
                <li><button class='btn btn-default' style='margin-top:28px;' onclick="window.location='/pages/1';"><i class='glyphicon glyphicon-home'></i></button></li>
                <li>
                    <button class='btn btn-default' style='margin-top:28px;'>
                        <i class='fa fa-bell'></i>
                        <div class='alarm-num' v-if='alarmNum != 0'><span>{{ alarmNum }}</span></div>
                    </button>
                </li>
                <li><button class='btn btn-default' style='margin-top:28px;' onclick="window.location='/user/logout';"><i class='fa fa-sign-out'></i></button></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                alarmNum:1
            }
        },
        methods:{

        }
    }
</script>