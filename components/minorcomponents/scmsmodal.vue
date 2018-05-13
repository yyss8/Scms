<template>
    <div v-if='on'>
        <div class='scms-modal-mask' @click='on = !on'></div>
        <transition name="modal-fade">
            <div class='scms-modal' :style='{width:modalWidth !== undefined && modalWidth != "" ? modalWidth:"600px"}'>
                <slot :toggle='toggle'></slot>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        props:[
            'modalWidth'
        ],
        data(){
            return {
                on:false
            }
        },
        methods:{
            toggle(){
                this.on = !this.on;
            }
        }
    }
</script>

<style>

    .scms-modal{
        position: fixed;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        min-height:150px;
        background-color:white;
        z-index:1002;
        border-radius: 5px;
    }

    .scms-modal-mask{
        background-color:#525252;
        position: fixed;
        left:0;
        top:0;
        right:0;
        bottom: 0;
        opacity: 0.6;
        z-index:1001;
    }
    
    .scms-modal-header{
        padding: 15px;
        border-bottom: 1px solid #e5e5e5;
    }

    .scms-modal-body{
        position: relative;
        padding: 15px;
    }

    .scms-modal-footer{
        bottom: 0;
        padding: 15px;
        text-align: right;
        border-top: 1px solid #e5e5e5;
    }

    .modal-fade-enter-active, .modal-fade-leave-active {
        transition: top 0.5s,opacity .5s
    }
    .modal-fade-enter, .modal-fade-leave-to /* .fade-leave-active in <2.1.8 */ {
        top:30%;
        opacity: 0
    }
</style>