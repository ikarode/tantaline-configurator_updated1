<template>

    <div class="Body">

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

        <div class="container" style="page-break-after: always;" v-if="quote.id">

            <div class="hidden-print clearfix" style="padding: 20px;">
                <div class="pull-right">
                    <button @click="goBack()" class="btn btn-default" style="margin-right: 5px;" type="button">Edit Quotation</button>
                    <button @click="print()" class="btn btn-default" type="button">Print</button>
                </div>
            </div>

            <quote-header title="PRODUCTION CARD" :quote="quote"></quote-header>

            <!-- Quote Breakdown -->
            <table class="table table-bordered">

                <!-- Table Header -->
                <thead>
                    <tr>
                        <th width="5%"></th>
                        <th width="15%">Part Number</th>
                        <th>Description</th>
                        <th width="5%">QTY</th>
                    </tr>
                </thead>

                <!-- Table Body -->
                <tbody>

                    <tr v-for="(part, index) in quote.parts">

                        <!-- Line Item Number -->
                        <td class="Line_Item_Number">{{ index + 1 }}</td>

                        <!-- Part Number -->
                        <td class="Part_Number">{{quote.info.number}}.{{ String(index + 1) | leftPad(2, '0') }}</td>

                        <!-- Part Breakdown -->
                        <part-info :part="part"></part-info>

                        <!-- Part Quantity -->
                        <td class="Quantity">{{ quantity(part) }}</td>

                    </tr>

                </tbody>

            </table>

        </div>

    </div>
    
</template>

<script>
    import QuoteHeader from '@/components/Quote_Header'
    import TermsHeader from '@/components/Terms_Header'
    import PartInfo from '@/components/Part_Info'
    import _ from 'lodash'

    export default
    {
        components: { QuoteHeader, TermsHeader, PartInfo },

        data()
        {
            return {
                quote: {},
                euro: 0.94,
            }
        },

        mounted()
        {
            let quotes = JSON.parse(localStorage.getItem('quotes'));

            this.quote = _.find(quotes, (quote, index) => {
                this.index = index;
                return this.$route.params.quote_id == quote.id;
            });
        },

        methods:
        {
            goBack() 
            {
                this.$router.push('/quotes/' + this.quote.id + '/edit');
            },

            print()
            {
                window.print();
            },

            quantity(part)
            {
                let quantity = null;

                _.forEach(part.configuration, category => {
                    _.forEach(category.configurations, configuration => {
                        if (configuration.label == 'Part Quantity')
                            quantity = configuration.value
                    })
                })

                return quantity
            }
        },

        computed:
        {
            isDenmark()
            {
                return this.quote.info.invoicing.country == 'Denmark'
            },

            isUSA()
            {
                return this.quote.info.invoicing.country == 'USA'
            }
        }
    }

</script>

<style lang="stylus" scoped>

    .Body
        background: white !important
        color: #333333 !important
        font-family: Helvetica Neue,Helvetica,Arial,sans-serif !important
        padding-bottom: 100px;

        p
            color: #333333 !important
            font-size: 14px
            line-height: 1.5
            margin-bottom: 0 !important

        .table thead > tr
            height: auto !important

        .table thead > tr > th
            padding: 8px !important 
            text-align: center
        
        table > tbody > tr > td.Line_Item_Number,
        table > tbody > tr > td.Part_Number,
        table > tbody > tr > td.Quantity,
        table > tbody > tr > td.Unit_Price,
        table > tbody > tr > td.Price
            text-align: center

</style>