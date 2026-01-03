import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForms!:FormGroup;
  successMessage!:string;
  errorMessage!:string;


  constructor(private fb:FormBuilder,private router:Router,private service:HttpClientService){};
  ngOnInit(){
    this.loginForms = this.fb.group({
      username:['',[Validators.required,Validators.pattern(/^[a-zA-z0-9]+$/)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9&%$^@]{8,}$/)
]]
    });
  }

  userId:any;
  submit(){
    if(this.loginForms.valid && this.loginForms.touched){
      this.service.getUserByEmail(this.loginForms.value.email).subscribe(
        (s)=>{this.userId=s.id
          this.successMessage="Login Successfull"
          if(this.userId != null){
            this.router.navigate(['/dashbaord',this.userId]);
          }
        },
        (e)=>{
          this.errorMessage="Invalid Credientials";
          console.log("Unable to fetch the ID");
        }
      )
    }

  }
}
