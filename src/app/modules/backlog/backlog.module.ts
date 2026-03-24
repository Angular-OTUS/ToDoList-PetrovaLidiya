import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BacklogRoutingModule } from './backlog-routing.module';
import { BacklogComponent } from './backlog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BacklogRoutingModule,
    BacklogComponent
  ]
})
export class BacklogModule { }