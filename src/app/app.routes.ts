import { Routes } from '@angular/router';
import { VoziloTableComponent } from './components/vozilo-table/vozilo-table.component';
import { VoziloFormComponent } from './components/vozilo-form/vozilo-form.component';
import { PneumaticTableComponent } from './components/pneumatic-table/pneumatic-table.component';
import { PneumaticFormComponent } from './components/pneumatic-form/pneumatic-form.component';
import { authGuard } from './auth.guard';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { VoziloViewComponent } from './components/vozilo-view/vozilo-view.component';

export const routes: Routes = [
    { path: "login", component: LoginFormComponent },
    {
      path: "vozila",
      component: VoziloTableComponent,
      data: { requiredRoles: ["ROLE_ADMIN"] },
      canActivate: [authGuard]
    },
    {
      path: "vozila/edit/:id",
      component: VoziloFormComponent,
      data: { requiredRoles: ["ROLE_ADMIN"] },
      canActivate: [authGuard]
    },
    {
      path: "vozila/create",
      component: VoziloFormComponent,
      data: { requiredRoles: ["ROLE_ADMIN"] },
      canActivate: [authGuard]
    },    {
      path: "vozila/view/:id",
      component: VoziloViewComponent,
      data: { requiredRoles: ["ROLE_ADMIN"] },
      canActivate: [authGuard]
    },
    {
      path: "pneumatici",
      component: PneumaticTableComponent,
      data: { requiredRoles: ["ROLE_ADMIN", "ROLE_USER"] },
      canActivate: [authGuard]
    },
    {
      path: "pneumatici/edit/:id",
      component: PneumaticFormComponent,
      data: { requiredRoles: ["ROLE_ADMIN", "ROLE_USER"] },
      canActivate: [authGuard]
    },
    {
      path: "pneumatici/create",
      component: PneumaticFormComponent,
      data: { requiredRoles: ["ROLE_ADMIN", "ROLE_USER"] },
      canActivate: [authGuard]
    },
    {
      path: "**",
      component: LoginFormComponent
    }
  ];
  
