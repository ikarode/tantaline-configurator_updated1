<template>

    <div>

        <div class="Configuration_Wrapper">

            <div class="Configuration" :class="{'Collapsed': !visibility}">
                <div class="Label">
                    <template v-if="configuration.label">
                        {{ configuration.label }}
                    </template>
                    <template v-else>
                        Field
                    </template>
                    <template v-if="configuration.unit">
                        ({{ configuration.unit }})
                    </template>
                </div>

                <v-btn v-if="configuration.configurations.length && visibility" @click.native="hide" icon class="white--text text--darken-2"><v-icon>visibility</v-icon></v-btn>
                <v-btn v-if="configuration.configurations.length && !visibility" @click.native="show" icon class="white--text text--darken-2"><v-icon>visibility_off</v-icon></v-btn>
            </div>

            <div class="Action_Icons" :class="{'Collapsed': !visibility}">
                <v-btn @click.native="onEdit" icon class="grey--text text--darken-2"><v-icon>settings</v-icon></v-btn>
                <v-btn @click.native="onRemove" icon class="grey--text text--darken-2"><v-icon>delete</v-icon></v-btn>
            </div>

        </div>

        <draggable v-show="visibility" class="Inner" v-model="configuration.configurations" :options="{ group: 'configurations' }">
            <configuration 
                v-for="configuration in configuration.configurations" 
                :key="configuration" 
                :configuration="configuration"
                :isOption="type == 'Dropdown'">
            </configuration>
        </draggable>

    </div>
    
</template>

<script>
    import Configuration from '@/components/Configuration'
    import Icon from '@/components/utilities/Icon'
    import Draggable from 'vuedraggable'
    import { EventBus } from '@/event-bus.js';

    export default
    {
        components: { Configuration, Draggable, Icon },

        props: ['configuration', 'first', 'isOption'],

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
            },

            onEdit(configuration)
            {
                EventBus.$emit('editConfiguration', this.configuration);
            },

            onCopy(configuration)
            {
                EventBus.$emit('copyConfiguration', this.configuration);
            },

            onRemove(configuration)
            {
                EventBus.$emit('removeConfiguration', this.configuration);
            }
        },

        computed:
        {
            type()
            {
                if (this.isOption)
                    return 'Option';

                if (!this.configuration.configurations.length)
                    return 'Input';

                return 'Dropdown';
            }
        }
    }

</script>

<style lang="stylus" scoped>

    .Configuration_Wrapper
        align-items: center
        display: inline-flex

    .Action_Icons
        align-items: center
        display: flex

        button:first-child
            margin-left: 15px

    .Action_Icons.Collapsed
        margin-bottom: 10px

    .Configuration
        background: #1565C0
        box-sizing: border-box
        display: inline-flex
        height: 54px
        padding: 15px 24px
        position: relative
        width: 448px

        button
            position: absolute
            right: 0
            top: 4px

    .Configuration:hover
        cursor: -webkit-grab

    .sortable-ghost .Configuration
        background: transparent
        border: 1px dashed #9E9E9E
        height: 54px

        .Label, i
            display: none

    .Configuration:active
        cursor: -webkit-grabbing

    .Label
        color: white
        flex: 1 1 0%
        font-weight: 500
        overflow: hidden
        text-overflow: ellipsis

    .Inner
        box-sizing: border-box
        min-height: 10px
        margin-left: 50px
        padding-top: 10px
        z-index: 200

    .Collapsed
        margin-bottom: 10px

    .fade-enter-active, .fade-leave-active
        transition: opacity .5s

    .fade-enter, .fade-leave-to
        opacity: 0

</style>