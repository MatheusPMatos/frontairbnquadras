import { RealizarLogin } from "../../service/login";
import { Notify, Dark } from "quasar";

const user = {
  state: {
    token: null,
    isComprador: false,
    isVendedor: false,
  },
  mutations: {
    SET_IS_VENDEDOR(state, payload) {
      state.isAdmin = payload.profile === "vendedor";
    },
    SET_IS_COMPRADOR(state, payload) {
      state.isAdmin = payload.profile === "comprador";
    },
  },
  actions: {
    async UserLogin({ commit, dispatch }, user) {
      user.email = user.email.trim();
      try {
        const { data } = await RealizarLogin(user);
        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("username", data.username);
        localStorage.setItem("profile", data.profile);

        // if (data?.configs?.isDark) {
        //   Dark.set(data.configs.isDark);
        // }
        commit("SET_IS_VENDEDOR", data);
        commit("SET_IS_COMPRADOR", data);

        Notify.create({
          type: "positive",
          message: "Login realizado com sucesso!",
          position: "top",
          progress: true,
        });

        if (data.profile === "vendedor") {
          this.$router.push({
            path: "homev",
          });
        } else {
          this.$router.push({
            path: "home",
          });
        }
      } catch (error) {
        console.error(
          error,
          error.data.error === "ERROR_NO_PERMISSION_API_ADMIN"
        );
      }
    },
  },
};

export default user;
