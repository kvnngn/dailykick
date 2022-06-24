declare enum UserRole {
  ROOT = 1,
  ADMIN = 2,
  USER = 3
}

declare type User = {
  avatar: string;
  date: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  roles: string[];
  _id: string;
};

declare type Warehouse = {
  _id: string;
  name: string;
  createdBy: User;
  createdAt: Date;
  lastUpdated: Date;
  lastUpdatedBy: User;
};

declare type Brand = {
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

declare type BrandModel = {
  name: string;
  brand: Brand;
  createdAt: Date;
  updatedAt: Date;
};

declare type Product = {
  _id: string;
  name: string;
  images_url: string[];
  colors: string[];
  price: number;
  brand: Brand;
  model: Model;
  createdBy: Profile;
  createdAt: Date;
  updatedAt: Date;
};

declare type LoginResponse = {
  userId: string;
  token: string;
  expiresPrettyPrint: string;
  expires: number;
};
