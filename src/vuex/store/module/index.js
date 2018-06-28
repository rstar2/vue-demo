export default {
    state: {
        data: []
    },
    mutations: {
        addDog(state, dog) {
            state.data.push(dog);
        }
    }
};
