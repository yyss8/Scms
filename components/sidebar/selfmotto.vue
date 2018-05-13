<template>
    <div class='panel panel-default'>
        <div class='panel-heading' v-if='$store.state.sideBarComps.SelfMotto.showTitle'></div>
        <div class='panel-body'>
            {{$store.state.sideBarComps.SelfMotto.content}}
        </div>
    </div>
</template>