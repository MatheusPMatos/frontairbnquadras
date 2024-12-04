import request from "src/service/request";

export function RealizarLogin(user) {
  return request({
    url: "/user/auth",
    method: "post",
    data: user,
  });
}

export function RealizarLogout(user) {
  return request({
    url: "/user/logout/",
    method: "post",
    data: user,
  });
}

export function RefreshToken() {
  return request({
    url: "/user/refresh_token",
    method: "post",
  });
}
