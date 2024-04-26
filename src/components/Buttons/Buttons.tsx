import { ticketsSave } from "../../redux/ticketsSlice";
import { useAppDispatch, useAppSelector } from "../../types/hooks";
import classes from "./Buttons.module.scss";

export default function Buttons() {
   const tickets = useAppSelector((state) => {
      return state.ticketsSlice.tickets;
   });
   let ticketsSortArr = [...tickets];

   const dispatch = useAppDispatch();

   const clickPrice = () => {
      ticketsSortArr = ticketsSortArr.sort((el1, el2) => el1.price - el2.price);
      dispatch(ticketsSave({ ticketsSortArr }));
   };
   const clickFast = () => {
      ticketsSortArr = ticketsSortArr.sort((el1, el2) => {
         const duration1 = el1.segments[0].duration + el1.segments[1].duration;
         const duration2 = el2.segments[0].duration + el2.segments[1].duration;
         return duration1 - duration2;
      });
      dispatch(ticketsSave({ ticketsSortArr }));
   };

   return (
      <div className={classes.buttons}>
         <button className={classes["buttons__button"]} onClick={clickPrice}>
            Самый дешевый
         </button>
         <button className={classes["buttons__button"]} onClick={clickFast}>
            Самый быстрый
         </button>
      </div>
   );
}
