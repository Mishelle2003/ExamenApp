import { Component, Input, ViewChild } from '@angular/core';
import { Carro, Carros } from '../interface/carros';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ModalPrincipalComponent } from '../modal-principal/modal-principal.component';
import { CarrosService } from '../services/carros.service';

@Component({
  selector: 'app-carros-lista',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, ModalPrincipalComponent],
  templateUrl: './carros-lista.component.html',
  styleUrl: './carros-lista.component.css'
})
export class CarrosListaComponent {
  @Input() carrosAll: Carros | undefined
  @ViewChild(ModalPrincipalComponent) public modal!: ModalPrincipalComponent

  constructor(private _srvCarros:CarrosService){}

  eliminarCarro(id:String){
    this._srvCarros.deleteCarros(id).subscribe({
      next: ne => {
        console.log('dato eliminado')
        window.location.reload();
      }
    })
  }

}
