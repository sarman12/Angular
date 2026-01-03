import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
logout() {
throw new Error('Method not implemented.');
}
  allUser:any;
  alluserExtra:any;
  successMessage!:string;
  errorMessage!:string;
  currentUserId!:any;


  adminName:any;
    adminUsername:any;


      adminPassword:any;

        adminEmail:any;

          adminAge:any;

            adminGender:any;



  constructor(private service:HttpClientService,private a:ActivatedRoute,private r:Router){
    this.a.params.subscribe(
      (s)=>{this.currentUserId=s['currentUserId']},
      ()=>{}
    )
  };

  getAllUsers(){
    this.service.getAllUser().subscribe(
      (users: any[]) => {
        this.allUser = users;this.alluserExtra=users;
      },
      (err) => {
        this.errorMessage = 'Unable to fetch all users from backend';
        console.error(err);
      }
    );

  }
  ngOnInit(): void {
    if (this.currentUserId) {
      this.service.getUserByid(this.currentUserId).subscribe(
        (user: any) => {
          this.adminName = user.fullname;
          this.adminUsername = user.username;
          this.adminPassword = user.password;
          this.adminEmail = user.email;
          this.adminAge = user.age;
          this.adminGender = user.gender;
        },
        (err) => {
          this.errorMessage = 'Unable to fetch admin data';
          console.error(err);
        }
      );
    }

    this.getAllUsers();
  }


  deleteUser(id: any){
    this.service.deleteUser(id).subscribe(
    (s)=>{
      this.getAllUsers();
    },
    (e)=>{
      console.log(e),
      console.log("Unable to delete")}
    )
  }

  updateBtn(userId: any) {
    this.r.navigate(['/dashboard', this.currentUserId, 'update', userId]);
  }


  searchKeyword!:any;

  searchUser(){
    this.allUser=this.alluserExtra;

    this.allUser = this.allUser.filter((s:any)=>{
      console.log(s.fullname.trim().toLowerCase())
      return s.fullname.trim().toLowerCase().includes( this.searchKeyword.trim().toLowerCase());
    })
    

  }




}
