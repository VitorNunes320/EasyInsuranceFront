import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseBase } from 'src/app/shared/models/response-base.model';
import { environment } from 'src/environments/environment';
import { ItemModel } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class CotacaoService {
  constructor(private http: HttpClient) { }

  public buscarCotacoes(usuarioId: string, busca: string, pagina: number, quantidade: number) : Observable<ResponseBase> {
    return this.http.get<ResponseBase>(`${environment.baseURL}cotacao/${usuarioId}?` +
    (busca && busca != "" ? "busca=${busca}&" : "") +
    `pagina=${pagina}&quantidade=${quantidade}`);
  }

  public processarCotacao(request: ItemModel) : Observable<ResponseBase> {
    return this.http.post<ResponseBase>(`${environment.baseURL}cotacao/processamento`, request);
  }

  public salvarCotacao(request: ItemModel, usuarioId: string) : Observable<ResponseBase> {
    return this.http.post<ResponseBase>(`${environment.baseURL}cotacao/${usuarioId}`, request);
  }
}
