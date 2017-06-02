<template>

    <div class="Edit_Configuration">

        <!-- Label -->
        <v-text-field label="Label" v-model="configuration.label"></v-text-field>

        <!-- Placeholder -->
        <v-text-field label="Placeholder" v-model="configuration.placeholder"></v-text-field>

        <!-- Unit of Measure -->
        <v-text-field label="Unit of Measure" v-model="configuration.unit"></v-text-field>

        <!-- Multiple -->
        <v-checkbox label="Allow Multiple?" primary v-model="configuration.multiple" light/>

        <h3>Cost Factor</h3>

        <!-- Price Per Unit -->
        <v-text-field label="Price Per Unit" 
            v-model="configuration.pricing.unit" 
            :disabled="(configuration.pricing.fixed != '') || (configuration.pricing.formula != '')">
        </v-text-field>

        <!-- Fixed Price -->
        <v-text-field label="Fixed Price" 
            v-model="configuration.pricing.fixed" 
            :disabled="(configuration.pricing.unit != '') || (configuration.pricing.formula != '')">
        </v-text-field>

        <!-- Pricing Formula -->
        <v-text-field label="Pricing Formula" 
            :multi-line="true"
            v-model="configuration.pricing.formula" 
            :disabled="(configuration.pricing.unit != '') || (configuration.pricing.fixed != '')">
        </v-text-field>

        <h3>Validation</h3>

        <!-- Minimum Length -->
        <v-text-field label="Minimum" v-model="configuration.rules.minimum"></v-text-field>

        <!-- Maximum Length -->
        <v-text-field label="Maximum" v-model="configuration.rules.maximum"></v-text-field>

        <!-- Required -->
        <v-checkbox label="Make Input Required?" primary v-model="configuration.rules.required" light/>

    </div>

</template>

<script>

    export default
    {
        props: ['configuration']
    }

</script>

<style lang="stylus">

    .Edit_Configuration
        background: white
        bottom: 0
        box-shadow: 6px 0 10px -3px rgba(0,0,0,0.5)
        left: 0
        overflow: auto
        padding: 85px 15px 15px 15px
        position: fixed
        top: 0
        width: 500px
        z-index: 500

        h3
            font-size: 17px !important

    .slide-enter-active
        transition: all .25s ease

    .slide-leave-active
        transition: all .25s cubic-bezier(1.0, 0.5, 0.8, 1.0)

    .slide-enter, .slide-leave-to
        transform: translateX(-500px)
        opacity: 0


</style>