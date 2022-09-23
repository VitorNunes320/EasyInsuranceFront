import { NovoItemModel } from "./novo-item.model";

export interface NovaCotacaoModel {
  valorTotal: number;
  valorParcela: number;
  quantidadeParcelas: number;
  criadoEm?: Date;
  nomeItem: string;
  itemId?: string;
  item: NovoItemModel;
}
