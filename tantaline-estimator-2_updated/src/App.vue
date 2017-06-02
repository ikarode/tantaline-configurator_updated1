<template>

    <div id="app">

        <link v-if="!$route.path.includes('reports')" href="https://unpkg.com/vuetify@0.11.0/dist/vuetify.min.css" rel="stylesheet" type="text/css">

        <v-app>

            <topbar v-if="!$route.path.includes('reports')" color="#4285F4">
                Tantaline Quotes

                <v-menu v-if="$route.path == '/'" bottom slot="content-left">

                    <v-btn icon class="white--text text--darken-2" slot="activator">
                        <v-icon>menu</v-icon>
                    </v-btn>

                    <v-list>

                        <v-list-item>
                            <v-list-tile @click.native="$router.push('/config/')">
                                <v-list-tile-title>Edit Quote Builder Configuartion</v-list-tile-title>
                            </v-list-tile>
                        </v-list-item>

                    </v-list>

                </v-menu>
                

                <v-btn v-if="$route.path != '/'" @click.native="$router.push('/')" icon class="white--text text--darken-2" slot="content-left"><v-icon>arrow_back</v-icon></v-btn>
            </topbar>

            <div>
                <router-view></router-view>
            </div>

        </v-app>

    </div>

</template>

<script>

    import Topbar from '@/components/utilities/Topbar'
    import Icon from '@/components/utilities/Icon'
    import axios from 'axios'

    export default 
    {
        components: { Icon, Topbar },

        mounted()
        {
            this.fetchConfiguration();
        },

        methods:
        {
            fetchConfiguration()
            {
                axios.get('https://s3.amazonaws.com/tantaline-estimator/v2/configuration.json')
                    .then(response => this.fetchedConfiguration(response.data))
            },

            fetchedConfiguration(configuration)
            {
                this.$store.commit('setConfiguration', configuration);
            },

            showNav()
            {
                console.log('show nav');
            }
        }
    }

</script>

<style lang="stylus">
    @import './stylus/App'

    .Topbar
        user-select: none
</style>
