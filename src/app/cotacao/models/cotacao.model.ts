import { NovaCotacaoModel } from './nova-cotacao.model';

export interface CotacaoModel {
  id: string;
  valorTotal: number;
  valorParcela: number;
  quantidadeParcelas: number;
  criadoEm?: Date;
  nomeItem: string;
}
