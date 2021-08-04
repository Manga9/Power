import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from 'src/app/services/categories/category.service';

@Component({
  selector: 'app-top-categories',
  templateUrl: './top-categories.component.html',
  styleUrls: ['./top-categories.component.scss']
})
export class TopCategoriesComponent implements OnInit, OnDestroy {

  topCats: any = []
  getTopCats?: Subscription

  constructor(private catServ: CategoryService) { }

  ngOnInit(): void {
    this.getTopCats = this.catServ.getAllCategories().subscribe(result => {
      result.forEach(element => {
        if(this.topCats.length < 2) {
          this.topCats.push(element)
        }
      });
    })
  }

  ngOnDestroy(): void {
    this.getTopCats?.unsubscribe()
  }

}
