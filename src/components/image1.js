import { useState } from 'react';



const RectangleImage = ({ imageUrl, initialTop }) => {
    const [top, setTop] = useState(initialTop);
    const [height, setHeight] = useState(100);

    const handleHeightChange = (e) => {
      const newHeight = parseInt(e.target.value, 10);
      setHeight(newHeight);
    };
    const image_width = 300;
    const image_height = 300;

    const tank_height = 52/100*image_height;


    return (
      <div style={{ position: 'relative', width: `${image_width}px`, height:`${image_height}px` }}>

        <img src={imageUrl} alt="Background" style={{ width: '100%', height: '100%' }} />
        <div
        style={{
            position: 'absolute',
            bottom: '35%', // Define la posición vertical desde la parte superior
            left: '8%',
            width: '85%',
            height: `${height}px`, // Altura fija del rectángulo
            backgroundColor: 'rgba(255, 0, 0, 0.8)', // Color de fondo del rectángulo
            borderRadius: '15px', // Bordes redondeados
        }}
        />
        <input
        type="range"
        min="0"
        max={tank_height} // Puedes ajustar el rango máximo según tus necesidades
        value={height}
        onChange={handleHeightChange}
        style={{ width: '100%' }}
            />
    </div>
    );
  };
  
  export default RectangleImage;