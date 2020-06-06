import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HeroesListComponent } from './pages/heroes-list/heroes-list.component';


const routes: Routes = [
  { path: 'heroes', component: HeroesListComponent      },
  { path: 'heroe/:id', component: HeroeComponent        },
  { path: '**', pathMatch: 'full', redirectTo: 'heroes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
