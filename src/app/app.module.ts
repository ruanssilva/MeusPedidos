import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

// import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module

import { ConhecimentoService } from './services/conhecimento.service';
import { CandidatoService } from './services/candidato.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [

    // ReactiveFormsModule,

    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    ConhecimentoService,
    CandidatoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
