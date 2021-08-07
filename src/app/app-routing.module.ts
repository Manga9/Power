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
import { CartComponent } from './components/cart/cart.component';
import { OrderDoneComponent } from './components/order-done/order-done.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'category/:name/:id', component: CategoryComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'product/:name/:id', component: ProductComponent},
  {path: 'login', component: LoginComponent, canActivate:[NoAuthGuardService]},
  {path: 'register', component: RegisterComponent, canActivate:[NoAuthGuardService]},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuardService]},
  {path: 'cart', component: CartComponent, canActivate:[AuthGuardService]},
  {path: 'done', component: OrderDoneComponent, canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
