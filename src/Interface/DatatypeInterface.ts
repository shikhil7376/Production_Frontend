export interface AdminData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  isBlocked: boolean;
}

export interface AuthData extends AdminData {
  image:string
  wallet:number
}

export interface KennelData extends AdminData{
}

export interface ownersCageData{
  _id:string,
  kennelname:string,
  location:string,
  maxcount:number,
  phone:string,
  pricepernight:number,
  image:string[],
  type:string,
  description:string,
  ownerId:string,
}

 export interface Booking {
  bookingid: string;
  fromdate: string;
  todate: string;
  userid: string;
  _id: string;
  totalamount: number;
  totaldays: number;
  transactionId: string;
  status: string;
  ownerid: string;
  cageImage: string;
  kennelname: string;
  cageid: string;
}

export interface CageData{
  _id?:string,
  description?:string,
  image?:string[],
  kennelname?:string,
  location?: {
    lat: number;          // Latitude
    lng: number;          // Longitude
    address: string;      // Address
};
  maxcount?:number,
  ownerId?:string,
  phone?:string,
  pricepernight?:number,
  type?:string,
  currentBookings?: Booking[],
}

 export interface Errors {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
}

export interface profile extends Errors{
  _id?:string,
  image?:string,
  wallet?:number,
  followers?:number,
  following?:number,
  posts?: Post[];
}

export interface Post {
  _id: string;
  description: string;
  likes: number;
  comments: number;
  images: string[];  // Array of image URLs
  createdAt: string; // ISO date string
}

 export interface CageError extends CageData{
  images?: string | string[];
}

export interface AddCageError {
  kennelname?: string;
  location?: string;
  description?: string;
  maxCount?: string;
  phone?: string;
  PricePerNight?: string;
  type?: string;
  images?: string;
}

export interface EditCageError extends AddCageError {
}

export interface userData{
  _id?:string,
  name?:string,
  email?:string,
  password?:string,
  phone?:string,
  image?:string,
  isBlocked?:boolean,
  userimage?: File, 
  followers?:string[],
  following?:string[],
  isAdmin?:boolean,
  wallet?:number,
  isGoogle?:boolean
}

export interface BookingDetails{
  details: CageData;
  userid: string | undefined;
  email: string | undefined;
  fromdate: string | undefined;
  todate: string | undefined;
  totalAmount: number;
  totalDays: number;
}


export interface PostError {
  description?:string,
  age?:string,
  images?:string
}


export type postdetails = {
  id: string;
  description: string;
  images?: string[];
  likeCount?: number;
  commentCount?: number;
  likes?: string[];
  user?: {
    userid:string
    name: string;
    email: string;
    image: string;
    followers:string[]
  };
};

export interface booking{
  kennelname:string,
  cageid:string,
  userid:string,
  fromdate:string,
  todate:string,
  totalamount:number,
  totaldays:number,
  transactionId:string,
  status:string,
  ownerid:string,
  cageImage: string,
  _id?:string,
  phone?:string,
  username?:string
}

export interface dashboard{
  dailyBookings: number;
  monthlyBookings:number;
  dailyProfit: number;
  monthlyProfit: number;
}

export type UserNotFollow = {
  _id:string,
  name:string,
  image:string
}

export interface chat{
  _id:string,
  chatName:string,
  createdAt:Date,
  updatedAt:Date,
  users:userData[]
  latestMessage?:{
    _id:string,
    chat:string,
    content:string,
    createdAt:string,
    updatedAt:string,
    sender:{
      _id:string,
      name:string,
      email:string,
      image:string,
    }
  }
}