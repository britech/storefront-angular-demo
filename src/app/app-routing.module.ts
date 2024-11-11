import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ManageProductsComponent } from './pages/manage-products/manage-products.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GuardService } from './services/guard.service';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'manageProducts', component: ManageProductsComponent, canActivate: [GuardService] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [GuardService] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
