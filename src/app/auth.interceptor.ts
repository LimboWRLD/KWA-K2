import { HttpInterceptorFn } from '@angular/common/http';
import { LoginService } from './service/loginService/login.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let loginService = inject(LoginService);
  if(loginService.token){
    let newReq = req.clone({
      setHeaders:{
        "authorization": loginService.token
      }
    })
    return next(newReq);
  }
  return next(req);
};
