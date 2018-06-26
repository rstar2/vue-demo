export const Nested = {
    template: `
        <div>
          <h2>Nested</h2>
          <p>
            <router-link to="/nested/child-a">Go to Nested child A</router-link>
            <router-link to="/nested/child-b">Go to Nested child B</router-link>
            <router-link to="/simple">Go to parent Simple</router-link>
          </p>
          <router-view></router-view>
        </div>
    `,
};
export const NestedChildA = { template: '<div>NestedChildA</div>' };
export const NestedChildB = { template: '<div>NestedChildB</div>' };
