import { useForm } from "react-hook-form"
import { FormContainer, TaskInput, MinutesAmountInput } from "./styles"
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

const newCyckeFormValidationSchema = zod.object({ //criamos as regras de  validação
  task: zod.string().min(1, 'Informe a tarefa!'),
  minutesAmount: zod.number().min(5, 'O ciclo precisa ser de no mínimo 5 minutos').max(60, 'O ciclo precisa ser de no máximo 60 minutos')
}) 

//quer dizer que a task, precisa ser uma string, com no mínimo 1 caractere, caso o campo não for válido, aparece essa menssagem
//quer dizer que o campo de minutos, precisa ser um número sendo no mínimo o 5 e no máximo 60

type NewCycleFormData = zod.infer<typeof newCyckeFormValidationSchema>
//utilizamos isso com o type, para typar os dados do formulário, sem precisar descrever cada um 


export function NewCycleForm(){


  const {register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({ 
    resolver: zodResolver(newCyckeFormValidationSchema),//passamos o zod resolver, para passarmos dentro dele quais serão as nossas regras de validação
    defaultValues: {
      task:'', //passamos os valores iniciais de cada propriedade
      minutesAmount:0
    },
   })


  return(


<FormContainer>
    <label htmlFor='task'>Vou trabalhar em </label>
    <TaskInput id='task' list='task-suggestion'disabled={!!activeCycle} placeholder='Dê um nome para seu projeto'
    {...register('task')} 
    />
 {/*...register, serve para ligar a const feita ao elemento, e o valor passado dentro serve como um name / id*/}
  {/*disabled={!!activeCycle}, utilizamos !!, para transformar em um booleano, então "se activeCycle for true"*/}

   
    <datalist id='task-suggestion'> {/*Criamos uma lista de sugestões de valores passados aneriormente*/}
      <option value='Projeto1'/>
      <option value='Projeto2'/>
      <option value='Projeto3'/>

    </datalist>


    <label htmlFor='minutesAmount'>durante</label>
    <MinutesAmountInput id='minutesAmount' type='number' placeholder='00' step={5} 
    {...register('minutesAmount', {valueAsNumber: true})} disabled={!!activeCycle} 
    
    /> 
    {/* step: para o numero pular de tanto em tanto // max: valor máximo // min: valor mínimo 
    valueAsNumber: true, foi passado para o dado inves dele vim como string, ele já ser passado como um number
    */}
    <span> minutos.</span>
   </FormContainer> )}