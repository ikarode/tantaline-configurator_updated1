import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({

    state:
    {
        configuration: []
    },

    getters:
    {
        configuration(state)
        {
            return state.configuration;
        }
    },

    mutations:
    {
        setConfiguration(state, configuration)
        {
            return state.configuration = configuration;
        }
    }

});

export default store;