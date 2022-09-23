import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';
import { Login } from '../../models/login.model';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loading: boolean = true;
  public email: string = "";
  public senha: string = "";
  constructor(
    private router: Router,
    private autenticacaoService: AutenticacaoService,
    private storageService: StorageService,
    private readonly snackbarComponent: SnackbarComponent,) { }

  ngOnInit(): void {
  }

  public doLogin(): void {
    this.autenticacaoService.doLogin(<Login> { email: this.email, senha: this.senha }).subscribe({
      next: (response) => {
        this.loading = false;
        this.storageService.salvarUsuario(response.dados, true);
        this.router.navigate(['/cotacoes']);
      },
      error: (response) => {
        this.loading = false;
      }
    });
  }
}
