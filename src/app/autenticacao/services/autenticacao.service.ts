import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseBase } from '../../shared/models/response-base.model';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(private http: HttpClient) { }

  public doLogin(request: Login): Observable<ResponseBase> {
    return this.http.post<ResponseBase>(`${environment.baseURL}autenticacao/login`, request);
  }

  public excluirUsuario(usuarioId: string) : Observable<ResponseBase> {
    return this.http.delete<ResponseBase>(`${environment.baseURL}usuario/${usuarioId}`);
  }
}
