import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}
export interface Saperator {
  name: string;
  type?: string;
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
  saperator?: Saperator[];    
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'dispatchers',
    name: 'Dispatcher',
    type: 'link',
    icon: 'headset_mic'
  },
  {
    state: 'users',
    name: 'Users',
    type: 'link',
    icon: 'people'
  },
  {
    state: 'drivers',
    name: 'Drivers',
    type: 'link',
    icon: 'drive_eta'
  }
];

@Injectable()

export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }

}
