import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Tái kiến trúc lại Formgrou để so sánh password
export function comparePassword(c: FormGroup) {
  const v = c.value;
  return (v.password === v.confirmPassword) ? null : {
    passwordnotmatch: true
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      username: ["", [Validators.required]],
      contactMobile: ["", [Validators.required, Validators.pattern(("(09|03|08)[0-9 ]{8}"))]],
      email: ["", [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    },
      {
        validator: comparePassword
      });
  }

  onSubmit() {
    this.submitted = true;

    // Nếu các trường form không hợp lệ
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    // Gọi service authen
    // this.authenticationService.register(this.form.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       if (data.code == 200) {
    //         this.router.navigate([this.returnUrl]);
    //         this.showNotification('success', data.message)
    //       }
    //       else if (data.code == 1002) {
    //         this.loading = false;
    //         this.showNotification('error', data.message)
    //       }
    //     });
  }

}
