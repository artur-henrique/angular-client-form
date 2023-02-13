import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientRegisterComponent } from './client-register/client-register.component';

const routes: Routes = [
  { path: '', component: ClientListComponent },
  { path: 'register', component: ClientRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
