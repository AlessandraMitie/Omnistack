import { createAppContainer, createSwitchNavigator } from 'react-navigation';

//importar as páginas:
import Login from './pages/Login';
import List from './pages/List';
import Book from './pages/Book';

//componente Routes:
const Routes = createAppContainer(
//createAppContainer é uma instrução do react navigation. Ele precisa ser usado por volta de todas as rotas
    createSwitchNavigator({
        Login,
        List,
        Book
    })
);

//exportar as rotas
export default Routes;