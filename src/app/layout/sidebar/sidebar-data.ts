import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Menu',
  },
  {
    displayName: 'Home',
    iconName: 'entypo:home',
    route: '/home',
  },
  {
    displayName: 'Construction',
    iconName: 'ic:round-construction',
    route: '/construction',
  },
  {
    navCap: 'Components',
    divider: true
  },
  {
    displayName: 'Construction Settings',
    iconName: 'iconamoon:component-fill',
    route: 'construction-settings',
  },
  {
    displayName: 'Construction Results',
    iconName: 'iconamoon:component-fill',
    route: 'construction-results',
  },
  {
    displayName: 'Visualisation',
    iconName: 'iconamoon:component-fill',
    route: 'visualisation',
  },
  
];
