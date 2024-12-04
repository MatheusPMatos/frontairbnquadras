// src/store/index.js
import { createStore } from "vuex";
import Notifications from "./modules/Notifications";
import user from "./modules/user";
import usersApp from "./modules/usersApp";

export default createStore({
  modules: {
    Notifications,
    user,
    usersApp,
  },
});
