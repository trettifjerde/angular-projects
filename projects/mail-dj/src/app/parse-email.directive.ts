import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ElementRef } from '@angular/core';

@Directive({
  selector: '[appParseEmail]'
})
export class ParseEmailDirective implements OnChanges {

  ch : [RegExp, (t: string) => string][] = [
    [/(https?:\/\/[\S]+)/g, (url: string) => `<a href="${url}" target="_blank">${url}</a>`],
    [/(\n)/g, (url: string) => '<br>']
  ];

  @Input() appParseEmail = "";

  constructor( private el: ElementRef) {   }

  ngOnChanges(changes: SimpleChanges): void {
    let body = changes['appParseEmail'].currentValue;

    if (body) {
      for (const repPattern of this.ch) {
        body = body.replace(repPattern[0], repPattern[1]);
      }

    this.el.nativeElement.innerHTML = body;
    }
  }
  
   parse() {
    this.el.nativeElement.innerHTML = this.appParseEmail;
   }
}
