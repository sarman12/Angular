import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from '../http-client.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  courseDetails: any[] = ['C1', 'C2', 'C3', 'C4'];

  registerForm!: FormGroup;
  successMessage!: any;
  errorMessage!: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: HttpClientService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      fullname: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Z][a-z]{3,}( [A-Za-z0-9]*){0,2}$/),
        ],
      ],
      username: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{5,8}$/)],
      ],
      email: ['', [Validators.required, Validators.email]],
      course: ['', [Validators.required]],
      password: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9@#$%]{8,10}$/)],
      ],
      age: ['', [Validators.min(18), Validators.max(60)]],
      gender: ['', [Validators.required]],
      privacyConcerns: [false, [Validators.requiredTrue]],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      }),
    });
  }

  AddUsers() {
    if (this.registerForm.valid) {
      // this.service.getAllUser().subscribe(users => {
      //   const nextId = users.length + 1;
      //   const { privacyConcerns, ...userData } = this.registerForm.value;

      // const newUser = { id: nextId, ...userData };

      //   this.service.addUser(newUser).subscribe(
      //     s => {
      //       this.successMessage = s.id;
      //       setTimeout(() => {
      //         this.router.navigate(['/dashboard/' + s.id]);
      //       }, 3000);
      //     },
      //     e => {
      //       this.errorMessage = "Unable to add user";
      //     }
      //   );
      // });
      console.log(this.registerForm.value);
    }
  }
}
