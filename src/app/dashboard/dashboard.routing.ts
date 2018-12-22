import { Routes } from '@angular/router';

import { BooksComponent } from './books/books.component';
import { CategoryComponent } from './category/category.component';
import { ProfileComponent } from './profile/profile.component';
import { SuperCategoryComponent } from './super-category/super-category.component';
import { UsersComponent } from './users/users.component';

export const DashboardRoutes: Routes = [{
  path: '',
  children: [{
    path: 'books',
    component: BooksComponent
  }, {
    path: 'admin/categories',
    component: CategoryComponent
  }, {
    path: 'admin/users',
    component: UsersComponent
  }, {
    path: 'admin/supercategories',
    component: SuperCategoryComponent
  }, {
    path: 'profile',
    component: ProfileComponent
  }]
}];
