import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JokesPageComponent } from './jokes-page/jokes-page.component';
import { JokesListComponent } from './jokes-list/jokes-list.component';
import { JokeComponent } from './joke/joke.component';



@NgModule({
  declarations: [
    JokesPageComponent,
    JokesListComponent,
    JokeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class JokesModule { }
