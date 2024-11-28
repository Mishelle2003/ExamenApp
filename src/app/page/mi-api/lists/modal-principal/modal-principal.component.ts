import { Component, ElementRef, EventEmitter, Inject, Input, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { Carro } from '../interface/carros';
import {FormsModule} from '@angular/forms'
import { isPlatformBrowser, NgIf } from '@angular/common';
import { CarrosService } from '../services/carros.service';

@Component({
  selector: 'app-modal-principal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal-principal.component.html',
  styleUrl: './modal-principal.component.css'
})
export class ModalPrincipalComponent {
  @Input() carro: Carro = {
    marca: '',
    modelo: '',
    fecha: 0,
    precio: 0,
    color: '',
    km: 0
  };

  isEditing = false; // Controla si es editar o agregar
  private bootstrapModal: any;
  @ViewChild('modalElement') public modal!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private carroService: CarrosService
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.inicializarModal();
    }
  }

  inicializarModal() {
    import('bootstrap').then((bootstrap) => {
      this.bootstrapModal = new bootstrap.Modal(this.modal.nativeElement);
    });
  }

  open(carro: Carro | null = null) {
    if (carro) {
      this.isEditing = true;
      this.carro = { ...carro }; // Copia para edición
    } else {
      this.isEditing = false;
      this.carro = {
        marca: '',
        modelo: '',
        fecha: 0,
        precio: 0,
        color: '',
        km: 0
      }; // Resetea los campos para agregar
    }

    if (isPlatformBrowser(this.platformId)) {
      this.bootstrapModal.show();
    }
  }

  closeModal() {
    if (isPlatformBrowser(this.platformId)) {
      this.bootstrapModal.hide();
    }
  }

  guardar() {
    if (this.isEditing) {
      this.editar();
    } else {
      this.agregar();
    }
  }

  agregar() {
    this.carroService.postCarros(this.carro).subscribe({
      next: () => {
        console.log('Carro agregado exitosamente');
        this.closeModal();
        window.location.reload(); // Puedes reemplazarlo con un método más eficiente para actualizar la lista
      },
      error: (error) => {
        console.error('Error al agregar el carro:', error);
      }
    });
  }

  editar() {
    this.carroService.putCarros(this.carro._id!, this.carro).subscribe({
      next: () => {
        console.log('Carro editado exitosamente');
        this.closeModal();
        window.location.reload(); 
      },
      error: (error) => {
        console.error('Error al editar el carro:', error);
      }
    });
  }
}
