import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HasAuthGuard implements CanActivate, CanLoad {
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
        if (hasAuth) {
          return true;
        }

        this.authService.navigateLoginPage(location.href);
        return false;
      })
    );
  }
}
