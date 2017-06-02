<template>

    <i @click="$emit('click')" class="material-icons" :style="{color: color, 'font-size': size}"><slot></slot></i>

</template>

<script>

    export default 
    {
        props: ['color', 'size']
    }

</script>

<style lang="stylus">

</style>