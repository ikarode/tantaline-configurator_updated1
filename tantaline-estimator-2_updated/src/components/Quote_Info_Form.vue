<template>
    <div>
        <!-- Quote Info -->
        <div class="Category" v-if="quote.info">

            <div class="Category_Title">General</div>

            <div class="Quote_Form">

                <v-row row>
                    <v-col xs8>
                        <!-- Quote Number -->
                        <v-text-field label="Quote Number" v-model="quote.info.number"></v-text-field>
                    </v-col>
                </v-row>

                <v-row row>
                    <v-col xs8>
                        <!-- Quote Date -->
                        <v-menu 
                            lazy
                            :close-on-content-click="true"
                            transition="v-scale-transition"
                            offset-y>
                            <v-text-field 
                                slot="activator"
                                label="Quote Date"
                                v-model="quote.info.date"
                                readonly>
                            </v-text-field>
                            <v-date-picker v-model="quote.info.date" no-title scrollable actions>
                                <template scope="{ save, cancel }">
                                    <v-card-row actions>
                                        <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                                        <v-btn flat primary @click.native="save()">Save</v-btn>
                                    </v-card-row>
                                </template>
                            </v-date-picker>
                        </v-menu>
                    </v-col>
                </v-row>

                
                <v-row row>
                    <v-col xs8>
                        <!-- Order Number -->
                        <v-text-field label="Order Number" v-model="quote.info.order_number"></v-text-field>
                    </v-col>
                </v-row>

                <v-row row>
                    <v-col xs8>
                        <!-- Order Date -->
                        <v-menu 
                            lazy
                            :close-on-content-click="true"
                            transition="v-scale-transition"
                            offset-y>
                            <v-text-field 
                                slot="activator"
                                label="Order Date"
                                v-model="quote.info.order_date"
                                readonly>
                            </v-text-field>
                            <v-date-picker v-model="quote.info.order_date" no-title scrollable actions>
                                <template scope="{ save, cancel }">
                                    <v-card-row actions>
                                        <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                                        <v-btn flat primary @click.native="save()">Save</v-btn>
                                    </v-card-row>
                                </template>
                            </v-date-picker>
                        </v-menu>
                    </v-col>
                </v-row>

                <v-row row>
                    <v-col xs8>
                        <!-- Customer Name -->
                        <v-text-field label="Customer Name" v-model="quote.info.customer.name"></v-text-field>
                    </v-col>
                </v-row>

                <v-row row>
                    <v-col xs8>
                        <!-- Customer Number -->
                        <v-text-field label="Customer Number" v-model="quote.info.customer.number"></v-text-field>
                    </v-col>
                </v-row>

               <v-row row>
                    <v-col xs8>
                        <!-- Revision -->
                        <v-select 
                            v-bind:items="revision"
                            v-model="quote.info.revision"
                            label="Revision"
                            item-text="term"
                            item-value="term"
                            light
                            auto>
                        </v-select>
                    </v-col>
                </v-row>


                <v-row row>
                    <v-col xs8>
                        <!-- Salesperson -->
                        <v-select 
                            v-bind:items="[{name: 'Cameron Gottlieb'}, {name: 'James Acquaviva'}, {name: 'Matt Raskin'},{name: 'Ishaan Karode '},{name: 'Dan Gramm'},{name: 'Eric Seekins'}]"
                            v-model="quote.info.salesperson"
                            label="Salesperson"
                            item-text="name"
                            item-value="name"
                            light
                            auto>
                        </v-select>
                    </v-col>
                </v-row>

                <v-row row>
                    <v-col xs5>
                        <v-text-field label="Customer Reference" v-model="quote.info.ship_to.Reference"></v-text-field>
                    </v-col>
                </v-row>

            </div>

        </div>

        <!-- Bill To Info -->
        <div class="Category" v-if="quote.info">

            <div class="Category_Title">Bill To</div>

            <div class="Quote_Form">

                <v-row row>
                    <!-- Bill To Contact -->
                    <v-col xs8>
                        <v-text-field label="Bill To Contact" v-model="quote.info.bill_to.contact"></v-text-field>
                    </v-col>
                </v-row>

                <v-row row>
                    <!-- Bill To CompanyName -->
                    <v-col xs8>
                        <v-text-field label="Company Name" v-model="quote.info.bill_to.company"></v-text-field>
                    </v-col>
                </v-row>

                <v-row row>
                    <v-col xs8>
                        <v-text-field label="Street" v-model="quote.info.bill_to.street"></v-text-field>
                    </v-col>
                </v-row>

                <v-row row>
                    <v-col xs3>
                        <v-text-field label="City" v-model="quote.info.bill_to.city"></v-text-field>
                    </v-col>
                    <v-col xs2>
                        <v-text-field label="State" v-model="quote.info.bill_to.state"></v-text-field>
                    </v-col>
                    <v-col xs3>
                        <v-text-field label="Zip" v-model="quote.info.bill_to.zip"></v-text-field>
                    </v-col>
                </v-row>

                <v-row row>
                    <v-col xs3>
                        <v-text-field label="County" v-model="quote.info.bill_to.county"></v-text-field>
                    </v-col>
                    <v-col xs5>
                        <v-text-field label="Country" v-model="quote.info.bill_to.country"></v-text-field>
                    </v-col>
                </v-row>

                <v-row row>
                    <v-col xs3>
                        <v-text-field label="Phone" v-model="quote.info.bill_to.Phone"></v-text-field>
                    </v-col>
                    <v-col xs5>
                        <v-text-field label="Email" v-model="quote.info.bill_to.Email"></v-text-field>
                    </v-col>
                </v-row>

                <v-row row>
                    <v-col xs5>
                        <v-text-field label="Accounts Payable Email" v-model="quote.info.bill_to.Accounts"></v-text-field>
                    </v-col>
                </v-row>

                <v-row row>
                    <v-col xs8>
                        <!-- Invoicing -->
                        <v-select 
                            v-bind:items="[{country: 'Denmark'}, {country: 'USA'}]"
                            v-model="quote.info.invoicing"
                            label="Invoicing Location"
                            item-text="country"
                            item-value="country"
                            light
                            auto>
                        </v-select>
                    </v-col>
                </v-row>

                <v-row row>
                    <v-col xs8>
                        <!-- Payment Terms -->
                        <v-select 
                            v-bind:items="payment_terms"
                            v-model="quote.info.payment_terms"
                            label="Payment Terms"
                            item-text="term"
                            item-value="term"
                            light
                            auto>
                        </v-select>
                    </v-col>
                </v-row>

            </div>

        </div>

        <!-- Ship To Info -->
        <div class="Category" v-if="quote.info">

            <div class="Category_Title">Ship To</div>

            <div class="Quote_Form">

                <v-row row>
                    <!-- Ship To Contact -->
                    <v-col xs8>
                        <v-text-field label="Ship To Contact" v-model="quote.info.ship_to.contact"></v-text-field>
                    </v-col>
                </v-row>

                <v-row row>
                    <!-- Ship To CompanyName -->
                    <v-col xs8>
                        <v-text-field label="Company Name" v-model="quote.info.bill_to.company"></v-text-field>
                    </v-col>
                </v-row>

                <v-row row>
                    <v-col xs8>
                        <v-text-field label="Street" v-model="quote.info.ship_to.street"></v-text-field>
                    </v-col>
                </v-row>

                <v-row row>
                    <v-col xs3>
                        <v-text-field label="City" v-model="quote.info.ship_to.city"></v-text-field>
                    </v-col>
                    <v-col xs2>
                        <v-text-field label="State" v-model="quote.info.ship_to.state"></v-text-field>
                    </v-col>
                    <v-col xs3>
                        <v-text-field label="Zip" v-model="quote.info.ship_to.zip"></v-text-field>
                    </v-col>
                </v-row>

                <v-row row>
                    <v-col xs3>
                        <v-text-field label="County" v-model="quote.info.ship_to.county"></v-text-field>
                    </v-col>
                    <v-col xs5>
                        <v-text-field label="Country" v-model="quote.info.ship_to.country"></v-text-field>
                    </v-col>
                </v-row>

                <v-row row>
                    <v-col xs3>
                        <v-text-field label="Phone" v-model="quote.info.ship_to.Phone"></v-text-field>
                    </v-col>
                    <v-col xs5>
                        <v-text-field label="Email" v-model="quote.info.ship_to.Email"></v-text-field>
                    </v-col>
                </v-row>

                <v-row row>
                    <v-col xs8>
                        <!-- Delivery Terms -->
                        <v-select 
                            v-bind:items="delivery_terms"
                            v-model="quote.info.delivery_terms"
                            label="Delivery Terms"
                            item-text="term"
                            item-value="term"
                            light
                            auto>
                        </v-select>
                    </v-col>
                </v-row>

                <v-row row>
                    <v-col xs8>
                        <!-- Ship Date -->
                        <v-menu 
                            lazy
                            :close-on-content-click="true"
                            transition="v-scale-transition"
                            offset-y>
                            <v-text-field 
                                slot="activator"
                                label="Shipment Date"
                                v-model="quote.info.shipment_date"
                                readonly>
                            </v-text-field>
                            <v-date-picker v-model="quote.info.shipment_date" no-title scrollable actions>
                                <template scope="{ save, cancel }">
                                    <v-card-row actions>
                                        <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                                        <v-btn flat primary @click.native="save()">Save</v-btn>
                                    </v-card-row>
                                </template>
                            </v-date-picker>
                        </v-menu>
                    </v-col>
                </v-row>

                <v-row row>
                    <v-col xs5>
                        <v-text-field label="Customer Carrrier" v-model="quote.info.ship_to.Carrier"></v-text-field>
                    </v-col>
                    <v-col xs5>
                        <v-text-field label="Customer Carrier Account Number" v-model="quote.info.ship_to.Number"></v-text-field>
                    </v-col>
                </v-row>

            </div>

        </div>

    </div>
</div>

</template>

<script>

    export default
    {
        props: ['quote'],

        data()
        {
            return {
                payment_terms: [
                    { term: 'Prepaid' },
                    { term: 'Net 7 Days' },
                    { term: 'Net 8 Days' },
                    { term: 'Net 30 Days' },
                    { term: 'Net 45 Days' },
                    { term: 'Net 60 Days' },
                    { term: 'Net 90 Days' }
                ],
                delivery_terms: [
                    { term: 'Ex-Works' },
                    { term: 'DAP' },
                    { term: 'DDP' },
                    { term: 'FCA' }
                ],
                revision:  [
                {term: 0},
                 {term: 1},
                  {term: 2},
                   {term: 3},
                    {term: 4},
                     {term: 5},
                      {term: 6},
                       {term: 7},
                        {term: 8},
                        {term: 9}
                ]
            }


        }
    }

</script>

<style lang="stylus" scoped>

</style>