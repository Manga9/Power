import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/services/categories/category.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  allCats: any = []
  getCats?: Subscription

  constructor(private catServ: CategoryService) { }

  ngOnInit(): void {
    this.getCats = this.catServ.getAllCategories().subscribe(result => {
      this.allCats = result
    })
  }

  ngOnDestroy(): void {
    this.getCats?.unsubscribe()
  }

}
