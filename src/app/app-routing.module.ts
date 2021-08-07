import { RegisterComponent } from './components/register/register.component';
import { ProductComponent } from './components/product/product.component';
import { ShopComponent } from './components/shop/shop.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuardService } from './services/Guard/auth-guard.service';
import { NoAuthGuardService } from './services/Guard/no-auth-guard.service';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate:[NoAuthGuardService]},
  {path: 'category/:name/:id', component: CategoryComponent, canActivate:[NoAuthGuardService]},
  {path: 'shop', component: ShopComponent, canActivate:[NoAuthGuardService]},
  {path: 'product/:name/:id', component: ProductComponent, canActivate:[NoAuthGuardService]},
  {path: 'login', component: LoginComponent, canActivate:[NoAuthGuardService]},
  {path: 'register', component: RegisterComponent, canActivate:[NoAuthGuardService]},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
