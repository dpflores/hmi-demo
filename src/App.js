// import logo from './logo.svg';
import './App.css';


import { Test } from './components/test';

import * as utils from './components/utils';
import { Fragment } from 'react';

import { useState } from 'react';

import TicTacToe from './components/tictactoe';
import MyAnimation from './components/animation';
import RectangleImage from './components/image1';

import image1 from './images/tanque.png';

export function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    // para envolver varios componentes usamos el Fragmente
    // tmb se podría usar algo como un div, pero tiene implicación visual
    // se puede usar <> </> pero no es compatible con todos los navegadores 
    <Fragment> 
      <Test />
      <utils.MyButton />
      <utils.MyButtonCounter count={count} onClick={handleClick} />
      <utils.MyButtonCounter count={count} onClick={handleClick} />
      <h1> {utils.user.name} </h1>
      <img
        className="avatar"
        src={utils.user.imageUrl}
        alt={'Photo of ' + utils.user.name}
        style={{
          width: utils.user.imageSize,
          height: utils.user.imageSize
        }}
      />
      <utils.ShoppingList/>
      <TicTacToe />
      <TicTacToe />
      <MyAnimation />

      <RectangleImage imageUrl={image1} initialTop={380} />
    
    </Fragment>
  );
}

export default App;
