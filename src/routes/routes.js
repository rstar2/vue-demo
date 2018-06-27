import { Simple, SimpleOther } from './pages/simple';
import { User } from './pages/params';
import { Profile } from './pages/props';
import { Nested, NestedChildA, NestedChildB } from './pages/nested';
import { NamedViews, MainChild, SideBarChild } from './pages/named';
import DataFetchAfter from './pages/data-fetch/AfterNavigation.vue';
import DataFetchBefore from './pages/data-fetch/BeforeNavigation.vue';

const NotFoundComponent = {
    template: '<div>404 Page Not Found</div>',
};

// Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
const routes = [
    {
        path: '',
        redirect: '/simple'
    },

    {
        // dynamic params/segments start with a colon
        path: '/simple/',
        component: Simple
    },
    {
        // visiting 'simple-other' or '/superFunkyName' is the same - the url will not change
        path: '/simple-other',
        alias: '/superFunkyName',
        component: SimpleOther
    },

    {
        // dynamic params/segments start with a colon
        path: '/user/:id?',
        name: 'user',
        component: User
    },

    {
        path: '/profile/:id?',
        component: Profile,
        // pass the params as props
        props: true,
    },
    {
        path: '/admin',
        component: Profile,
        // fixed props - pass as object
        props: { id : 'Admin'},
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
                    default: MainChild,
                    sidebar: SideBarChild,
                }
            }
        ]
    },

    {
        path: '/lazy',
        component: () => import ('./pages/lazy/Lazy.vue')
    },

    {
        path: '/data-fetch/after/:id',
        component: DataFetchAfter
    },

    {
        path: '/data-fetch/before/:id',
        component: DataFetchBefore
    },

    // Fallback - show this component if previously the route is not matched
    { path: '*', component: NotFoundComponent }
];

export default routes;
