import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Menu',
  },
  {
    displayName: 'Dashboard',
    iconName: 'solar:widget-add-line-duotone',
    route: '/dashboard',
  },
  {
    displayName: 'Construction',
    iconName: 'solar:widget-add-line-duotone',
    route: '/construction',
  },
  {
    navCap: 'Components',
    divider: true
  },
  {
    displayName: 'Construction Settings',
    iconName: 'solar:archive-minimalistic-line-duotone',
    route: 'construction-settings',
  },
  
];
