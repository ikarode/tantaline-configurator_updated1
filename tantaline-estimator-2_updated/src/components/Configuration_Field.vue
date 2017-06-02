<template>

    <div class="Configuration_Field">

        <v-row row>

            <v-col xs8>

                <v-select 
                    v-if="type == 'Dropdown'"
                    v-bind:items="configuration.configurations"
                    v-model="configuration.value"
                    :label="configuration.label"
                    :required="configuration.rules.required"
                    item-text="label"
                    item-value="label"
                    light
                    auto>
                </v-select>

                <v-text-field
                    v-if="type == 'Input'"
                    :label="configuration.label"
                    v-model="configuration.value"
                    :rules="[checkMinimum(configuration), checkMaximum(configuration)]"
                    :required="configuration.rules.required">
                </v-text-field>

            </v-col>

            <v-col xs2>

                <v-btn v-tooltip:top="{ html: 'Clear' }" icon class="grey--text text--darken-2" v-if="configuration.value"  @click.native="configuration.value = ''">
                    <v-icon>clear</v-icon>
                </v-btn>

                <v-btn icon class="grey--text text--darken-2" v-if="configuration.multiple"  @click.native="duplicate(configuration)">
                    <v-icon>add</v-icon>
                </v-btn>

                <v-btn icon class="grey--text text--darken-2" v-if="configuration.secondary"  @click.native="configurations.splice(index, 1)">
                    <v-icon>delete</v-icon>
                </v-btn>

            </v-col>

            <!-- <v-col v-if="configuration.value && type == 'Dropdown'" xs2>
                <div class="Price">{{ computePrice(configuration.value) }}</div>
            </v-col> -->

        </v-row>

        <configuration-field 
            v-if="type == 'Dropdown' && configuration.value && configuration.value.configurations.length" 
            v-for="(x, i) in configuration.value.configurations"
            :key="x.id"
            :index="i"
            :configuration="x"
            :isOption="false"
            style="margin-left: 35px;">
        </configuration-field>

    </div>

</template>

<script>
    import * as objTraverse from 'obj-traverse/lib/obj-traverse';
    import numeral from 'numeral'

    export default
    {
        props: ['configuration', 'configurations', 'index', 'isOption', 'template'],

        methods:
        {
            computePrice(configuration)
            {
                let computedPrice = eval(configuration.pricing.formula.trim())
                return numeral(Math.ceil(computedPrice / 10) * 10).format('$0,0');
            },

            duplicate(configuration)
            {
                let obj = false;

                this.template.some(category => {
                    return obj = objTraverse.findFirst(category, 'configurations', {id: configuration.id})
                })

                obj.secondary = true;

                this.configurations.push(JSON.parse(JSON.stringify(obj)));
            },

            checkMinimum(configuration)
            {
                if (!configuration.rules.minimum)
                    return true;

                if (!configuration.value)
                    return true;

                if (parseInt(configuration.value) >= configuration.rules.minimum)
                    return true;

                return 'Input does not meet minimum of ' + configuration.rules.minimum + ' ' + configuration.unit;
            },

            checkMaximum(configuration)
            {
                if (!configuration.rules.maximum)
                    return true;

                if (!configuration.value)
                    return true;

                if (parseInt(configuration.value) <= configuration.rules.maximum)
                    return true;

                return 'Input exceeds maximum of ' + configuration.rules.maximum + ' ' + configuration.unit;
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

    .Configuration_Field
        position: relative

        .Price
            color: green
            margin-top: 12px

</style>