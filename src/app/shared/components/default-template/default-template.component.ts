import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/autenticacao/services/autenticacao.service';
import { StorageService } from '../../../autenticacao/services/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './default-template.component.html',
  styleUrls: ['./default-template.component.scss']
})
export class DefaultTemplateComponent implements OnInit {

  constructor(public storageService: StorageService, public autenticacaoService: AutenticacaoService) { }

  ngOnInit(): void {
  }

  public excluirUsuario()
  {
    var usuarioId = this.storageService.getUsuarioId();
    this.autenticacaoService.excluirUsuario(usuarioId ? usuarioId : "").subscribe({
      next: (response) => {
        this.storageService.logout();
      },
      error: (response) => {
        this.storageService.logout();
      }
    });
  }
}
