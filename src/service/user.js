import request from "src/service/request";

export function CreateUser(user) {
  return request({
    url: "/user",
    method: "post",
    data: user,
  });
}
