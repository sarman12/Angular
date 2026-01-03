import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForms!: FormGroup;
  successMessage!: string;
  errorMessage!: string;
  userId!: any;

  constructor(private fb: FormBuilder, private router: Router, private service: HttpClientService) {}

  ngOnInit(): void {
    this.loginForms = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9&%$^@]{8,}$/)]]
    });
  }

  submit(): void {
    if (this.loginForms.valid && !this.loginForms.pristine) {
      this.service.getUserByEmail(this.loginForms.value.email).subscribe(
        (users: any[]) => {
          if (users.length > 0) {
            const user = users[0];
            this.userId = user.id;
            this.successMessage=user.fullname;
            this.errorMessage = '';
            setTimeout(() => {
              this.router.navigate(['/dashboard', this.userId]);
            }, 1000);
          } else {
            this.errorMessage = 'Invalid Credentials';
            this.successMessage = '';
          }
        },
        (err) => {
          this.errorMessage = 'Unable to fetch data from backend';
          this.successMessage = '';
          console.error(err);
        }
      );
    }
  }
}
