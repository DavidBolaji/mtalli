import { Category, Image, Product, Promotion } from "@prisma/client";

export type IPromotion =  Promotion & { product: (Product & { images: Image[] })[] | null } & { category: Category[] | null } | null