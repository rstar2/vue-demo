import Vue from 'vue';

import Vuex from 'vuex';
Vue.use(Vuex);

import { state, getters, mutations } from './state';
import actions from './actions';

import dogs from './module';

const store = new Vuex.Store({
    state,
    getters,
    mutations,

    actions,

    modules: {
        dogs
    },

    strict: process.env.NODE_ENV !== 'production',
});

export default store;
