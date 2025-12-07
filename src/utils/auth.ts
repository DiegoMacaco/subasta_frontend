export const authUtils = {
  getCurrentUser: () => {
    const user = localStorage.getItem("current_user");
    return user ? JSON.parse(user) : null;
  },

  saveUser: (user: any) => {
    localStorage.setItem("current_user", JSON.stringify(user));
  },

  logout: () => {
    localStorage.removeItem("current_user");
  }
};
