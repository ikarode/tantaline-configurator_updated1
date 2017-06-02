<template>
    
    <div class="Home" style="padding-top: 26px;">

        <div class="Container">

            <div class="Title">Recent Quotations</div>

            <div class="Quotes">

                <div v-if="!quotes.length" class="Empty">
                    <div>
                        <h4>No quotes yet</h4>
                        <h4>Click + to create a new quotation.</h4>
                    </div>
                </div>

                <quote-card v-for="(quote, index) in quotes" :key="quote" :index="index" :quotes="quotes" :quote="quote"></quote-card>

            </div>

        </div>

        <v-menu top>

            <v-btn class="Add_New_Button" floating="floating" slot="activator">
                <v-icon>add</v-icon>
            </v-btn>

            <v-list>

                <v-list-item>
                    <v-list-tile @click.native="newQuote">
                        <v-list-tile-title>Create New Quotation</v-list-tile-title>
                    </v-list-tile>
                </v-list-item>

                <v-list-item>
                    <v-list-tile @click.native="todo">
                        <v-list-tile-title>Import Quotation Configuration</v-list-tile-title>
                    </v-list-tile>
                </v-list-item>

            </v-list>

        </v-menu>

    </div>

</template>

<script>
    import Icon from '@/components/utilities/Icon'
    import QuoteCard from '@/components/Quote_Card'
    import axios from 'axios'

    export default 
    {
        components: { Icon, QuoteCard },

        data()
        {
            return {
                quotes: JSON.parse(localStorage.getItem('quotes') || '[]')
            }
        },

        watch:
        {
            quotes:
            {
                handler(quotes)
                {
                    this.saveQuotes();
                },
                deep: true
            }
        },

        methods:
        {
            saveQuotes()
            {
                localStorage.setItem('quotes', JSON.stringify(this.quotes));
            },

            newQuote()
            {
                this.fetchNewQuoteConfiguration();
            },

            fetchNewQuoteConfiguration()
            {
                axios.get('https://s3.amazonaws.com/tantaline-estimator/v2/configuration.json')
                    .then(response => this.createNewQuote(response.data))
            },

            todo()
            {
                window.alert('Not Implemented Yet')
            },

            createNewQuote(configuration)
            {
                this.quotes.push({ 
                    id: Date.now(), 
                    name: 'New Quote', 
                    date: new Date(), 
                    info: {
                        number: '',
                        date: '',
                        customer: {
                            name: '',
                            number: ''
                        },
                        bill_to: {
                            contact: '',
                            street: '',
                            city: '',
                            state: '',
                            zip: '',
                            county: '',
                            country: ''
                        },
                        ship_to: {
                            contact: '',
                            street: '',
                            city: '',
                            state: '',
                            zip: '',
                            county: '',
                            country: ''
                        },
                        salesperson: '',
                        invoicing: { country: 'USA' },
                        payment_terms: '',
                        delivery_terms: '',
                        shipment_date: ''
                    },
                    parts: [],
                    configuration: configuration 
                });
                this.saveQuotes(this.quotes);
            }
        }
    }

</script>

<style lang="stylus" scoped>

    .Title
        color: #555555
        font-size: 14px
        font-weight: 500
        line-height: 46px
        margin-left: 3px
        margin-right: 55px
        padding-top: 5px
        user-select: none

    .Quotes
        background: white
        border-radius: 2px
        box-shadow: 0px 1px 3px rgba(0,0,0,.1)

    .Quotes .Empty
        align-items: center
        display: flex
        justify-content: center
        padding: 30px
        text-align: center
        user-select: none

        h4
            font-weight: normal

        h4:first-child
            color: #222222
            font-size: 18px
            margin-bottom: 10px

        h4:last-child
            color: #888888
            font-size: 16px
            margin: 0

    .Add_New_Button
        background: #db4437
        bottom: 24px
        position: fixed !important
        right: 24px
    
</style>