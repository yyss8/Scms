<template>
    <div>
        <div class='panel panel-default'>
            <div class='panel-heading' v-if='$store.state.sideBarComps.HotPosts.showTitle'>
                {{ $store.state.sideBarComps.HotPosts.title }}
            </div>
            <div class='panel-body'>
                abc
            </div>
        </div>
    </div>
</template>