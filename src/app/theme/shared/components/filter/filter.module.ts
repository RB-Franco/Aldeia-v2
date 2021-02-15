import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AnimationService, AnimatorModule } from 'css-animator';

@NgModule({
  imports: [
    CommonModule,
    NgbDropdownModule,
    AnimatorModule
  ],
  declarations: [FilterComponent],
  exports: [FilterComponent],
  providers: [AnimationService]
})
export class FilterModule { }
