import { SidenavItem } from "app/base/sidenav/sidenav.model";

export const SIDENAV_ITEMS: SidenavItem[] = [
  {
    id: 'products',
    labels: {
      en: "Products",
      fr: "Liste des produits"
    },
    link: 'products'
  },
  {
    id: 'admin/products',
    labels: {
      en: "Admin",
      fr: "Gestion des produits"
    },
    link: 'admin/products'
  }

];