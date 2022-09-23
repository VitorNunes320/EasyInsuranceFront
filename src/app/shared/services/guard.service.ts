import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { StorageService } from '../../autenticacao/services/storage.service';

@Injectable()
export class GuardService implements CanActivate {

  constructor(public router: Router, private storageService: StorageService) {}

  canActivate(): boolean {
    if (this.storageService.getTokenId()) {
      return true;
    }

    this.router.navigate(['/autenticacao/login']);
    return false;
  }
}
