import UserProvider from './contexts/user';
import Rotas from './routes';
import './style.css'

function App() {
  return (
    <UserProvider>
      <Rotas/>
    </UserProvider>
  );
}

export default App;