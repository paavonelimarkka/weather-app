import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Result from "../views/Result.vue";
import FavResults from "../views/FavResults.vue";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/result/:municipality",
    name: "Result",
    component: Result
  },
  {
    path: "/favorites",
    name: "FavResults",
    component: FavResults
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
