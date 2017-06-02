<template>
    <div @click="$emit('click')" class="Overlay"></div>
</template>

<script>

    export default 
    {
        beforeCreate()
        {
            document.documentElement.className = 'Hide_Overflow'
        },

        destroyed()
        {
            document.documentElement.className = ''
        }
    }

</script>

<style lang="stylus">

    .Overlay
        background: rgba(0,0,0,0.5)
        bottom: 0
        left: 0
        position: fixed
        right: 0
        top: 0
        z-index: 500

</style>