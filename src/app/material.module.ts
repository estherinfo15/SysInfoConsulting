import { NgModule } from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button'
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
//En el módulo angular de 5 núcleos, también estoy importando módulos externos e internos.
//Entonces, creé una matriz de tipos anypara contener todos los objetos del módulo. Usé esa variable de matriz en importaciones y exportaciones
const myModules=[
    MatToolbarModule,
    MatSidenavModule,
    RouterModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule];

@NgModule({
    imports:[...myModules],
    exports:[...myModules],
})
export class MaterialModule{}

