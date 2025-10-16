import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TarjetaCredito } from "./components/tarjeta-credito/tarjeta-credito";
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TarjetaCredito, ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('FETarjetaCredito');
}
