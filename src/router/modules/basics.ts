const { VITE_HIDE_HOME } = import.meta.env;
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/basics",
  name: "Basics",
  component: Layout,
  redirect: "/basics/use",
  meta: {
    icon: "ep:home-filled",
    title: "基础"
  },
  children: [
    {
      path: "/basics/use",
      name: "BasicsUse",
      component: () => import("@/views/basics/index.vue"),
      meta: {
        title: "基础"
      }
    }
  ]
} satisfies RouteConfigsTable;
