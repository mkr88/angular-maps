import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';
//import { GoogleMapsModule } from '@angular/google-maps'

import { MapComponent } from './components/map/map.component';
import { PageComponent } from './components/page/page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InicialComponent } from './components/inicial/inicial.component';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { SecundaryComponent } from './components/secundary/secundary.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    PageComponent,
    HeaderComponent,
    InicialComponent,
    SecundaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //GoogleMapsModule,
    AgmCoreModule.forRoot({
      apiKey: '',
      libraries: ['places']
      }),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    AgmSnazzyInfoWindowModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
