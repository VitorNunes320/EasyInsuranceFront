import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CotacaoModel } from '../../models/cotacao.model';
import { NovoItemModel } from '../../models/novo-item.model';
import { CotacaoService } from '../../services/cotacao.service';
import { CotacaoModalComponent } from '../cotacao-modal/cotacao-modal.component';
import { NovaCotacaoModel } from './../../models/nova-cotacao.model';
import { ItemModel } from './../../models/item.model';
import { SnackBarTheme } from 'src/app/shared/models/snackbar.theme.enum';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';

@Component({
  selector: 'app-nova-cotacao',
  templateUrl: './nova-cotacao.component.html',
  styleUrls: ['./nova-cotacao.component.scss']
})
export class NovaCotacaoComponent implements OnInit {
  public loading: boolean = false;
  public item: ItemModel = <ItemModel> {  };
  public data: any = "";

  constructor(
    public dialog: MatDialog,
    private cotacaoService: CotacaoService,
    private readonly snackbarComponent: SnackbarComponent) { }

  ngOnInit(): void {  }

  public criarCotacao() : void {
    this.loading = true;
    let values = this.data.split("/");
    this.item.dataAquisicaoItem = new Date(values[2], values[1], values[0]);

    this.cotacaoService.processarCotacao(this.item).subscribe({
      next: (response) => {
        this.loading = false;
        this.dialog.open(CotacaoModalComponent, {
          maxWidth: "520px",
          data: {
            cotacao: response.dados,
            item: this.item
          },
          backdropClass: 'backdrop-blur'
        });
      },
      error: (response) => {
        this.loading = false;
        this.snackbarComponent.openSnackBar("Não foi possível processar a cotação!", SnackBarTheme.error, 3000);
      }
    });
  }
}
