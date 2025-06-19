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
  dataRealizar: string;
  DataCriado: Date;
}

export interface ICriacaoTarefa{
  descricao: string;
  dataRealizar: string;
  usuarioId?: number |  null |  undefined;
  DataCriado?: string
 }
