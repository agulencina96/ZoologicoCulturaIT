import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AnimalService } from 'src/app/services/animal.service';

interface animal {
  tipo: string;
  especie: string;
  edad: number;
  lugarOrigen: string;
  peso: number;
  porcentaje: number;
  fijo?: number | null;
  dias?: number | null;
}

@Component({
  selector: 'app-nuevo-animal',
  templateUrl: './nuevo-animal.component.html',
  styleUrls: ['./nuevo-animal.component.css'],
})
export class NuevoAnimalComponent implements OnInit {
  tipoAnimales = ['Carnivoro', 'Herbivoro', 'Reptil'];
  animalSeleccionado = '';

  totalComida = 0;

  animal: animal = {
    tipo: '',
    especie: '',
    edad: 0,
    lugarOrigen: '',
    peso: 0,
    porcentaje: 0,
    fijo: 0,
    dias: 0,
  };

  constructor(private api: AnimalService, private message: NzMessageService) {
    this.getTotalComida();
  }

  private getTotalComida() {
    this.api.getCarnes().subscribe((res: any) => {
      this.totalComida += res;
      this.api.getHierbas().subscribe((res: any) => {
        this.totalComida += res;
      });
    });
  }

  ngOnInit(): void {}

  crearAnimal() {
    this.animal.tipo = this.animalSeleccionado;
    this.api.crearAnimal(this.animal).subscribe(
      (res: any) => {
        this.animal = {
          tipo: this.animalSeleccionado,
          especie: '',
          edad: 0,
          lugarOrigen: '',
          peso: 0,
          porcentaje: 0,
          fijo: 0,
          dias: 0,
        };
        this.message.create(
          'success',
          'Se agregó correctamente el nuevo animal'
        );
        if (res[res.length - 1].cantidadComida + this.totalComida >= 1500) {
          this.message.create(
            'warning',
            'Atención se pueden exceder los 1500kg de comida'
          );
        }
        this.getTotalComida();
      },
      (e) => {
        console.error(e);
      }
    );
  }
}
