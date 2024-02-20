
import { createGlobalStyle } from "styled-components";


export const GlobalStyle = createGlobalStyle` //aqui dentro colocamos todos os elementos que queremos que seja global

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;  
}

:focus{
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme['gray-500']};
}
body{
    background: ${(props) => props.theme['gray-900']}; // assim vamos definir as cores 
    color: ${(props) => props.theme['green-300']}
}
`