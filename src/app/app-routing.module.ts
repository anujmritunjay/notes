import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MainComponent } from './main/main.component';
import { AuthenticationGuard } from './authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: LogInComponent
  },
  {
    path: 'login',
    component: LogInComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'notes',
    component: MainComponent,
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
