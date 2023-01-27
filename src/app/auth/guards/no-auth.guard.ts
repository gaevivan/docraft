import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class NoAuthGuard implements CanActivate, CanLoad {
  constructor(private readonly authService: AuthService) {}

  public canActivate(): Observable<boolean | UrlTree> {
    return this.checkAuth();
  }

  public canLoad(): Observable<boolean | UrlTree> {
    return this.checkAuth();
  }

  private checkAuth(): Observable<boolean | UrlTree> {
    return this.authService.hasAuth$.pipe(
      map((hasAuth: boolean) => {
        const notAuth: boolean = !hasAuth;
        if (notAuth) {
          return true;
        }

        return this.authService.getDefaultPage();
      })
    );
  }
}
