import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { UserResponse,User } from '@shared/models/user.interface';
import {map, catchError} from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper=new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn=new BehaviorSubject<boolean>(false);
  private user=new BehaviorSubject<UserResponse>(null!);
//constructor
  constructor(private http:HttpClient) {
    this.checkToken();
   }
   get isLogged():Observable<boolean>{
     return this.loggedIn.asObservable();
   }
  //declaramos metodos a ejecutar
  login(authData:User):Observable<UserResponse | void>{
    return this.http
    .post<UserResponse>(`${environment.API_URL}/auth/login`,authData)
    .pipe(
      map((res : UserResponse) => {
        console.log('Res->', res);//la respuesta del server
        this.saveToken(res.token);//guardamos el token
        this.loggedIn.next(true);
        return res;
      }),
      catchError((err) => this.handleError(err))
    );
  }

  logout():void{
    localStorage.removeItem('token');
    this.loggedIn.next(false);//si el usuario se desloga pasa a false la propiedad
  }
  private checkToken():void{
    const userToken=localStorage.getItem('token');
    const isExpired=helper.isTokenExpired(userToken!);
    console.log('is expired->',isExpired);
    if(isExpired){
      this.logout();
    }else{
      this.loggedIn.next(true);
    }
    //set userLoged=isExpired
  }
  private saveToken(token:string):void{
    localStorage.setItem('token',token);
  }

  private handleError(err : any):Observable<never>{
    let errorMessage='An error occurred retriving data';
    if(err){
      errorMessage=`Error:code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
