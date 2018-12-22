import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'books',
    name: 'RESOURCES',
    type: 'link',
    icon: 'library_books'
  }, {
    state: 'profile',
    name: 'PROFILE',
    type: 'link',
    icon: 'person'
  }, {
    state: 'admin',
    name: 'ADMIN',
    type: 'sub',
    icon: 'security',
    children: [
      {
        state: 'categories',
        name: 'CATEGORY',
        type: 'link',
        icon: 'category',
      }, {
        state: 'supercategories',
        name: 'SUPERCATEGORY',
        type: 'link',
        icon: 'widgets'
      }, {
        state: 'users',
        name: 'USERS',
        type: 'link',
        icon: 'people'
      }
    ]}
];

const USERMENUITEMS = [
  {
    state: 'books',
    name: 'RESOURCES',
    type: 'link',
    icon: 'library_books'
  },
  {
    state: 'profile',
    name: 'PROFILE',
    type: 'link',
    icon: 'person'
  }
];

@Injectable()
export class MenuService {
  getAll(): Menu[] {
    if (localStorage.getItem('role') === 'admin') {
      return MENUITEMS;
    } else {
      return USERMENUITEMS;
    }
  }

  add(menu) {
    MENUITEMS.push(menu);
  }
}
