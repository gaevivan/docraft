import { Injectable } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { Path } from "src/app/shared/enums/path.enum";
import { StorageKey } from "src/app/shared/enums/storage-key.enum";

@Injectable()
export class AuthService {
  private readonly _hasAuth$ = new BehaviorSubject<boolean>(localStorage.getItem(StorageKey.Auth) === 'true');
  public readonly hasAuth$: Observable<boolean> = this._hasAuth$.asObservable();

  constructor(private readonly router: Router) {}

  public login(): void {
    this._hasAuth$.next(true);
    localStorage.setItem(StorageKey.Auth, 'true');
    this.navigateDefaultPage();
  }

  public logout(): void {
    this._hasAuth$.next(false);
    localStorage.setItem(StorageKey.Auth, 'false');
    this.navigateLoginPage(location.href);
  }

  public navigateLoginPage(returnUrl: string | null = null): void {
    if (returnUrl !== null) {
      this.router.navigateByUrl(this.router.createUrlTree([Path.Login]));
    }

    const urlTree: UrlTree = this.router.createUrlTree([Path.Login], {
      queryParams: { returnUrl },
      queryParamsHandling: 'merge'
    });
    this.router.navigateByUrl(urlTree);
  }

  public getDefaultPage(): UrlTree {
    return this.router.createUrlTree(['.']);
  }

  private navigateDefaultPage(): void {
    this.router.navigateByUrl(this.getDefaultPage());
  }
}