export const state = {
    count: 0
};

export const getters = {
    count(state) {
        return state.count;
    },

    isEven(state) {
        return state.count % 2 !== 0;
    },

    // can return a return a function also
    isEqual(state) {
        return (val) => {
            return state.count === val;
        };
    }
};

export const mutations = {
    changeBy(state, { val }) {
        state.count = state.count + val;
    },

    add(state) {
        state.count= state.count + 1;
    },
};

