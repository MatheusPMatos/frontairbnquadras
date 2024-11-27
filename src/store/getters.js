const getters = {
  notifications: (state) => state.notifications.notifications,
  isSuporte: (state) => state.user.isSuporte,
  isAdmin: (state) => state.user.isAdmin,
};
export default getters;
