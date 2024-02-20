import styled from "styled-components";

export const HistoryContainer = styled.main`
flex: 1;
padding: 3.5rem ;

display: flex;
flex-direction: column;

h1 {
    font-size:1.5rem ;
    color: ${(props) => props.theme['gray-100']};

}
`

export const HistoryList = styled.div`

flex: 1;
overflow: auto; //para que gere uma barra de rolagem caso necessário, se o tamanho da tabela for maior do que a div que está dentro, muioto usado para adaptar para celulares
margin-top:  2rem;

table{
    width: 100%;
    border-collapse: collapse;//não soma as bordas quando tem 2 elementos pertos
    min-width: 600px; //para forçar um scroll quanto estiver com menos de 600px

}

th{
    background-color: ${(props) => props.theme['gray-600']};
    padding: 1rem;
    text-align: left;
    color:  ${(props) => props.theme['gray-100']};
    font-size: 0%.875rem;
    line-height: 1.6;

    &:first-child{ //para pegar o primeiro th
        border-top-left-radius: 8px;
    }

    &:last-child{ // para pegar o último th
        border-top-right-radius: 8px;
    }

   


}

td{
        background-color: ${(props) => props.theme['gray-700']};
        border-top: 4px solid  ${(props) => props.theme['gray-800']};
        padding: 1rem;
        font-size: 0.875rem;
        line-height: 1.6;

        
    &:first-child{ //para pegar o primeiro th
        width: 50%; //para ocupar a maioria do espaço
    }

    &:last-child{ // para pegar o último th
        border-top-right-radius: 8px;
    }

    }

`



const STATUS_COLORS = { //objeto javascript
    yellow: 'yellow-500',
    green: 'green-500',
    red: 'red-500',
} as const //utilizamos o as const para dizer para o typescript que esse valor não mudará

interface StatusProps {
    statusColor: keyof typeof STATUS_COLORS 
    //significa que as cores disponíveis são as keys dos tipo do meu objeto
    //para passar um objeto jscript no typescript precisamos do typeof, a key foi passada para conseguirmos acessar as cores 'yellow' 'green' 'red'

}

export const Status = styled.span<StatusProps>`
display: flex;
align-items: center;
gap: 0.5rem;

&::before{
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${(props) => props.theme[STATUS_COLORS[props.statusColor]]}; //ligamos a STATUS_COLOR passada a propriedade que criamos nos elementos chamada statusColor
    //passamos o objeto javascript e dentro dele passamos a propriedade que nos criamos no index
}


`