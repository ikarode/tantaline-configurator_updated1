<template>

    <section class="Category">

        <header class="Header">
            <div class="Title">{{ category.title }}</div>

            <v-btn v-if="visibility" @click.native="hide" icon class="grey--text text--darken-2"><v-icon>visibility</v-icon></v-btn>
            <v-btn v-if="!visibility" @click.native="show" icon class="grey--text text--darken-2"><v-icon>visibility_off</v-icon></v-btn>
        </header>

        <draggable v-if="visibility" class="Configurations" v-model="category.configurations" :options="{ group: 'configurations' }">
            <configuration
                v-for="configuration in category.configurations" 
                :key="configuration" 
                :configuration="configuration">
            </configuration>
        </draggable>

    </section>

</template>

<script>
    import Configuration from '@/components/Configuration'
    import Icon from '@/components/utilities/Icon'
    import Draggable from 'vuedraggable'

    export default
    {
        components: { Configuration, Draggable, Icon },

        props: ['category', 'configurations'],

        data()
        {
            return {
                visibility: true
            }
        },

        methods:
        {
            show()
            {
                this.visibility = true;
            },

            hide()
            {
                this.visibility = false;
            }
        }
    }

</script>

<style lang="stylus" scoped>

    .Category
        margin-bottom: 30px

    .Category .Header
        background: #E9E9E9
        color: #757575
        display: flex
        font-size: 14px
        padding: 12px 16px

    .Title
        align-items: center
        display: flex
        flex: 1 1 0%

    .Category .Configurations
        min-height: 50px
        padding: 25px

</style>