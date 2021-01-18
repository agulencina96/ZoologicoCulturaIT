import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarAnimalesComponent } from './pages/listar-animales/listar-animales.component';
import { NuevoAnimalComponent } from './pages/nuevo-animal/nuevo-animal.component';

const routes: Routes = [
  { path: 'animal/nuevo', component: NuevoAnimalComponent },
  { path: 'animal/listar', component: ListarAnimalesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
