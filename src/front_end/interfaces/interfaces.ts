import { StatusPagamento } from "../enums/StatusPagamento";

export interface PagamentoResponse {
  valorTotal: number;
  mesPagamento: string;
  status: StatusPagamento;
  quantidadePagamentos: number;
}

export interface ITarefa{
  id: number;
  descricao: string;
  DataARealizar: Date;
  DataCriado: Date;
}
