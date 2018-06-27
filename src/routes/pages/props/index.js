export const Profile = {
    // don't couple to the this.$route
    // e.g. no need to use this.$route.params.id but instead pass the id as prop
    props: ['id'],

    template: `
        <div>
          <h2>ID - {{id}}</h2>

          <h3>Hello {{username}}</h3>
        </div>
    `,
    computed: {
        username() {
            return this.id ? this.id.toUpperCase() : 'GUEST';
        },
    }
};
