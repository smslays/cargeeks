export default {
  serverBaseURL: "http://localhost:9999",
  countryServerURL: "https://api.countrystatecity.in/v1",
  countryAPIKey: "ZFRFYzRrZm44V0RHcnFyNFE0NUlMNkhvRXo5M1BPcDBFN1ZiZW4wYg==",
  api: {
    users: {
      create: "/users",
      update: "/users/",
      delete: "/users/",
      getOne: "/users/",
      getAll: "/users",
    },
    auth: {
      login: "/auth/user-login",
      validateToken: "/auth/validate-token",
      refreshToken: "/auth/refresh-token",
      resetPassword: "/auth/password-reset-link",
    },
    post: {
      create: "/post",
      update: "/post/",
      delete: "/post/",
      getOne: "/post/",
      getAll: "/post",
      getFilterDetails: "/post/filter-details",
    },
  },
};
