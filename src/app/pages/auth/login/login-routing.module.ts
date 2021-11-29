import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';

const routes: Routes = [{path:'',component:LoginComponent}];//en el modulo mandamos llamar su componente

@NgModule({
  imports: [RouterModule.forChild(routes)],//indica que estamos agregando reglas de ruteo en un modulo de carcateristicas y no en el de raiz
  exports: [RouterModule]
})
export class LoginRoutingModule { }
