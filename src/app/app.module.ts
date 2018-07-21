import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxWebsocketModule } from "ngx-websocket";

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxWebsocketModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
