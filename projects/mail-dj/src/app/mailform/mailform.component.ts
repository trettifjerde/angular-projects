import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormInfo } from '../interfaces';

@Component({
  selector: 'app-mailform',
  templateUrl: './mailform.component.html'
})
export class MailformComponent implements OnChanges {

  @Input() info = {} as FormInfo;
  @Input() errorMsg : string|null = null;
  @Input() isFormBeingProcessed: boolean;
  @Output() sendEmailEvent = new EventEmitter();
  @ViewChild('emailForm') form!: NgForm;
  @ViewChild('textarea') textarea!: ElementRef;
  @ViewChild('submitBtn') submitBtn!: ElementRef;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('mail form regiseting changes');
    if (changes['info'] && ! changes['info'].firstChange) {
      this.form.form.markAsPristine();
      setTimeout(()=>{
        this.textarea.nativeElement.selectionEnd = 0;
        this.textarea.nativeElement.focus();
      }, 50);
    }
  }

  onSubmit(): void {
    this.sendEmailEvent.emit(this.info);
  }

}
