<template>
    
    <div class="Quote Touchable">
        <div @click="edit">
            <div class="Title">{{ quote.name }}</div>
            <div><small>Updated {{ updated_at }}</small></div>
        </div>

        <v-menu bottom right slot="content-left">

            <v-btn icon class="grey--text text--darken-2" slot="activator">
                <v-icon>more_vert</v-icon>
            </v-btn>

            <v-list>

                <v-list-item>
                    <v-list-tile @click.native="$router.push('/quotes/' + quote.id + '/edit')">
                        <v-list-tile-title>Edit Quotation</v-list-tile-title>
                    </v-list-tile>
                </v-list-item>

                <v-list-item>
                    <v-list-tile @click.native="quotes.splice(index, 1)">
                        <v-list-tile-title>Delete Quotation</v-list-tile-title>
                    </v-list-tile>
                </v-list-item>

                <v-list-item>
                    <v-list-tile>
                        <v-list-tile-title><a :href="downloadURI" :download="'Quote_' + quote.id + '.json'" target="_blank">Download Quotation Configuration</a></v-list-tile-title>
                    </v-list-tile>
                </v-list-item>

                <v-list-item>
                    <v-list-tile @click.native="$router.push('/reports/customer/' + quote.id)">
                        <v-list-tile-title>Generate Customer Quotation</v-list-tile-title>
                    </v-list-tile>
                </v-list-item>

                <v-list-item>
                    <v-list-tile @click.native="$router.push('/reports/order/' + quote.id)">
                        <v-list-tile-title>Generate Order Confirmation</v-list-tile-title>
                    </v-list-tile>
                </v-list-item>

                <v-list-item>
                    <v-list-tile @click.native="$router.push('/reports/production/' + quote.id)">
                        <v-list-tile-title>Generate Production Card</v-list-tile-title>
                    </v-list-tile>
                </v-list-item>

            </v-list>

        </v-menu>

        
    </div>

</template>

<script>
    import Icon from '@/components/utilities/Icon'
    import moment from 'moment'

    export default
    {
        components: { Icon },

        props: ['quotes', 'quote', 'index'],

        mounted()
        {
            window.setInterval(() => {
                this.updated_at = moment(this.quote.date).fromNow();
            }, 500);
        },

        data()
        {
            return {
                updated_at: ''
            }
        },

        methods:
        {
            edit()
            {
                return this.$router.push('/quotes/' + this.quote.id + '/edit');
            }   
        },

        computed:
        {
            downloadURI()
            {
                return "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.quote));
            }
        }
    }

</script>

<style lang="stylus" scoped>

    .Quote
        align-items: center
        background: #EEEEEE
        box-sizing: border-box
        color: #424249
        display: -webkit-box
        lost-waffle: 1/4
        padding: 20px 10px 20px 20px
        user-select: none

        > div
            flex: 1 1 0%
            overflow: hidden

        .Title
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap

</style>