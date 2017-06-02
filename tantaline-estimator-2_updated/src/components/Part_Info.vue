<template>

    <td>

        <template v-for="category in part.configuration">

            <div class="Field row" v-for="configuration in category.configurations" :key="configuration.label" v-if="configuration.label != 'Part Quantity' && configuration.value">

                <div class="col-xs-6"><strong>{{ configuration.label }}</strong></div>

                <div class="col-xs-6">
                    
                    <div v-if="!configuration.configurations.length">{{ configuration.value }}</div>

                    <div v-else>

                        {{ configuration.value.label }}

                        <div class="row" v-for="x in configuration.value.configurations" :key="x.label">
                            <div class="col-xs-6">{{ x.label }}</div>
                            <div v-if="typeof(x.value) != 'object'" class="col-xs-6">{{ x.value }} {{ x.unit }}</div>
                            <div v-if="typeof(x.value) === 'object'" class="col-xs-6">{{ x.value.label }}</div>
                        </div>

                    </div>

                </div>

            </div>
            
        </template>

    </td>
    
</template>

<script>

    export default
    {
        props: ['part']
    }

</script>

<style lang="stylus" scoped>

    .Field:first-child
        padding-top: 10px

    .Field:last-child
        border-bottom: none
        padding-bottom: 0
        margin-bottom: 10px

    .Field
        border-bottom: 1px solid #DDDDDD
        margin-left: -8px
        margin-right: -8px
        margin-bottom: 15px
        padding-bottom: 15px

</style>