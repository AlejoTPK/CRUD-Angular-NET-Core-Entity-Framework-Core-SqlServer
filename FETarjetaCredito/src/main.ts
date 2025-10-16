import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),                         // habilita HttpClient
    importProvidersFrom(BrowserAnimationsModule), //  necesario para Toastr
    provideToastr()                              //  habilita ngx-toastr
  ]
}).catch(err => console.error(err));
