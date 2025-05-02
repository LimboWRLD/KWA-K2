import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { LoginService } from './service/loginService/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let loginService = inject(LoginService);
  if(loginService.getUser() && loginService.validateRoles(route.data["requiredRoles"])){
    return true;
  }

  return new RedirectCommand(router.parseUrl("/login"));
};
