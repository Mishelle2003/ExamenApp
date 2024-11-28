import { Component, OnInit } from '@angular/core';
import { Carros } from './interface/carros';
import { CarrosService } from './services/carros.service';
import { CarrosListaComponent } from "./carros-lista/carros-lista.component";

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [CarrosListaComponent],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent implements OnInit{
  carros: Carros | undefined
  constructor(private _srvCarros:CarrosService){}

  ngOnInit(): void {
    this._srvCarros.getAllcarros().subscribe(carr => {
      this.carros = carr
    })
  }
}
