import {AfterViewInit, Component, ViewChild, OnInit, Injectable} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { CotacaoModel } from '../../models/cotacao.model';
import { Router } from '@angular/router';
import { CotacaoService } from '../../services/cotacao.service';
import { StorageService } from './../../../autenticacao/services/storage.service';
import { SnackBarTheme } from 'src/app/shared/models/snackbar.theme.enum';
import { SnackbarComponent } from './../../../shared/components/snackbar/snackbar.component';

@Component({
  selector: 'app-cotacao',
  templateUrl: './cotacao.component.html',
  styleUrls: ['./cotacao.component.scss']
})
export class CotacaoComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  public cotacoes: CotacaoModel[] = [];
  public displayedColumns: string[] = ['nomeItem', 'valorTotal', 'valorParcela', 'quantidadeParcelas', 'criadoEm', 'acao'];
  public cotacoesDataSrc: MatTableDataSource<CotacaoModel>;
  public busca: string = "";
  public pagina: number = 0;
  public quantidade: number = 15;
  public loading: boolean = false;

  constructor(
    private router: Router,
    private cotacaoService: CotacaoService,
    private storageService: StorageService,
    private snackbarComponent: SnackbarComponent
    ) {
    this.cotacoesDataSrc = new MatTableDataSource<CotacaoModel>(this.cotacoes);
    this.buscarCotacoes();
  }

  ngOnInit(): void {

  }

  public novaCotacao() : void {
    this.router.navigate(['/nova-cotacao']);
  }

  public buscarCotacoes() : void {
    let usuarioId = this.storageService.getUsuarioId()

    if (usuarioId) {
      this.cotacaoService.buscarCotacoes(usuarioId, this.busca, this.pagina, this.quantidade).subscribe({
        next: (response) => {
          this.loading = false;
          this.cotacoes = response.dados;
          this.cotacoesDataSrc = new MatTableDataSource<CotacaoModel>(this.cotacoes)
        },
        error: (response) => {
          this.loading = false;
          this.snackbarComponent.openSnackBar("Não foi possível buscar as cotações!", SnackBarTheme.error, 3000);
        }
      });
    }
  }
}
