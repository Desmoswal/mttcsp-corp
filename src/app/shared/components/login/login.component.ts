import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { FormBuilder, Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(@Inject(FormBuilder) public formBuilder: FormBuilder, public authService: AuthService) {}

  public form: FormGroup;
  public target = '#reactDialog';
  public isModal = true;
  public animationSettings: any = {
        effect: 'Zoom'
    };
  private formSubmitAttempt: boolean;

  public Submit(): void {
    this.onFormSubmit();
  }

  public onFormSubmit(): void {
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      console.log(this.form.value.username)
      console.log(this.form.value.password)
      this.authService.login(this.form.value.username, this.form.value.password)
      this.form.reset();
    } else {
      this.validateAllFormFields(this.form);
    }
  }


  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }
  @ViewChild('container', { read: ElementRef }) container: ElementRef;
  public targetElement: HTMLElement;

  isFieldValid(field: string) {
    return ((!this.form.get(field).valid && this.form.get(field).touched) ||
    (this.form.get(field).untouched && this.formSubmitAttempt));
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  public onOpenDialog = function(event: any): void {
    // Call the show method to open the Dialog
    this.formDialog.show();
};
}
