import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-update-page',
  templateUrl: './update-page.component.html',
  styleUrls: ['./update-page.component.css']
})
export class UpdatePageComponent implements OnInit {

  updateForm!: FormGroup;
  currentUserId!: any;
  userId!: any;
  successMessage!: string;
  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private service: HttpClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Get both params from URL
    this.route.params.subscribe(params => {
      this.currentUserId = params['currentUserId'];
      this.userId = params['userId'];
    });
  }

  ngOnInit(): void {
    // Initialize form
    this.updateForm = this.fb.group({
      fullname: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(60)]],
      gender: ['', Validators.required]
    });

    // Prefill form with existing user data
    if (this.userId) {
      this.service.getUserByid(this.userId).subscribe(
        (user: any) => this.updateForm.patchValue(user),
        err => this.errorMessage = 'Unable to fetch user data'
      );
    }
  }

  updateUser() {
    if (this.updateForm.valid) {
      this.service.updateUser(this.userId, this.updateForm.value).subscribe(
        res => {
          this.successMessage = 'User updated successfully!';
          setTimeout(() => {
            this.router.navigate(['/dashboard', this.currentUserId]);
          }, 1500);
        },
        err => this.errorMessage = 'Update failed!'
      );
    } else {
      this.errorMessage = 'Please fill all required fields correctly';
    }
  }

  cancelUpdate() {
    this.router.navigate(['/dashboard', this.currentUserId]);
  }

}
