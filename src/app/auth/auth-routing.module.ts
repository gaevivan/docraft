import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared-widgets/components/layout/layout.component';
import { Param } from '../shared/enums/param.enum';
import { Path } from '../shared/enums/path.enum';
import { HasAuthGuard } from './guards/has-auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: Path.Login,
    canActivate: [NoAuthGuard],
    loadChildren: () => import('../login/login.module').then((module) => module.LoginModule)
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [HasAuthGuard],
    children: [
      {
        path: `${Path.Project}/:${Param.ProjectId}`,
        loadChildren: () => import('../project/project.module').then((module) => module.ProjectModule)
      },
      {
        path: '',
        loadChildren: () => import('../personal/personal.module').then((module) => module.PersonalModule)
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  },
  {
    path: '**',
    redirectTo: Path.Login
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [NoAuthGuard, HasAuthGuard, AuthService]
})
export class AuthRoutingModule { }
