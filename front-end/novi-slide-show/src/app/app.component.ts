import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SlidersComponent} from "./components/sliders/sliders.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SlidersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'novi-slide-show';
}
