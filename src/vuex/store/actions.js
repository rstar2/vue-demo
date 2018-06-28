export default {
    // by default actions are expected to return a Promise
    // so even if not returning explicitly it will be as if Promise.resolve() is returned

    // sync
    changeBy(context, payload) {
        // call the mutation directly
        context.commit('changeBy', payload);

        // a  Promise.resolve() will be returned when called this.$store.dispatch("changeBy")
        // even if skipped as if we returned it explicitly
        // return Promise.resolve();
    },

    // async - can return
    add(context, payload) {
        // could call an external API or whatever async
        return new Promise((resolve) => {
            setTimeout(() => {
                // call the mutation when desired
                context.commit('add', payload);
                resolve();
            }, 2000);
        });
    },
};
