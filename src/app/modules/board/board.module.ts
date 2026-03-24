import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';

@NgModule({
  imports: [
    CommonModule,
    BoardRoutingModule,
    BoardComponent
  ]
})
export class BoardModule { }