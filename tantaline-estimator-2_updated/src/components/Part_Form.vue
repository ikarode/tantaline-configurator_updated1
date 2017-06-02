<template>

    <div>

        <!-- Category -->
        <div class="Category" v-for="(category, index) in part.configuration" v-if="index != 0">

            <!-- Category Title -->
            <div class="Category_Title">{{ category.title }}</div>

            <!-- Quote Form -->
            <div class="Quote_Form">
                <configuration-field 
                    v-for="(configuration, index) in category.configurations" 
                    :key="configuration.id" 
                    :index="index"
                    :configurations="category.configurations"
                    :configuration="configuration"
                    :template="template"
                    :isOption="false">
                </configuration-field>
            </div>

        </div>

        <div class="Category">

            <div class="Category_Title">Part Pricing</div>


            <div class="Quote_Form">

                <v-row row>
                    <v-col xs8>
                        <v-text-field
                            label="Computed Price"
                            :disabled="true">
                        </v-text-field>
                    </v-col>
                </v-row>

                <v-row row>
                    <v-col xs8>
                        <v-text-field
                            label="Final Part Price">
                        </v-text-field>
                    </v-col>
                </v-row>

            </div>

        </div>

    </div>

</template>

<script>

    export default
    {
        components: {},
        
        props: ['part', 'template']
    }

</script>

<style lang="stylus" scoped>

</style>