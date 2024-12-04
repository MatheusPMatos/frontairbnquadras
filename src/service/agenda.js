import request from "src/service/request";

export function ListarHorarios(data, id) {
  return request({
    url: `/schedule/${id}`,
    method: "post",
    data: data,
  });
}
