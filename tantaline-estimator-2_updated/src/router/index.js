import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Quote from '@/components/Quote'
import Template_Builder from '@/components/Template_Builder'
import Customer_Quote from '@/components/Customer_Quote'
import Production_Card from '@/components/Production_Card'
import Order_confirmation from '@/components/Order_confirmation'

Vue.use(Router)

export default new Router({
    routes: 
    [
        { path: '/',                                component: Home },
        { path: '/quotes/:quote_id/edit',           component: Quote },
        { path: '/config',                          component: Template_Builder },
        { path: '/reports/customer/:quote_id',      component: Customer_Quote },
        { path: '/reports/production/:quote_id',    component: Production_Card },
        {path:  '/reports/order/:quote_id',         component: Order_confirmation}
    ]
})
