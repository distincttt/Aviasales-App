import { add, format } from "date-fns";

import { ITicket } from "../../types/types";
import classes from "./Ticket.module.scss";

export default function Ticket({ ticket }: { ticket: ITicket }) {
   let stopThere = "";
   let stopBack = "";
   if (ticket.segments[0].stops.length) {
      stopThere = `${ticket.segments[0].stops.length} ПЕРЕСАДКИ`;
      if (ticket.segments[0].stops.length === 1) stopThere = "1 ПЕРЕСАДКА";
   } else stopThere = "ПЕРЕСАДОК НЕТ";
   if (ticket.segments[1].stops.length) {
      stopBack = `${ticket.segments[1].stops.length} ПЕРЕСАДКИ`;
      if (ticket.segments[1].stops.length === 1) stopBack = "1 ПЕРЕСАДКА";
   } else stopBack = "ПЕРЕСАДОК НЕТ";

   return (
      <div className={classes.ticket}>
         <div className={classes["ticket__header"]}>
            <span>{ticket.price} Р</span>
            <img
               src={`https://pics.avs.io/110/40/${ticket.carrier}.png`}
               alt=""
            />
         </div>
         <div className={classes["ticket__back-there"]}>
            <div className={classes["ticket__back-there__info"]}>
               <span className={classes["ticket__back-there__info-gray"]}>
                  {ticket.segments[0].origin} - {ticket.segments[0].destination}
               </span>
               <span className={classes["ticket__back-there__info-black"]}>
                  {format(new Date(ticket.segments[0].date), "HH:mm")} -{" "}
                  {format(
                     add(new Date(ticket.segments[0].date), {
                        minutes: ticket.segments[0].duration,
                     }),
                     "HH:mm"
                  )}
               </span>
            </div>
            <div className={classes["ticket__back-there__info"]}>
               <span className={classes["ticket__back-there__info-gray"]}>
                  В ПУТИ
               </span>
               <span className={classes["ticket__back-there__info-black"]}>
                  {Math.floor(ticket.segments[0].duration / 60)}ч{" "}
                  {ticket.segments[0].duration % 60}м
               </span>
            </div>
            <div className={classes["ticket__back-there__info"]}>
               <span className={classes["ticket__back-there__info-gray"]}>
                  {stopThere}
               </span>
               <span className={classes["ticket__back-there__info-black"]}>
                  {ticket.segments[0].stops.join(",")}
               </span>
            </div>
         </div>
         <div className={classes["ticket__back-there"]}>
            <div className={classes["ticket__back-there__info"]}>
               <span className={classes["ticket__back-there__info-gray"]}>
                  {ticket.segments[1].origin} - {ticket.segments[1].destination}
               </span>
               <span className={classes["ticket__back-there__info-black"]}>
                  {format(new Date(ticket.segments[1].date), "HH:mm")} -{" "}
                  {format(
                     add(new Date(ticket.segments[1].date), {
                        minutes: ticket.segments[1].duration,
                     }),
                     "HH:mm"
                  )}
               </span>
            </div>
            <div className={classes["ticket__back-there__info"]}>
               <span className={classes["ticket__back-there__info-gray"]}>
                  В ПУТИ
               </span>
               <span className={classes["ticket__back-there__info-black"]}>
                  {Math.floor(ticket.segments[1].duration / 60)}ч{" "}
                  {ticket.segments[1].duration % 60}м
               </span>
            </div>
            <div className={classes["ticket__back-there__info"]}>
               <span className={classes["ticket__back-there__info-gray"]}>
                  {stopBack}
               </span>
               <span className={classes["ticket__back-there__info-black"]}>
                  {ticket.segments[1].stops.join(",")}
               </span>
            </div>
         </div>
      </div>
   );
}
