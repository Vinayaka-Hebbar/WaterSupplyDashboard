import {Directive, ElementRef, Input, OnInit, Renderer} from '@angular/core';

@Directive({
  selector: '[appProgress]'
})
export class ProgressDirective implements OnInit {
  @Input()appProgress: boolean;

  constructor(public elementRef: ElementRef, public renderer: Renderer) {
    // Use renderer to render the element with styles
  }

  ngOnInit(): void {
    if (this.appProgress) {
      this.renderer.setElementStyle(this.elementRef.nativeElement, 'display', 'block');
    } else {
      this.renderer.setElementStyle(this.elementRef.nativeElement, 'display', 'none');
    }
  }

}
