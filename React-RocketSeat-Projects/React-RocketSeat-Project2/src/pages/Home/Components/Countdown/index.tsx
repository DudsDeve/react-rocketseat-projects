import { useEffect, useState } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";

interface CountDownProps{
  activeCycle: any,
  setCycles: any
}
//definimos o typo para que possa ligar a home principal






export function Countdown({activeCycle, setCycles }:CountDownProps )                                                                                                                                          }: CountDownProps) {

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  //para sabermos quantos segundos se passaram desde
  
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  //se tiver um ciclo ativo, vai ser os minutos vezes 60, se não tiver um ciclo ativo ela vai ser 0 

  useEffect(()=>{

    let interval:number;
    //definimos a variável interval e typamos ela como um number

    if (activeCycle){
      interval = setInterval(()=>{
        const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate);

          if(secondsDifference >= totalSeconds) {

            setCycles( state => state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date()}
              } else { return cycle}
            }), 
            )

            setAmountSecondsPassed(totalSeconds)
            clearInterval(interval)
          }
              else{ setAmountSecondsPassed( secondsDifference)}
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
    //criamos o return para que toda vez que o useEffect for ativo, ele reinicie
   }, [activeCycle, totalSeconds, activeCycleId])
}


    return(

    <CountdownContainer>
        <span>{minutes[0]}</span>
        <span>{minutes[1]}</span>
        <Separator>:</Separator>
        <span>{seconds[0]}</span>
        <span>{seconds[1]}</span>
      </CountdownContainer> )
