import NewArrivalsMen from '../assets/Categories/new-men.jpeg';
import TeesMen from '../assets/Categories/tees-men.jpeg';
import AccessoryMen from '../assets/Categories/access-men.jpeg';
import CarryMen from '../assets/Categories/carry-men.jpeg';
import NewArrivalsWomen from '../assets/Categories/new-women.jpeg';
import TeesWomen from '../assets/Categories/tees-women.jpeg';
import AccessoryWomen from '../assets/Categories/access-women.jpeg';
import CarryWomen from '../assets/Categories/carry-women.png';

export const navigation = {
  categories: [
    {
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          href: { pathname: '/category', search: '?name=new-arrivals&sex=women' },
          imageSrc: NewArrivalsWomen,
          imageAlt: "",
        },
        {
          name: "Basic Tees",
          href: { pathname: '/category', search: '?name=tees&sex=female' },
          imageSrc: TeesWomen,
          imageAlt: "",
        },
        {
          name: "Accessories",
          href: { pathname: '/category', search: '?name=accessories&sex=women' },
          imageSrc: AccessoryWomen,
          imageAlt: "",
        },
        {
          name: "Carry",
          href: { pathname: '/category', search: '?name=carry&sex=women' },
          imageSrc: CarryWomen,
          imageAlt: "",
        },
      ],
    },
    {
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          href: { pathname: '/category', search: '?name=new-arrivals&sex=men' },
          imageSrc: NewArrivalsMen,
          imageAlt: "",
        },
        {
          name: "Basic Tees",
          href: { pathname: '/category', search: '?name=tees&sex=male' },
          imageSrc: TeesMen,
          imageAlt: "",
        },
        {
          name: "Accessories",
          href: { pathname: '/category', search: '?name=accessories&sex=men' },
          imageSrc: AccessoryMen,
          imageAlt: "",
        },
        {
          name: "Carry",
          href: { pathname: '/category', search: '?name=carry&sex=men' },
          imageSrc: CarryMen,
          imageAlt: "",
        },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};

export const footerNavigation = {
  shop: [
    { name: "Bags", href: "/bags" },
    { name: "Tees", href: "/tees" },
    { name: "Objects", href: "/objects" },
    { name: "Home Goods", href: "/home-goods" },
    { name: "Accessories", href: "/accessories" },
  ],
  account: [
    { name: "Manage Account", href: "/account" },
  ],
  connect: [
    { name: "Contact Us", href: "/contacts" },
    { name: "Twitter", href: "/" },
    { name: "Instagram", href: "#" },
    { name: "Pinterest", href: "#" },
  ],
};
