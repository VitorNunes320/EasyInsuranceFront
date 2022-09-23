import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';
import { SnackBarTheme } from 'src/app/shared/models/snackbar.theme.enum';
import { CotacaoModel } from '../../models/cotacao.model';
import { ItemModel } from '../../models/item.model';
import { CotacaoService } from '../../services/cotacao.service';
import { StorageService } from './../../../autenticacao/services/storage.service';

@Component({
  selector: 'app-cotacao-modal',
  templateUrl: './cotacao-modal.component.html',
  styleUrls: ['./cotacao-modal.component.scss']
})
export class CotacaoModalComponent implements OnInit {
  public cotacao: CotacaoModel = <CotacaoModel> {}
  public item: ItemModel = <ItemModel> {}
  public loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CotacaoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private cotacaoService: CotacaoService,
    private storageService: StorageService,
    private readonly snackbarComponent: SnackbarComponent) {
    this.cotacao = data.cotacao;
    this.item = data.item;
  }

  ngOnInit(): void {

  }

  public close() : void {
    this.dialogRef.close();
  }

  public salvarCotacao() : void {
    this.loading = true;
    let usuarioId = this.storageService.getUsuarioId();
    this.cotacaoService.salvarCotacao(this.item, usuarioId ? usuarioId : "").subscribe({
      next: (response) => {
        this.loading = false;
        this.close();
        this.snackbarComponent.openSnackBar("Cotação salva com sucesso!", SnackBarTheme.success, 3000);
      },
      error: (response) => {
        this.loading = false;
        this.snackbarComponent.openSnackBar("Não foi possível salvar a cotação!", SnackBarTheme.error, 3000);
      }
    });
  }
}
