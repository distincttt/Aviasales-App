import { useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import Buttons from "../Buttons/Buttons";
import Ticket from "../Ticket/Ticket";

import classes from "./Main.module.scss";
import { useAppSelector } from "../../types/hooks";

export default function Main() {
   const tickets = useAppSelector((state) => {
      return state.ticketsSlice.tickets;
   });
   let { loading, error } = useAppSelector((state) => {
      return state.ticketsSlice;
   });
   const checkboxes = useAppSelector((state) => state.checkboxSlice);

   const [showTickets, setShowTickets] = useState(5);

   let ticketsFiltered = tickets.filter((el) => {
      if (checkboxes["Все"]) return el;
      if (
         checkboxes["Без пересадок"] &&
         !el.segments[0].stops.length &&
         !el.segments[1].stops.length
      )
         return el;
      if (
         checkboxes["1 пересадка"] &&
         el.segments[0].stops.length === 1 &&
         el.segments[1].stops.length === 1
      )
         return el;
      if (
         checkboxes["2 пересадки"] &&
         el.segments[0].stops.length === 2 &&
         el.segments[1].stops.length === 2
      )
         return el;
      if (
         checkboxes["3 пересадки"] &&
         el.segments[0].stops.length === 3 &&
         el.segments[1].stops.length === 3
      )
         return el;
   });
   let errorText = "";
   if (ticketsFiltered.length === 0)
      errorText = "Рейсов, подходящих под заданные фильтры, не найдено...";
   ticketsFiltered.length = showTickets;

   // console.log(ticketsFiltered);
   const clickShowMore = () => {
      setShowTickets(showTickets + 5);
   };

   return (
      <main className={classes.main}>
         <Buttons />
         {loading && (
            <Spin
               style={{ marginTop: 30 }}
               indicator={<LoadingOutlined style={{ fontSize: 200 }} spin />}
            />
         )}
         {Boolean(!error) &&
            ticketsFiltered.map((el, i) => {
               return <Ticket key={i} ticket={el} />;
            })}
         {errorText && <span className={classes.error}>{errorText}</span>}
         {!errorText && (
            <button className={classes["button"]} onClick={clickShowMore}>
               ПОКАЗАТЬ ЕЩЁ 5 БИЛЕТОВ
            </button>
         )}
      </main>
   );
}
