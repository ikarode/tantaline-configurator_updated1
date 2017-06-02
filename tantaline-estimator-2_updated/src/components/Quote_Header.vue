<template>

    <header class="Header">

        <div class="row">

            <div class="col-xs-12">
                <h2 class="pull-right">{{ title }}</h2>
            </div>

        </div>

        <div style="display: flex; align-items: flex-end;">

            <img class="Logo" src="../assets/logo.svg" alt="Logo">

            <div style="margin-left: auto; text-align: right;" v-if="quote.info.invoicing.country == 'Denmark'">
                <p>Tantaline CVD ApS</p>
                <br>
                <p>Solutions for Conquering Corrosion.</p>
            </div>

            <div style="margin-left: auto; text-align: right;" v-else>
                <p>CVD Materials Corporation</p>
                <br>
                <p><em>enabling tomorrow's technologies&trade;</em></p>
            </div>

        </div>

        <hr>

        <div class="Contact_Info" v-if="quote.info.invoicing.country == 'Denmark'">
            <small>Nordborgvej 81-L3, DK-6430 Nordborg Denmark | <strong>T</strong> +45 700 200 679 | <strong>F</strong> +45 70 200 689 | sales@tantaline.com</small>
        </div>

        <div class="Contact_Info" v-else>
            <small>355 South Technology Drive, Central Islip, New York 11722 | <strong>T</strong> 631.981.7081 | <strong>F</strong> 631.981.7095 | sales@tantaline.com</small>
        </div>

        <div class="quote row">

            <div class="col-xs-4">

                <p><strong>Bill To: <!-- {{ quote.info.bill_to.contact }} --></strong></p>
                <p>{{ quote.info.bill_to.contact }}</p>
                <p>{{ quote.info.bill_to.street }}</p>
                <p>{{ quote.info.bill_to.city }} {{ quote.info.bill_to.state }} {{ quote.info.bill_to.zip }}</p>
                <p>{{ quote.info.bill_to.country }}</p>

            </div>

            <div class="col-xs-4">
                <p><strong>Ship To: <!-- {{ quote.info.ship_to.contact }} --></strong></p>
                <p>{{ quote.info.ship_to.contact }}</p>
                <p>{{ quote.info.ship_to.street }}</p>
                <p>{{ quote.info.ship_to.city }} {{ quote.info.ship_to.state }} {{ quote.info.ship_to.zip }}</p>
                <p>{{ quote.info.ship_to.country }}</p>
            </div>

            <div class="col-xs-4">

                <div class="row">
                    <div class="col-xs-6"><p><strong>Date:</strong></p></div>
                    <div class="col-xs-6"><p><strong>{{ quote.info.date }}</strong></p></div>
                </div>

                <br>

                <div class="row">
                    <div class="col-xs-6"><p><strong>Quotation Number:</strong></p></div>
                    <div class="col-xs-6"><p>{{ quote.info.number }}.00</p></div>
                </div>

                 <div class="row">
                    <div class="col-xs-6"><p><strong>Order Number:</strong></p></div>
                    <div class="col-xs-6"><p>{{ quote.info.order_number }}</p></div>
                </div>

                 <div class="row">
                    <div class="col-xs-6"><p><strong>Order Date:</strong></p></div>
                    <div class="col-xs-6"><p>{{ quote.info.order_date }}</p></div>
                </div>

                <div class="row">
                    <div class="col-xs-6"><p><strong>Customer Name:</strong></p></div>
                    <div class="col-xs-6"><p>{{ quote.info.customer.name }}</p></div>
                </div>

                <div class="row">
                    <div class="col-xs-6"><p><strong>Customer Number:</strong></p></div>
                    <div class="col-xs-6"><p>{{ quote.info.customer.number }}</p></div>
                </div>

                <div class="row">
                    <div class="col-xs-6"><p><strong>Revision:</strong></p></div>
                    <div class="col-xs-6"><p>{{ quote.info.revision.term }}</p></div>
                </div>

                <div class="row">
                    <div class="col-xs-6"><p><strong>Salesperson:</strong></p></div>
                    <div class="col-xs-6"><p>{{ quote.info.salesperson.name }}</p></div>
                </div>

                <div class="row">
                    <div class="col-xs-6"><p><strong>Customer Reference:</strong></p></div>
                    <div class="col-xs-6"><p>{{ quote.info.ship_to.Reference }}</p></div>
                </div>

                <div class="row">
                    <div class="col-xs-6"><p><strong>Delivery Terms:</strong></p></div>
                    <div class="col-xs-6"><p>{{ quote.info.delivery_terms.term }}</p></div>
                </div>

                <div class="row">
                    <div class="col-xs-6"><p><strong>Ship Date:</strong></p></div>
                    <div class="col-xs-6"><p>{{ quote.info.shipment_date }}</p></div>
                </div>

                <div class="row">
                    <div class="col-xs-6"><p><strong>Payment Terms:</strong></p></div>
                    <div class="col-xs-6"><p>{{ quote.info.payment_terms.term }}</p></div>
                </div>

            </div>

        </div>

    </header>

</template>

<style lang="stylus" scoped>

    .Header 
        padding: 20px 0px

        hr
            border: 0;
            border-top: 1px solid #eee;
            margin-bottom: 0
            margin-top: 20px;

        .Contact_Info 
            margin-top: 5px
            margin-bottom: 55px
            text-align: center
            word-spacing: 2px
            font-weight: 800
            font-family: 'calibri light', sans-serif
            letter-spacing: 1px
        
    .Logo 
        height: 125px

    .quote
        margin-bottom: 20px

    p
        margin: 0 0 4px !important
    .pull-right
        font-weight: 600
</style>

<script>

    export default 
    {
        props: ['quote', 'title']
    }

</script>