<template>

    <header class="Header">

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

    </header>
    
</template>

<script>

    export default 
    {
        props: ['quote']
    }

</script>

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
            font-weight: 300
            font-family: 'Roboto', sans-serif
            letter-spacing: 1px

    .Logo 
        height: 125px

    .quote
        margin-bottom: 20px

    p
        margin: 0 0 4px !important
    

</style>