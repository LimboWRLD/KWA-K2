import { Injectable } from '@angular/core';
import { DynamicService } from '../dynamic-service/dynamic.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: any = null;

  constructor(private httpService: HttpClient, private router: Router) {
    let t = localStorage.getItem("token");
    if(t){
      this.token = t;
    }
   }

  login(user: any){
    return this.httpService.post<any>("http://localhost:3000/login", user).pipe(
      tap(x  => {
        this.token = x["token"];
        localStorage.setItem("token", this.token);
        this.router.navigate(["pneumatici"]);
      })
    );
  }

  getUser(){
    if(this.token){
      let payload = this.token.split(".")[1];
      localStorage.setItem("token", this.token);
      return JSON.parse(atob(payload));
    }
  }

  getRoles(){
    let user = this.getUser();
    if(user){
      return user.roles;
    }
  }

  validateRoles(requiredRoles: string[]): boolean {
    const userRoles = this.getRoles();
    if (!userRoles) return false;
    return requiredRoles.some(role => userRoles.includes(role));
  }
}
