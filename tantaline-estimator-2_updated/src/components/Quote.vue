<template>

    <section class="Quote">

        <header class="Header">
            <h4 v-if="!editing" @dblclick="edit">{{ quote.name }}</h4>
            <input @blur="editing = false" @keyup.enter="editing = false" v-if="editing" v-model="quote.name" autofocus="autofocus">

            <v-menu bottom right slot="content-left" v-if="this.quote">

                <v-btn icon class="white--text text--darken-2" slot="activator">
                    <v-icon>more_horiz</v-icon>
                </v-btn>

                <v-list>

                    <v-list-item>
                        <v-list-tile @click.native="generateQuote">
                            <v-list-tile-title>Generate Customer Quotation</v-list-tile-title>
                        </v-list-tile>
                    </v-list-item>

                    <v-list-item>
                        <v-list-tile @click.native="generateOrderConfirmation">
                            <v-list-tile-title>Generate Order Confirmation</v-list-tile-title>
                        </v-list-tile>
                    </v-list-item>

                    <v-list-item>
                        <v-list-tile @click.native="generateProductionCard">
                            <v-list-tile-title>Generate Production Card</v-list-tile-title>
                        </v-list-tile>
                    </v-list-item>

                </v-list>

            </v-menu>

        </header>

        <main class="Content">

            <v-container>

                <div style="position: fixed; left: 50px; display: flex;">

                    <v-select 
                        v-bind:items="views"
                        v-model="step"
                        label="Select"
                        light
                        single-line
                        item-value="step"
                        max-height="300"
                        overflow="overflow"
                        style="
                            width: 175px;
                            z-index: 5000;">
                    </v-select>

                    <v-btn style="margin: 15px 0 0 15px;" icon class="grey--text text--darken-2" v-if="step.step != 1"  @click.native="deletePart(step.step - 2)">
                        <v-icon>delete</v-icon>
                    </v-btn>

                </div>

                <quote-info-form v-if="step.step == 1" :quote="quote"></quote-info-form>

                <template v-for="(part, index) in quote.parts">
                    <div v-if="step.step == (index + 2)">
                        <part-form :template="quote.configuration" :part="part"></part-form>
                    </div>
                </template>

            </v-container>

            <v-btn class="Add_New_Button" @click.native="newPart" floating="floating">
                <v-icon>add</v-icon>
            </v-btn>

        </main>

    </section>

</template>

<script>
    import QuoteInfoForm from '@/components/Quote_Info_Form'
    import PartForm from '@/components/Part_Form'
    import _ from 'lodash'

    export default
    {
        components: { QuoteInfoForm, PartForm },

        data()
        {
            return {
                step: { text: 'Quote Info', step: 1 },
                editing: false,
                index: null,
                quote: {},
            }
        },

        mounted()
        {
            let quotes = JSON.parse(localStorage.getItem('quotes'));

            this.quote = _.find(quotes, (quote, index) => {
                this.index = index;
                return this.$route.params.quote_id == quote.id;
            });

            /**
             * Save changes when the browser / page tab is closed.
             */
            window.onbeforeunload = this.save;
        },

        updated()
        {
            this.save();
        },

        /**
         * Save quote before component is destroyed.
         */
        beforeDestroy()
        {
            return this.save();
        },

        methods:
        {
            edit()
            {
                return this.editing = true;
            },

            newPart()
            {
                this.quote.parts.push({ 
                    id: Date.now(),
                    price: 0,
                    configuration: JSON.parse(JSON.stringify(this.quote.configuration))
                });

                this.step.text = this.views[this.views.length - 1].text
                this.step.step = this.views[this.views.length - 1].step
            },

            deletePart(index)
            {
                this.quote.parts.splice(index, 1);
            },

            generateQuote()
            {
                this.save();

                return this.$router.push({ path: '/reports/customer/' + this.quote.id })
            },

            generateOrderConfirmation()
            {
                this.save();

                return this.$router.push({ path: '/reports/order/' + this.quote.id })
            },

            generateProductionCard()
            {
                this.save();

                return this.$router.push({ path: '/reports/production/' + this.quote.id })
            },

            save()
            {
                let quotes = JSON.parse(localStorage.getItem('quotes'));
                this.quote.date = new Date();
                quotes[this.index] = this.quote

                localStorage.setItem('quotes', JSON.stringify(quotes));
            }
        },

        computed: 
        {
            views()
            {
                let dropdown = [
                    { text: 'Quote Info', step: 1 }
                ];

                _.forEach(this.quote.parts, (part, index) => {
                    dropdown.push({ text: this.quote.info.number + '.' + ("0" + (index + 1)).slice (-2), step: index + 2 })
                })

                return dropdown
            }
        }
    }

</script>

<style lang="stylus">

    .Quote .Header
        align-items: center
        background: #424249 !important
        display: flex
        margin-bottom: 26px
        padding: 15px 88px

        h4
            color: rgba(225, 225, 225, 0.8)
            font-size: 20px
            font-weight: normal
            margin-bottom: 0
            min-height: 24px
            user-select: none
            width: 100%

        input
            background: transparent
            border: none
            color: white
            font-family: 'Roboto', sans-serif
            font-size: 20px
            font-weight: normal
            height: 24px
            line-height: 24px
            margin: 0
            padding: 0
            -webkit-font-smoothing: antialiased
            width: 100%

    .Quote_Form
        padding: 0px 20px

    .Category
        margin-bottom: 35px

    .Category .Category_Title
        background: #E9E9E9
        color: #757575
        font-size: 14px
        margin-bottom: 35px
        padding: 12px 16px

    .Add_New_Button
        background: #db4437 !important
        bottom: 24px
        position: fixed !important
        right: 24px

</style>