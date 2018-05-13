<template>
    <div class='footer-content'>
        <div class='col-md-10'>
            <span class='left-text'>Copyright © 2017-2018 Shen's Blog - Powered by Scms {{VER}}. All Rights Reserved.</span>
        </div>
    </div>
</template>

<script>
export default {

    data () {
        return {
            VER:process.env.APP_VR
        }
    }
}
</script>