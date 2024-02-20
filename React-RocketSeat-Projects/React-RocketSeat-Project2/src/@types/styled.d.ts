import 'styled-components';
import { defaultTheme } from '../Components/styles/themes/default';

type ThemeType = typeof defaultTheme;

declare module 'styled-components'{ //esse serve apenas para sobrescrever, aqui dentro vamos declarar todas propriedades que queremos

    export interface DefaultTheme extends ThemeType { // não vale a pena entender isso, ele mesmo disse 

    }
}