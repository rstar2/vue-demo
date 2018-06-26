export const NamedViews = {
    template: `
        <div>
          <h2>Named views</h2>

          <h3>Main view</h3>
          <router-view></router-view>
          <hr>
          <h3>Sidebar view</h3>
          <router-view name="sidebar"></router-view>
        </div>
    `,
};
export const MainChild = { template: '<div>Named main component</div>' };
export const SideBarChild = { template: '<div>Named sidebar component</div>' };
