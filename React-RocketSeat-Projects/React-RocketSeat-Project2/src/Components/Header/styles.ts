import styled from "styled-components";


export const HeaderContainer = styled.header`

display: flex;
align-items: center;
justify-content: space-between;

nav {

    display: flex;
    gap:0.5rem;

    a {
        width: 3rem;
        height: 3rem;

        display: flex;
        justify-content: center;
        align-items: center;

        color: ${(props) => props.theme['gray-100']};

        border-top: 3px solid transparent; //como o icone vai subir 3px, precisamos alinhar ele de novo ao centro com +3px
        border-bottom: 3px solid transparent; //sem ela quando der o hover, o ícone vai subir, então já estou travando uma borda

        &:hover{
            border-bottom: 3px solid ${(props) => props.theme['green-500']};
        }
    }

}

`