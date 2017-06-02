<template>
    
    <div class="Container">

        <draggable v-model="categories">
            <category 
                v-for="category in categories"
                :key="category"
                :category="category">
            </category>
        </draggable>

        <v-btn class="Add_New_Button" @click.native="addConfiguration" floating="floating">
            <v-icon>add</v-icon>
        </v-btn>

        <transition name="fade">
            <overlay @click="editing = false" v-if="editing"></overlay>
        </transition>

        <transition name="slide">
            <edit-configuration v-if="editing" @close="editing = false" :configuration="active_configuration"></edit-configuration>
        </transition>

    </div>

</template>

<script>
    import Category from '@/components/Category'
    import Configuration from '@/components/Configuration'
    import Icon from '@/components/utilities/Icon'
    import Overlay from '@/components/utilities/Overlay'
    import EditConfiguration from '@/components/Edit_Configuration'
    import Draggable from 'vuedraggable'
    import { EventBus } from '@/event-bus.js';
    import * as objTraverse from 'obj-traverse/lib/obj-traverse';
    import _ from 'lodash'
    import axios from 'axios'

    export default
    {
        components: { Category, Configuration, Draggable, Icon, Overlay, EditConfiguration },

        mounted()
        {
            EventBus.$on('editConfiguration', configuration => {
                this.edit(configuration);
            });

            EventBus.$on('copyConfiguration', configuration => {
                this.copy(configuration);
            });

            EventBus.$on('removeConfiguration', configuration => {
                this.remove(configuration);
            });

            this.fetchConfiguration();
        },

        data()
        {
            return {
                categories: [],
                editing: false,
                active_configuration: {}
            }
        },

        /**
         * Save configuration before component is destroyed.
         */
        beforeDestroy()
        {
            this.$store.commit('setConfiguration', this.categories);

            axios.put('https://s3.amazonaws.com/tantaline-estimator/v2/configuration.json', JSON.stringify(this.categories))
        },

        methods:
        {
            addCategory()
            {
                this.categories.push({
                    title: 'New Category',
                    configurations: []
                });
            },

            edit(configuration)
            {
                this.active_configuration = configuration;
                this.editing = true;
            },

            copy(configuration)
            {
                let clone = _.cloneDeepWith(configuration, (value, key) => {
                    if (key == 'id')
                        return Date.now();
                })

                this.categories[0].configurations.push(clone);
            },

            remove(configuration)
            {
                this.categories.some(category => {
                    return objTraverse.findAndDeleteFirst(category, 'configurations', {id: configuration.id})
                })
            },

            fetchConfiguration()
            {
                axios.get('https://s3.amazonaws.com/tantaline-estimator/v2/configuration.json')
                    .then(response => this.fetchedConfiguration(response.data))
            },

            fetchedConfiguration(configuration)
            {
                this.categories = configuration;
            },

            /**
             * Add new configuration to the template.
             */
            addConfiguration()
            {
                this.categories[0].configurations.push({
                    id: Date.now(),
                    label: '',
                    text: '',
                    placeholder: '',
                    value: '',
                    unit: '',
                    multiple: false,
                    secondary: false,
                    rules: {
                        required: false,
                        minimum: '',
                        maximum: ''
                    },
                    pricing: {
                        unit: '',
                        fixed: '',
                        formula: ''
                    },
                    configurations: []
                });
            }
        }
    }

</script>

<style lang="stylus" scoped>

    .Container
        padding-top: 26px

    .Add_New_Button
        background: #db4437
        bottom: 24px
        position: fixed !important
        right: 24px

</style>