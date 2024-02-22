import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import {  HomeContainer,  StartCountdownButton, StopCountdownButton, } from './styles'
import  * as zod from 'zod'
import { zodResolver} from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { differenceInSeconds, interval } from 'date-fns'
import { NewCycleForm } from './Components/NewCycleForm/index'
import { Countdown } from './Components/Countdown/index'





interface Cycle{
  id: string, //preciso de um id, sempre que precisar medir algo único na aplicação
  task:string,
  minutesAmount: number,
  startDate: Date,
  interruptedDate?: Date,
  finishedDate?:Date
}
//? opcional

const Home = () => {

//para comerçarmos a dar vida a aplicação

const [ cycles , setCycles ] = useState<Cycle[]>([]) //cycle[], quer dizer que vamos iniciar uma lista de ciclos //o ([]) quer dizer que vai começar o useStade com uma lista vazia

const [activeCycleId, setActiveCycledId] = useState<string | null>(null) 
//aqui definimos que o ciclo pode começar com uma string ou como nulo, com string caso haja uma string inserida ou nulo, caso não haja nada inserido
//definimos o estado inicial como (null) pois não há nada inserido inicialmente

const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
//para sabermos quantos segundos se passaram desde


//--------

 
   const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
   //aqui usamos o find para procurar em todos os ciclos passados, o ciclo com a id === a id do ciclo que está ativo




   


  function handleCreateNewCycle(data:NewCycleFormData){

    const id = String(new Date().getTime())

    const newCycle : Cycle = {
      id, // vai sair um valor em milessegundos onde sempre vai ser um id diferente
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    setCycles((state) => [...state, newCycle]) 
    //sempre que uma alteração de estado, depender de um estado anterior, devemos abrir uma função
    //adicionamos todos os cycles que ja temos e adicionamos um novo cycle

    setActiveCycledId(id) //com isso verificamos se o ciclo atual esta ativo ou não

    setAmountSecondsPassed(0)//definimos como 0, para que ele não reaproveite os segundos do último ciclo e que toda vez que ele reinicie começe no 0

    reset(); // ele reseta os valores preenchidos no campo, para o valor passado original
  
  }

  function handleInterruptCycle(){

    setCycles( state=>state.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return { ...cycle, interruptedDate: new Date()}
      } else { return cycle}
    }), 
    )
    setActiveCycledId(null) //null, porque nao queremos mais nenhum ciclo ativo

  }

  

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  //tempo total, se tiver um ciclo ativo, segundos totais - segundos que já se passaram

  const minutesAmount = Math.floor(currentSeconds / 60) 
  //minutos totais, math florr, para arredondar para baixo 

  const secondsAmount = currentSeconds  % 60
  //pegamos o restante de segundos que sobraram na operação acima

  const minutes = String(minutesAmount).padStart(2, '0')
  //transformar em string, para poder adicionar o padStard( o número de caracteres que voce quer que tenha, qual caractere vai ter na frente, enquanto não houver 2 caracteres)
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(()=>{
    if(activeCycle){
      document.title = `${minutes}:${seconds}`
    }
    
  }, [minutes , seconds, activeCycle])
  //assim eu consigo atualizar tambem o titulo da minha aba do navegador, para o contador do relógio

   const task =  watch('task' && 'minutesAmount' ) 
   //vai observar (watch) o campo 'task' e 'minutesAmount', só quando os 2 forem preenchidos que ele vai ativar o button


  return (
  
  <HomeContainer>
   <form action='' onSubmit={handleSubmit(handleCreateNewCycle )}>

        <NewCycleForm />
        <Countdown activeCycle={activeCycle} setCycles={setCycles}/>



      

      {activeCycle ? ( //se o ciclo estiver ativo ........, se não estiver 
       <StopCountdownButton  type='button' onClick={handleInterruptCycle}><HandPalm size={24}/>Interromper</StopCountdownButton> 
       //type button, porque não quero criar um novo ciclo, só interromper o atual

      ) : (<StartCountdownButton disabled={!task} type='submit'><Play size={24}/>Começar</StartCountdownButton> )}
      {/*isabled={!task} , vai sesabilitar o button, quando não estiver nada escrito pelo usuário na task*/} 
      
      </form>
    </HomeContainer>
  )
}

//

export default Home