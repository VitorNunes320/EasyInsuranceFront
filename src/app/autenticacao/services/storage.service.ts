import { Injectable } from '@angular/core';
import { UsuarioToken } from '../models/token-usuario.model';
import  *  as CryptoJS from  'crypto-js';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public usuario: UsuarioToken = <UsuarioToken>{};
  public lembreDeMim: boolean = false;

  constructor(private router: Router) { }

  public salvarUsuario(usuarioToken: UsuarioToken, lembreDeMim?: boolean): void {

    this.usuario = usuarioToken;
    this.lembreDeMim = lembreDeMim != null ? lembreDeMim : this.lembreDeMim;
    if (this.lembreDeMim) {
      localStorage.setItem('usuarioId', CryptoJS.AES.encrypt(usuarioToken.id, environment.key).toString());
      localStorage.setItem('nome', CryptoJS.AES.encrypt(usuarioToken.nome, environment.key).toString());
      localStorage.setItem('foto', CryptoJS.AES.encrypt(usuarioToken.foto, environment.key).toString());
      localStorage.setItem('token', CryptoJS.AES.encrypt(usuarioToken.tokens.token, environment.key).toString());
      localStorage.setItem('refreshToken', CryptoJS.AES.encrypt(usuarioToken.tokens.refreshToken, environment.key).toString());
    } else {
      localStorage.clear();
      sessionStorage.setItem('usuarioId', CryptoJS.AES.encrypt(usuarioToken.id, environment.key).toString());
      sessionStorage.setItem('nome', CryptoJS.AES.encrypt(usuarioToken.nome, environment.key).toString());
      sessionStorage.setItem('foto', CryptoJS.AES.encrypt(usuarioToken.foto, environment.key).toString());
      sessionStorage.setItem('token', CryptoJS.AES.encrypt(usuarioToken.tokens.token, environment.key).toString());
      sessionStorage.setItem('refreshToken', CryptoJS.AES.encrypt(usuarioToken.tokens.refreshToken, environment.key).toString());
    }
  }

  public getTokenId() : string | null{
    if (localStorage.getItem("token") != null) {
      return CryptoJS.AES.decrypt(localStorage.getItem("token") as string, environment.key).toString(CryptoJS.enc.Utf8);
    } else if (sessionStorage.getItem("token")) {
      return CryptoJS.AES.decrypt(sessionStorage.getItem("token") as string, environment.key).toString(CryptoJS.enc.Utf8);
    } else {
      return null;
    }
  }

  public getNome() : string | null {
    if (localStorage.getItem("nome")) {
      return CryptoJS.AES.decrypt(localStorage.getItem("nome") as string, environment.key).toString(CryptoJS.enc.Utf8);
    } else if (sessionStorage.getItem("nome")) {
      return CryptoJS.AES.decrypt(sessionStorage.getItem("nome") as string, environment.key).toString(CryptoJS.enc.Utf8);
    } else {
      return null;
    }
  }

  public getUsuarioId() : string | null {
    if (localStorage.getItem("usuarioId")) {
      return CryptoJS.AES.decrypt(localStorage.getItem("usuarioId") as string, environment.key).toString(CryptoJS.enc.Utf8);
    } else if (sessionStorage.getItem("usuarioId")) {
      return CryptoJS.AES.decrypt(sessionStorage.getItem("usuarioId") as string, environment.key).toString(CryptoJS.enc.Utf8);
    } else {
      return null;
    }
  }

  public logout() : void {
    localStorage.clear();
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
