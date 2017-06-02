<template>

    <div role="menu" class="Menu">
        <slot></slot>
    </div>

</template>

<script>
    export default {}
</script>

<style lang="stylus" scoped>

    .Menu
        background: white
        border-radius: 2px
        box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px
        display: inline-block
        font-size: 15px
        padding: 8px 0px
        transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms
        width: 168px

</style>