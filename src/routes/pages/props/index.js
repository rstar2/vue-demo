export const User = {
    template: `
        <div>
          <h2>ID - {{$route.params.id}}</h2>

          <h3>Hello {{username}}</h3>
        </div>
    `,
    computed: {
        // By injecting the router, we get access to it as this.$router
        // as well as the current route as this.$route inside of any component:
        username() {
            return this.$route.params.id ? this.$route.params.id.toUpperCase() : 'GUEST';
        },
    }
};
