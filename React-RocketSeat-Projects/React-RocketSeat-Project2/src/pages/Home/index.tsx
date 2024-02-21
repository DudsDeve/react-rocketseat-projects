import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { FormContainer, HomeContainer, CountdownContainer, Separator, StartCountdownButton, TaskInput, MinutesAmountInput } from './styles'
import  * as zod from 'zod'
import { zodResolver} from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { differenceInSeconds, interval } from 'date-fns'


const newCyckeFormValidationSchema = zod.object({ //criamos as regras de  validação
  task: zod.string().min(1, 'Informe a tarefa!'),
  minutesAmount: zod.number().min(5, 'O ciclo precisa ser de no mínimo 5 minutos').max(60, 'O ciclo precisa ser de no máximo 60 minutos')
}) 

//quer dizer que a task, precisa ser uma string, com no mínimo 1 caractere, caso o campo não for válido, aparece essa menssagem
//quer dizer que o campo de minutos, precisa ser um número sendo no mínimo o 5 e no máximo 60

type NewCycleFormData = zod.infer<typeof newCyckeFormValidationSchema>
//utilizamos isso com o type, para typar os dados do formulário, sem precisar descrever cada um 


interface Cycle{
  id: string, //preciso de um id, sempre que precisar medir algo único na aplicação
  task:string,
  minutesAmount: number,
  startDate: Date
}

const Home = () => {

//para comerçarmos a dar vida a aplicação

const [ cycles , setCycles ] = useState<Cycle[]>([]) //cycle[], quer dizer que vamos iniciar uma lista de ciclos //o ([]) quer dizer que vai começar o useStade com uma lista vazia

const [activeCycleId, setActiveCycledId] = useState<string | null>(null) 
//aqui definimos que o ciclo pode começar com uma string ou como nulo, com string caso haja uma string inserida ou nulo, caso não haja nada inserido
//definimos o estado inicial como (null) pois não há nada inserido inicialmente

const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
//para sabermos quantos segundos se passaram desde


//--------

  const {register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({ 
    resolver: zodResolver(newCyckeFormValidationSchema),//passamos o zod resolver, para passarmos dentro dele quais serão as nossas regras de validação
    defaultValues: {
      task:'', //passamos os valores iniciais de cada propriedade
      minutesAmount:0
    }
   })

   const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
   //aqui usamos o find para procurar em todos os ciclos passados, o ciclo com a id === a id do ciclo que está ativo

   useEffect(()=>{

    let interval:number;
    //definimos a variável interval e typamos ela como um number

    if (activeCycle){
      interval = setInterval(()=>{
        setAmountSecondsPassed(differenceInSeconds(new Date(), activeCycle.startDate),
        )
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
    //criamos o return para que toda vez que o useEffect for ativo, ele reinicie
   }, [activeCycle])



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


  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  //se tiver um ciclo ativo, vai ser os minutos vezes 60, se não tiver um ciclo ativo ela vai ser 0 

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
    <FormContainer>
    <label htmlFor='task'>Vou trabalhar em </label>
    <TaskInput id='task' list='task-suggestion' placeholder='Dê um nome para seu projeto'
    {...register('task')}
    />
 {/*...register, serve para ligar a const feita ao elemento, e o valor passado dentro serve como um name / id*/}
   
    <datalist id='task-suggestion'> {/*Criamos uma lista de sugestões de valores passados aneriormente*/}
      <option value='Projeto1'/>
      <option value='Projeto2'/>
      <option value='Projeto3'/>

    </datalist>


    <label htmlFor='minutesAmount'>durante</label>
    <MinutesAmountInput id='minutesAmount' type='number' placeholder='00' step={5} 
    {...register('minutesAmount', {valueAsNumber: true})}
    
    /> 
    {/* step: para o numero pular de tanto em tanto // max: valor máximo // min: valor mínimo 
    valueAsNumber: true, foi passado para o dado inves dele vim como string, ele já ser passado como um number
    */}
    <span> minutos.</span>
   </FormContainer>

      <CountdownContainer>
        <span>{minutes[0]}</span>
        <span>{minutes[1]}</span>
        <Separator>:</Separator>
        <span>{seconds[0]}</span>
        <span>{seconds[1]}</span>
      </CountdownContainer>


      {activeCycle ? ( //se o ciclo estiver ativo ........, se não estiver 
       <StopCountdownButton  type='button'><HandPalm size={24}/>Começar</StopCountdownButton> 
       //type button, porque não quero criar um novo ciclo, só interromper o atual

      ) : (<StartCountdownButton disabled={!task} type='submit'><Play size={24}/>Começar</StartCountdownButton> )}
      {/*isabled={!task} , vai sesabilitar o button, quando não estiver nada escrito pelo usuário na task*/} 
      
      </form>
    </HomeContainer>
  )
}

//

export default Home