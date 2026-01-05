import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../components/dashboard.vue";
import Login from "../components/Login.vue";
import Category from "../components/Category.vue";
import ContactUs from "../components/ContactUs.vue";
import AboutUs from "../components/AboutUs.vue";
import Role from "../components/Role.vue";
import MainView from "../components/MainView.vue";
import Product from "../components/Product.vue";

const routes = [
  {
    path: "/",
    redirect: "/Login",
  },
  {
    path: "/Login",
    component: Login,
  },
  {
    path: "/dashboard",
    component: MainView,
    children: [
      { path: "", component: Dashboard},
      { path: "Category", component: Category },
      { path: "Product", component: Product },
      { path: "AboutUs", component: AboutUs },
      { path: "ContactUs", component: ContactUs },
      { path: "Role", component: Role },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
