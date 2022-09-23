import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../../autenticacao/services/autenticacao.service';
import { StorageService } from '../../autenticacao/services/storage.service';

const TOKEN_HEADER_KEY = 'Authorization';
const CORS_HEADER = 'Access-Control-Allow-Origin';

@Injectable()
export class TokenInterceptorService {
  constructor(private autenticacaoService: AutenticacaoService, private storageService: StorageService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.storageService.getTokenId();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }

    authReq.headers.set(CORS_HEADER, '*');

    return next.handle(authReq).pipe();
  }
}

export const tokenInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
];
