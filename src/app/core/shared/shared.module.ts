import { NgModule } from '@angular/core';
import { ProgressDirective } from './progress.directive';

@NgModule({
  exports: [
    ProgressDirective
  ],
  declarations: [ProgressDirective]
})
export class SharedModule { }
