import request from "src/service/request";

export function ReservarHorario(data) {
  return request({
    url: `/reserva`,
    method: "post",
    data: data,
  });
}
