import { Component, OnInit } from '@angular/core';
import { AnimalService } from 'src/app/services/animal.service';

@Component({
  selector: 'app-listar-animales',
  templateUrl: './listar-animales.component.html',
  styleUrls: ['./listar-animales.component.css'],
})
export class ListarAnimalesComponent implements OnInit {
  headers = [
    'Tipo',
    'Especie',
    'Peso[kg]',
    'Edad',
    'Lugar Origen',
    'Cantidad Carnes [kg] (30 dias)',
    'Cantidad Hierbas [kg] (30 dias)',
  ];

  animales = [];
  carneTotal = 0;
  hierbasTotal = 0;

  constructor(private api: AnimalService) {
    this.api.getListaAnimales().subscribe((res: any) => {
      this.animales = res;
      this.api.getCarnes().subscribe((res: any) => {
        this.carneTotal = res;
        this.api.getHierbas().subscribe((res: any) => {
          this.hierbasTotal = res;
        });
      });
    });
  }

  ngOnInit(): void {}
}
