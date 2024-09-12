import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopPipe } from './noop.pipe';
import { BgRedDirective } from './bg-red.directive';

@NgModule({
  declarations: [
    AppComponent,
    NoopPipe,
    BgRedDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
