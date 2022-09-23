import { Token } from "./token.model";

export interface UsuarioToken {
  id: string;
  nome: string;
  foto: string;
  tokens: Token;
}
