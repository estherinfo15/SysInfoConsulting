import { Component, OnInit,OnDestroy } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  hide=true;
  private subscription:Subscription=new Subscription();

 loginForm=this.fb.group({
   username:[''],
   password:[''],
 });
  constructor(
    private authSvc:AuthService,
     private fb:FormBuilder,
     private router:Router
     ) { }

  ngOnInit(): void {
    const userData = {
      username:'fernando.osornio@consulting.construction',
      password:'ccgroup',
    };
    this.authSvc.login(userData).subscribe((res)=>console.log('Login'));
  }
  
  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }

  onLogin():void{
    const formValue=this.loginForm.value;
    this.authSvc.login(formValue).subscribe(res=>{
      if(res){
        this.router.navigate(['']);
      }
    });
  }
}
