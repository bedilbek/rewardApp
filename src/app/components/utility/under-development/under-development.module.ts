import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnderDevelopmentComponent } from './under-development.component';
import { DemoMaterialModule } from '../../../shared/demo-material-module';

@NgModule({
  // declarations: [UnderDevelopmentComponent],
  imports: [
    CommonModule,
    DemoMaterialModule
  ],
  exports: [
    // UnderDevelopmentComponent
  ],
  // entryComponents: [UnderDevelopmentComponent]
})
export class UnderDevelopmentModule { }
