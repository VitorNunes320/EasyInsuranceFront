import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { SharedModule } from './shared/shared.module';
import { CotacaoModule } from './cotacao/cotacao.module';
import { SnackbarComponent } from './shared/components/snackbar/snackbar.component';
import { GuardService } from './shared/services/guard.service';
import { tokenInterceptorProviders } from './shared/services/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    SnackbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    AutenticacaoModule,
    CotacaoModule,
    SharedModule,
  ],
  providers: [
    SnackbarComponent,
    GuardService,
    tokenInterceptorProviders
  ],
  bootstrap: [AppComponent],
  exports: [SnackbarComponent]
})
export class AppModule { }
