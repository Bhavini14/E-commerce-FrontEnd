import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../components/dashboard.vue";
import Login from "../components/Login.vue";
import Category from "../components/Category.vue";
import ContactUs from "../components/ContactUs.vue";
import AboutUs from "../components/AboutUs.vue";
import Role from "../components/Role.vue";
import MainView from "../components/MainView.vue";
import Product from "../components/Products/Product.vue";
import AddProduct from "../components/Products/AddProduct.vue";
import ViewProduct from "../components/Products/ViewProduct.vue";
import EditProduct from "../components/Products/EditProduct.vue";

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
      { path: "AddProduct", component: AddProduct },
      { path: "ViewProduct", component: ViewProduct },
      { path: "EditProduct/:id", component: EditProduct },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
