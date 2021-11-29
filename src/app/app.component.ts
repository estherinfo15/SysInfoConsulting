import { Component } from '@angular/core';


@Component({
  selector: 'app-root',//etiqueta
  templateUrl: './app.component.html',//vista asociada al componente
  styleUrls: ['./app.component.css'],//indicarle hojas de estilo al componente
  
})
export class AppComponent {//exportamos la clase para usarla en otro lado
  title = 'projectConsulting';
}
