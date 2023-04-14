import { ToastService } from './toast.service';
import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import {ProgressSpinnerModule} from 'primeng/progressspinner'
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastModule,
    MessageModule,
    ProgressSpinnerModule
  ],
  providers: [MessageService, ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
