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
 export interface ClienteDTO {
  id?: number;
  nome: string;
  documento: string;
  telefone?: string;
  dataCadastro?: string;
  cep: string;
  logradouro?: string;
  numero: string;
  complemento?: string;
  bairro?: string;
  cidade: string;
  estado: string;
  email?: string;
  idUsuario?: number | null | undefined;
}

