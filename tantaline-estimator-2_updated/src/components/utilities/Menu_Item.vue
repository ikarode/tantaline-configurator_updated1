<template>
    
    <div class="Menu_Item">
        <slot></slot>
    </div>

</template>

<script>
    export default {}
</script>

<style lang="stylus" scoped>

    .Menu_Item
        align-items: center
        cursor: pointer
        display: flex
        min-height: 48px
        padding: 0px 16px
        transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms
        white-space: nowrap

    .Menu_Item:hover
        background-color: rgba(0, 0, 0, 0.098)

</style>