import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormInfo } from '../interfaces';
import { MailService } from '../mail.service';

@Component({
  selector: 'app-mailform',
  templateUrl: './mailform.component.html'
})
export class MailformComponent implements AfterViewInit, OnChanges {

  @Input() info = {} as FormInfo;
  @Output() mailboxChange = new EventEmitter();
  @ViewChild('emailForm') form!: NgForm;
  @ViewChild('textarea') textarea!: ElementRef;

  constructor(private mailService: MailService) {   }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['info'] && ! changes['info'].firstChange) {
      this.form.form.markAsPristine();
      setTimeout(()=>{
        this.textarea.nativeElement.selectionEnd = 0;
        this.textarea.nativeElement.focus();
      }, 100);
    }
  }

  ngAfterViewInit(): void { }

  onSubmit(): void {
    this.mailService.sendEmail(this.info).subscribe(_ => this.mailboxChange.emit());
  }

}
