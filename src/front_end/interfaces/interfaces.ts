import { StatusPagamento } from "../enums/StatusPagamento";

export interface PagamentoResponse {
  valorTotal: number;
  mesPagamento: string;
  status: StatusPagamento;
  quantidadePagamentos: number;

}