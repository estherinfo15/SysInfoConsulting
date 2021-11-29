import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from '@app/material.module';

import {HeaderComponent} from './shared/components/header/header.component';//importamos el complemento para que la pagina principal lo use
import {FooterComponent} from './shared/components/footer/footer.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from './shared/components/sidebar/sidebar.module';

@NgModule({
  declarations: [//podemos agregar componentes, directibas
    AppComponent,
    HeaderComponent,// mandamos llamar al complemento Header
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  
    HttpClientModule,
    ReactiveFormsModule,
    SidebarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
