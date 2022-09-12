import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ElementRef } from '@angular/core';

@Directive({
  selector: '[appParseEmailBody]'
})
export class ParseEmailBodyDirective implements OnChanges{

  ch : [RegExp, (t: string) => string][] = [
    [/(https?:\/\/[\S]+)/g, (url: string) => `<a href="${url}">${url}</a>`],
    [/(\n)/g, (url: string) => '<br>']
  ];

  @Input() appParseEmailBody = "";

  constructor( private el: ElementRef) {   }

  ngOnChanges(changes: SimpleChanges): void {
    let body = changes['appParseEmailBody'].currentValue;

    if (body) {
      for (const repPattern of this.ch) {
        body = body.replace(repPattern[0], repPattern[1]);
      }

    this.el.nativeElement.innerHTML = body;
    }
  }
  
   parse() {
    this.el.nativeElement.innerHTML = this.appParseEmailBody;
   }





}
