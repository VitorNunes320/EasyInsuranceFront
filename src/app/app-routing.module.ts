import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './autenticacao/components/login/login.component';
import { RegistroComponent } from './autenticacao/components/registro/registro.component';
import { DefaultTemplateComponent } from './shared/components/default-template/default-template.component';
import { CotacaoComponent } from './cotacao/components/cotacao/cotacao.component';
import { NovaCotacaoComponent } from './cotacao/components/nova-cotacao/nova-cotacao.component';
import { AuthTemplateComponent } from './shared/components/auth-template/auth-template.component';
import { GuardService } from './shared/services/guard.service';

export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "autenticacao", pathMatch: "full", redirectTo: "login" },
  { path: '', component: AuthTemplateComponent,
    children: [
      { path: 'login', component: LoginComponent},
      { path: 'registro', component: RegistroComponent},
    ]
  },
  { path: '', component: DefaultTemplateComponent,
    children: [
      { path: 'cotacoes', component: CotacaoComponent, canActivate: [GuardService]},
      { path: 'nova-cotacao', component: NovaCotacaoComponent, canActivate: [GuardService]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
