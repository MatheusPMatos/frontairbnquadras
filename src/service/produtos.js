import request from "src/service/request";

export function ListarProdutos() {
  return request({
    url: "/products",
    method: "get",
  });
}

export function CriarProduto(product) {
  return request({
    url: "/products",
    method: "post",
    data: product,
  });
}

export function EditarProduto(product) {
  return request({
    url: "/products",
    method: "put",
    data: product,
  });
}

export function DeletarProduto(id) {
  return request({
    url: `/products/${id}`,
    method: "delete",
  });
}
