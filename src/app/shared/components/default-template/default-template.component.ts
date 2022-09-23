import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../autenticacao/services/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './default-template.component.html',
  styleUrls: ['./default-template.component.scss']
})
export class DefaultTemplateComponent implements OnInit {

  constructor(public storageService: StorageService) { }

  ngOnInit(): void {
  }

}
