import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { JokesPageComponent } from './components/jokes-page/jokes-page.component';
import { JokesListComponent } from './components/jokes-list/jokes-list.component';
import { JokeComponent } from './components/joke/joke.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SorterComponent } from './components/sorter/sorter.component';
import { FilterComponent } from './components/filter/filter.component';

const routes: Routes = [
  { path: '', component: JokesPageComponent }
];

@NgModule({
  declarations: [
    JokesPageComponent,
    JokesListComponent,
    JokeComponent,
    PaginationComponent,
    SorterComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class JokesModule { }
