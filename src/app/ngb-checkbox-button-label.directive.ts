import {HostListener, Renderer2, ElementRef, Directive} from '@angular/core';

@Directive({
    selector: '[usNgbCheckboxButtonLabel]'
})
export class NgbCheckboxButtonLabelDirective {

    private nativeElement: any;

    constructor(private renderer: Renderer2, private  elementRef: ElementRef) {
        this.nativeElement = this.elementRef.nativeElement;
    }

    @HostListener('click')
    onClick() {
        this.renderer.addClass(this.nativeElement, 'clicked');
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.renderer.removeClass(this.nativeElement, 'clicked');
    }
}
