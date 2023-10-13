// import { useState } from 'react';


export function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

    return (
      <button onClick={handleClick}>
      Click me
    </button>
    );
  };

export  function MyButtonCounter({count, onClick}) {
    
    return (
      <button onClick={onClick}>
        Clicked {count} times
      </button>
    );
  }


export const user = {
    name: 'Hedy Lamarr',
    imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
    imageSize: 90,
  };



  const products = [
    { title: 'Cabbage', isFruit: false, id: 1 },
    { title: 'Garlic', isFruit: false, id: 2 },
    { title: 'Apple', isFruit: true, id: 3 },
  ];
  

export function ShoppingList() {
  const listItems = products.map(product =>
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}
