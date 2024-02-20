import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { FormContainer, HomeContainer, CountdownContainer, Separator, StartCountdownButton, TaskInput, MinutesAmountInput } from './styles'
import  * as zod from 'zod'
import { zodResolver} from '@hookform/resolvers/zod'
import { useState } from 'react'


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
  minutesAmount: number

}



const Home = () => {

//para comerçarmos a dar vida a aplicação

const [ cycles , setCycles ] = useState<Cycle[]>([]) //cycle[], quer dizer que vamos iniciar uma lista de ciclos //o ([]) quer dizer que vai começar o useStade com uma lista vazia


//--------

  const {register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({ 
    resolver: zodResolver(newCyckeFormValidationSchema),//passamos o zod resolver, para passarmos dentro dele quais serão as nossas regras de validação
    defaultValues: {
      task:'', //passamos os valores iniciais de cada propriedade
      minutesAmount:0
    }
   })

  function handleCreateNewCycle(data:NewCycleFormData){
    const newCycle : Cycle = {
      id: String(new Date().getTime()), // vai sair um valor em milessegundos onde sempre vai ser um id diferente
      task: data.task,
      minutesAmount: data.minutesAmount,
    }

    setCycles((state) => [...state, newCycle]) 

    //sempre que uma alteração de estado, depender de um estado anterior, devemos abrir uma função
    //adicionamos todos os cycles que ja temos e adicionamos um novo cycle


    reset(); // ele reseta os valores preenchidos no campo, para o valor passado original
  
  }

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
        <span>0</span>
        <span>0</span>
        <Separator>:</Separator>
        <span>0</span>
        <span>0</span>
      </CountdownContainer>


      <StartCountdownButton disabled={!task} type='submit'><Play size={24}/>Começar</StartCountdownButton> 
      {/*isabled={!task} , vai sesabilitar o button, quando não estiver nada escrito pelo usuário na task*/}
      </form>
    </HomeContainer>
  )
}

//

export default Home