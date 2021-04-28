import { EventEmitter, Input, NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AnimationService, AnimatorModule } from 'css-animator';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TabelaComSelecaoComponent } from './tabela-com-selecao.component';
import { MatAutocompleteModule,
         MatInputModule, 
         MatButtonModule, 
         MatCardModule, 
         MatCheckboxModule, 
         MatChipsModule, 
         MatDatepickerModule, 
         MatDialogModule, 
         MatDividerModule, 
         MatExpansionModule, 
         MatFormFieldModule, 
         MatIconModule, 
         MatListModule, 
         MatMenuModule, 
         MatPaginatorModule, 
         MatProgressBarModule, 
         MatSelectModule, 
         MatSnackBarModule, 
         MatSortModule, 
         MatTableModule,
         MatTooltipModule, 
         MatProgressSpinnerModule,
         MatTreeModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgbDropdownModule,
    AnimatorModule,
    NgxDatatableModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatListModule,
    MatExpansionModule,
    MatCardModule,
    MatTooltipModule,
    MatProgressBarModule,
    //CurrencyMaskModule,
    CommonModule,
    //TextMaskModule,
    FormsModule,
    NgxDatatableModule,
    //AngularDraggableModule,
    //GooglePlaceModule,
    ReactiveFormsModule,
    MatChipsModule,
    NgxDatatableModule,
    MatListModule,
    MatTreeModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    //InterceptorModule,
    //ColorPickerModule,
    //AutoCompleteModule,
    //SortableModule.forRoot()
  ],
  declarations: [
    TabelaComSelecaoComponent
    ],
  exports: [TabelaComSelecaoComponent],
  providers: [AnimationService]
})
export class TabelaComSelecaoModule {

 }
