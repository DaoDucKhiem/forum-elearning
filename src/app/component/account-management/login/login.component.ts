import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Trả về loginForm Control
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // Nếu các trường form không hợp lệ
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    // Gọi service login 
    // this.authenticationService.login(this.f.email.value, this.f.password.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       if (data.code == 200) {
    //         this.router.navigate([this.returnUrl]);
    //         this.showNotification('success', data.message)
    //       }
    //       else if (data.code == 1001) {
    //         this.loading = false;
    //         this.showNotification('error', data.message)
    //       }
    //     });
  }

}
