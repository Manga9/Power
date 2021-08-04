import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/services/categories/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  allCats: any = []
  getAllCats?: Subscription

  constructor(private catServ: CategoryService) { }

  ngOnInit(): void {
    this.getAllCats = this.catServ.getAllCategories().subscribe(result => {
      this.allCats = result
    })
  }

  ngOnDestroy(): void {
    this.getAllCats?.unsubscribe()
  }
}
