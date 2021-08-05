import { ProductComponent } from './components/product/product.component';
import { ShopComponent } from './components/shop/shop.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'category/:name/:id', component: CategoryComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'product/:name/:id', component: ProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
