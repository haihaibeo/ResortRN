type FormatRoomData = {
  name: string;
  slug: string;
  type: string;
  price: number;
  size: number;
  capacity: number;
  pet: boolean;
  breakfast: boolean;
  featured: boolean;
  description: string;
  extras: Array<string>;
  images: string[];
  id: string;
};

type ResponseMessage = {
  message: string[] | string | null;
  errors: string[] | string | null;
}


type UserState = {
    userId: string;
    token: string;
    userName: string;
}
