// import logo from './logo.svg';
import './App.css';


import { Fragment } from 'react';


import Draw from './components/image1';


export function App() {
  return (
    // para envolver varios componentes usamos el Fragmente
    // tmb se podría usar algo como un div, pero tiene implicación visual
    // se puede usar <> </> pero no es compatible con todos los navegadores 
    <Fragment> 
  
      <Draw />
    
    </Fragment>
  );
}

export default App;
