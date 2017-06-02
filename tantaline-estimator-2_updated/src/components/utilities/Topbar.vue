<template>
    <!-- Topbar -->
    <section class="Topbar" :style="{'background-color': color}">

        <!-- Slot Left -->
        <div class="Content_Left">
            <slot name="content-left"></slot>
        </div>
        
        <!-- Title -->
        <div class="Title"><slot></slot></div>

        <!-- Slot Right -->
        <div class="Content_Right">
            <slot name="content-right"></slot>
        </div>

    </section>

</template>

<script>

    export default
    {
        props: ['color']
    }

</script>

<style lang="stylus" scoped>

    .Topbar
        align-items: center
        background-color: #00BCD4
        border-radius: 0px
        box-sizing: border-box
        box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.12), 0px 1px 4px rgba(0, 0, 0, 0.12)
        display: flex
        padding: 8px
        position: relative
        transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms
        width: 100%

    .Title
        color: white
        flex: 1 1 0%
        font-size: 24px
        font-weight: 400
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap

    .Content_Left
        display: inherit
        margin-right: 24px

    .Content_Right
        display: inherit
        margin-left: 24px

</style>