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

            <quote-header title="ORDER CONFIRMATION" :quote="quote"></quote-header>

            <!-- Quote Breakdown -->
            <table class="table table-bordered">

                <!-- Table Header -->
                <thead>
                    <tr>
                        <th width="5%"></th>
                        <th width="15%">Part Number</th>
                        <th>Description</th>
                        <th width="5%">QTY</th>
                        <th width="15%" v-if="isDenmark">Unit Cost (EUR)</th>
                        <th width="15%" v-if="isUSA">Unit Cost (USD)</th>
                        <th width="15%" v-if="isDenmark">Price (EUR)</th>
                        <th width="15%" v-if="isUSA">Price (USD)</th>
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

                        <!-- Part Unit Price -->
                        <td class="Unit_Price" v-if="isDenmark">
                            &euro; {{ numeral(price(part) * euro).format('0,0') }}
                        </td>
                        <td class="Unit_Price" v-if="isUSA">
                            {{ numeral(price(part)).format('$ 0,0') }}
                        </td>

                        <!-- Part Total -->
                        <td class="Price" v-if="isDenmark">
                            &euro; {{ numeral(price(part) * quantity(part) * euro).format('0,0') }}
                        </td>
                        <td class="Price" v-if="isUSA">
                            {{ numeral(price(part) * quantity(part)).format('$ 0,0') }}
                        </td>

                    </tr>

                    <tr>

                        <td colspan = "5" align = "right" class="Contact_Info" v-if="quote.info.invoicing.country == 'Denmark'">Total EUR Excl. VAT</td>
                        <td colspan = "5" align = "right" class="Contact_Info" v-else> Total USD Excl. VAT </td>
                       
                    </tr>

                    <tr>

                        <td colspan = "5" align = "right">VAT Amount</td>
                        <!--<td><v-text-field label=" " v-model="quote.info.bill_to.VAT"></v-text-field></td>-->

                    </tr>

                     <tr>
                         <td colspan = "5" align = "right" class="Contact_Info" v-if="quote.info.invoicing.country == 'Denmark'"><strong>Total EUR Incl. VAT</strong></td>
                         <td colspan = "5" align = "right" class="Contact_Info" v-else><strong>Total USD Incl. VAT</strong></td>
                         <td>{{ numeral(total).format('$ 0,0') }}</td>
        
                     </tr>




                </tbody>

            </table>

        </div>

        <div class="container" v-if="quote.id">

            <terms-header :quote="quote"></terms-header>

            <br><br>

            <p v-if="isDenmark">All quotes are valid for 30 days and must be confirmed with a customer PO and a Tantaline CVD ApS order acknowledgement.  All customer parts received for treatment must be received in “ready to process” condition or additional charges may be applied upon inspection.</p>

            <p v-if="isUSA">All quotes are valid for 30 days and must be confirmed with a Customer PO and a Tantaline CVD order acknowledgement.  All Customer parts received for treatment must be received in “ready to process” condition or additional charges may be applied upon inspection.</p>

            <br><br>

            <p style="text-decoration: underline;">Purchase Order Placement</p>

            <br>

            <p v-if="isDenmark"><strong>All Customer purchase orders must reference a valid Tantaline CVD ApS quotation number and will not otherwise be accepted by Tantaline CVD ApS.</strong></p>

            <p v-if="isUSA"><strong>All Customer purchase orders must reference a valid Tantaline CVD quotation number and will not otherwise be accepted by Tantaline CVD.</strong></p>

            <br>

            <p v-if="isDenmark"><strong>All Customer purchase orders must reference Customer shipping account details, unless alternative shipping terms are expressly requested in writing by Customer and agreed to in writing by Tantaline CVD ApS.</strong></p>

            <p v-if="isUSA"><strong>All Customer purchase orders must reference Customer shipping account details, unless alternative shipping terms are expressly requested in writing by Customer and agreed to in writing by Tantaline CVD.</strong></p>

            <br><br>

            <p style="text-decoration: underline;">Terms of Payment</p>

            <br>

            <p>Payment in advance for first time orders or Credit Cards accepted at time of order.</p>
            <p>All orders may be subject to a 3% administrative processing fee.</p>
            <p>PO Terms are Net 30 subject to credit approval; Credit approval may cause delays in processing of order.</p>

            <br>

            <p v-if="isDenmark">Purchase Orders should be made to: <strong>Tantaline CVD ApS</strong></p>
            <p v-if="isUSA">Purchase Orders should be made to: <strong>Tantaline CVD</strong></p>

            <p>To submit purchase orders, obtain payment information or to arrange for payment in advance please contact:</p>

            <br>

            <div style="margin-left: 45px;">
            
                <p style="text-decoration: underline;">Customer Service</p>

                <p v-if="isDenmark"><strong>Email:</strong> europe@tantaline.com</p>
                <p v-if="isDenmark"><strong>Phone:</strong> +45 700 200 679</p>
                <p v-if="isDenmark"><strong>Fax:</strong> +45 70 200 689</p>

                <p v-if="isUSA"><strong>Email:</strong> america@tantaline.com</p>
                <p v-if="isUSA"><strong>Phone:</strong> +1 631 981 7081</p>
                <p v-if="isUSA"><strong>Fax:</strong> +1 631 981 7095</p>

            </div>

            <br><br><br><br>

            <p>The Purchaser shall comply with all applicable export laws and regulations of the United States and all other relevant jurisdictions when it exports or re-exports, directly or indirectly, any product, information, or technology provided by the Seller that is export controlled by the International Traffic in Arms Regulations (ITAR) and/or the Export Administration Regulations (EAR), pursuant to 22 CFR Part 120-130 and 15 CFR Parts 730-774, respectively.  Notwithstanding the above, the Purchaser shall under no circumstances export or re-export any product, information, or technology provided by the Seller without prior written consent of the Seller.  The Purchaser shall indemnify, defend, and hold the Seller harmless from all claims, demands, damages, costs, fines, penalties, attorney’s fees, and other expenses arising from failure of the Purchaser to comply with this paragraph.</p>

            <br><br>

            <p v-if="isDenmark"><strong>Your Acceptance of Tantaline CVD ApS Terms and Conditions of Sale</strong></p>
            <p v-if="isUSA"><strong>Your Acceptance of CVD Materials Terms and Conditions</strong></p>

            <p v-if="isDenmark">Unless otherwise expressly agreed in a writing signed by you and an authorized representative of Tantaline CVD ApS (“Tantaline”), the terms and conditions you receive from us relating to your purchase, including but not limited to the quotation, order confirmation, packing list or invoice which we provide, constitute the exclusive and complete agreement between you and Tantaline. In the event of any conflict between the provisions of Tantaline Terms and Conditions and the provisions set forth in any documentation you receive from us or you provide, the provisions of the Tantaline Terms and Conditions shall prevail. Our acceptance of any order submitted by you is expressly subject to your acceptance of the Tantaline Terms and Conditions which may be evidenced solely by placement of a purchase order or by your acceptance of any services or products ordered.  Any additional, or conflicting terms or conditions in any document or communication you submit to us are rejected and shall have no effect unless we agree to them in a writing signed and sent to you by our authorized representative.</p>

            <p v-if="isUSA">Unless otherwise expressly agreed in a writing signed by you and an authorized representative of CVD Materials Corporation (CVD), the terms and conditions you receive from us relating to your purchase, including but not limited to the quotation, order acknowledgement, packing list or invoice which we provide, constitute the exclusive and complete agreement between you and CVD. In the event of any conflict between the provisions of CVD Terms and Conditions and the provisions set forth in any documentation you receive from us or you provide, the provisions of the CVD Terms and Conditions shall prevail.  Our acceptance of any order submitted by you is expressly subject to your acceptance of the CVD Terms and Conditions which may be evidenced solely by placement of a purchase order or by your acceptance of any services or products ordered.  Any additional, or conflicting terms or conditions in any document or communication you submit to us are rejected and shall have no effect unless we agree to them in a writing signed and sent to you by our authorized representative.</p>

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
            },

            price(part)
            {
                let price = 0;

                _.forEach(part.configuration, category => {
                    _.forEach(category.configurations, configuration => {

                        if (configuration.pricing.formula)
                            price = price + eval(configuration.pricing.formula.trim())

                        if (typeof(configuration.value) == 'object') {

                            if (configuration.value.pricing.formula != '') {
                                configuration = configuration.value
                                price = price + eval(configuration.pricing.formula.trim())
                            }
                        }
                    })
                })

                return Math.ceil(price / 10) * 10;
            },
            total: function()
            {
                    let sum = 0;

                    sum = sum + numeral(price(part) * quantity(part) * euro).format('0,0')
                    return this.sum
                
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