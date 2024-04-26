export interface ITicket {
   price: number;
   carrier: string;
   segments: Segment[];
}

interface Segment {
   origin: string;
   destination: string;
   date: string;
   duration: number;
   stops: string[];
}
