import { Image, Event, Promotion } from "@prisma/client";

export type IPromotion =  Promotion & { event: (Event & { images: Image[] })[] | null } | null