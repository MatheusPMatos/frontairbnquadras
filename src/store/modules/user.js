import { RealizarLogin } from "../../service/login";
import { Notify, Dark } from "quasar";

const user = {
  state: {
    token: null,
    isAdmin: false,
    isSuporte: false,
  },
  mutations: {
    SET_IS_SUPORTE(state, payload) {
      const domains = ["@"];
      let authorized = false;
      domains.forEach((domain) => {
        if (
          payload?.email
            .toLocaleLowerCase()
            .indexOf(domain.toLocaleLowerCase()) !== -1
        ) {
          authorized = true;
        }
      });
      state.isSuporte = authorized;
    },
    SET_IS_ADMIN(state, payload) {
      state.isAdmin = !!(state.isSuporte || payload.profile === "admin");
    },
  },
  actions: {
    async UserLogin({ commit, dispatch }, user) {
      user.email = user.email.trim();
      console.log("BATEU AQUI");
      try {
        const { data } = await RealizarLogin(user);
        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("username", data.username);
        localStorage.setItem("profile", data.profile);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("usuario", JSON.stringify(data));

        if (data?.configs?.isDark) {
          Dark.set(data.configs.isDark);
        }
        commit("SET_IS_SUPORTE", data);
        commit("SET_IS_ADMIN", data);

        Notify.create({
          type: "positive",
          message: "Login realizado com sucesso!",
          position: "top",
          progress: true,
        });

        if (data.profile === "admin") {
          this.$router.push({
            name: "home-dashboard",
          });
        } else {
          this.$router.push({
            name: "atendimento",
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
