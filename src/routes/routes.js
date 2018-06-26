//  Define route components.
// These can be imported from other files
const User = { template: '<div>User component</div>' };
const Bar = { template: '<div>bar</div>' };

const Nested = {
    template: `
        <div>
          <h2>Nested {{ $route.params.id }}</h2>
          <p>
            <router-link to="/nested/child-a">Go to Nested child A</router-link>
            <router-link to="/nested/child-b">Go to Nested child B</router-link>
            <router-link to="/bar">Go to parent Bar</router-link>
          </p>
          <router-view></router-view>
        </div>
    `,
};
const NestedChildA = { template: '<div>NestedChildA</div>' };
const NestedChildB = { template: '<div>NestedChildB</div>' };

const NamedViews = {
    template: `
        <div>
          <h2>Named views</h2>

          <h3>Default view</h3>
          <router-view></router-view>
          <hr>
          <h3>Sidebar view</h3>
          <router-view name="sidebar"></router-view>
        </div>
    `,
};
const NamedChild = { template: '<div>Named default</div>' };
const SideBarChild = { template: '<div>Named SideBarChild</div>' };

// Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
    {
        // dynamic params/segments start with a colon
        path: '/user/:username',
        component: User
    },
    {
        path: '/bar',
        component: Bar
    },
    {
        path: '/nested',
        component: Nested,
        children: [
            {
                path: '',
                // component: NestedHome
            },
            {
                // NestedChildA will be rendered inside Nested's <router-view>
                // when /nested/child-a is matched
                path: 'child-a',
                component: NestedChildA
            },
            {
                // NestedChildB will be rendered inside Nested's <router-view>
                // when /nested/child-a is matched
                path: 'child-b',
                component: NestedChildB
            }
        ]
    },
    {
        path: '/named',
        component: NamedViews,
        children: [
            {
                path: '',
                components: {
                    default: NamedChild,
                    sidebar: SideBarChild,
                }
            }
        ]

    },
];

export default routes;
