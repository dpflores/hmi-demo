import { Fragment, useCallback, useState } from 'react';

import sensorUrl from './images/senor_nivel.png';
import sensor2Url from './images/VVB001.png';
import sensor3Url from './images/sensor_cap.png';
import sensor4Url from './images/sensor_temp.png';
import tankUrl from './images/tanque.png';
import motorUrl from './images/motor-electrico.png';
import iolinkUrl from './images/iolink.png';
import beltUrl from './images/belt.png';
import objectUrl from './images/object.png';
import acmeUrl from './images/logo_acme.png';
import ledonUrl from './images/led_on.png';
import ledoffUrl from './images/led_off.png';

import { useEffect } from 'react';
import { useSize } from '../hooks/size';


export default Draw;

function Draw(){


  const [data_json, setData] = useState({});
  const [portrait, setPortrait] = useState(true);
  const {setSize} = useSize()

  const listener = useCallback((e)=>{
      if(window.innerWidth > window.innerHeight) {
        setPortrait(false);
        setSize("vh")
      } else {
        setPortrait(true);
        setSize("vw")
      }
  }, [setPortrait, setSize])

  useEffect(() => {
    const fetchData = () => {
      fetch('https://flowdemo.acmecia.com/data_demo')
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData(data);
          // setPosts(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    window.addEventListener("resize", listener)
    listener()
    // Ejecutar fetchData inicialmente
    fetchData();

    // Configurar un intervalo para ejecutar fetchData cada 500 milisegundos
    const intervalId = setInterval(fetchData, 200);

    // Limpieza cuando el componente se desmonta
    return () => {clearInterval(intervalId);
      window.removeEventListener("resize", listener)
    }
  }, []);

  return (
    <div style={{
      position: "relative",
      height: portrait ? "40vh" : "100vh"
    }}>
      <Header width={17} height={10} left={0} top={0}/>
      <Connections width={100} height={25} left={0} top={12}/>
      <TankSide width={25} height={50} left={70} top={32}
      led2={data_json.led2} led3={data_json.led3*100} text5={Math.round(data_json.text5*100)/100}/>
      <MotorSide width={30} height={50} left={30} top={32} text01={Math.round(data_json.text01*100)/100}
      text1={Math.round(data_json.text1*100)/100} text2={Math.round(data_json.text2*100)/100} text3={Math.round(data_json.text3*100)/100} text4={Math.round(data_json.text4*100)/100}/>
      <BeltSide width={30} height={50} left={0} top={32} text0={Math.round(data_json.text0*100)/100}
      led0={data_json.led0} led1={data_json.led1}/>
    </div>
  )
}

function Header({width, height,top, left}){
  return(
    <div style={{ position: 'absolute', width: `${width}%`, height:`${height}%`, top: `${top}%`, left: `${left}%`}}>
    <img src={acmeUrl} alt="Background" style={{ margin: 16,position: 'absolute', width: '100%', height: '100%', objectFit: 'contain'}} />
    </div>
  )

}

function Connections({width, height,top, left}){

  return(

    <Fragment>
      <div style={{ position: 'absolute', width: `${width}%`, height:`${height}%`, top: `${top}%`, left: `${left}%`}}>
        
        <Line left={11.5} top={20} thickness={1} length={130} orientation={true}/>
        <Line left={11.5} top={20} thickness={8} length={25} orientation={false}/>

        <Line left={26.5} top={45} thickness={1} length={150} orientation={true}/>
        <Line left={26.5} top={45} thickness={8} length={10} orientation={false}/>

        <Line left={44.5} top={45} thickness={1} length={150} orientation={true}/>
        <Line left={34.5} top={45} thickness={8} length={10} orientation={false}/>  

        <Line left={82} top={20} thickness={1} length={60} orientation={true}/>
        <Line left={35} top={20} thickness={8} length={47} orientation={false}/>  


        <IOLinkImage/>
        </div> 
    </Fragment>
    
  )
}


function BeltSide({width, height,top, left, led0, led1, text0}){
  // console.log(text0);
  return(
  <Fragment>
      <div style={{ position: 'absolute', width: `${width}%`, height:`${height}%`, top: `${top}%`, left: `${left}%`}}>
      
      <SensorImage3 size={15} />
      <BeltImage />
      <SensorImage4 size={10} />

      <Label label="DO1" top="55" left="98" color="orange" fontWeight="bold"/>
      <Led top="54" left="110" size="10" isOn={led0} />

      <TextBubble text="ZT"size={10} top={38} left={96} />
      <Label label="IG6086" top="40" left="113" color="black" fontWeight="bold" fontSize={1.5}/>


      <Label label="DO1" top="45" left="47" color="orange" fontWeight="bold"/>
      <Led top="45" left="65" size="10" isOn={led1} />


      <Label label="Temp" top="35" left="47" color="orange" fontWeight="bold"/>
      <TextBox top="35" left="62" length="23" height="6" value={text0} units="°C"/>

      <TextBubble text="TIT"size={10} top={20} left={45} />
      <Label label="TW2000" top="20" left="60" color="black" fontWeight="bold" fontSize={1.4}/>

      </div>
      
    </Fragment>
  )
}

function TankSide({width, height,top, left, led2, led3, text5}){

  return (
    <Fragment>
      <div style={{ position: 'absolute', width: `${width}%`, height:`${height}%`, top: `${top}%`, left: `${left}%`}}>
      <TankImage text5={text5} />
      <TextBubble text="LIT"size={10} top={-15} left={65} />


      <Label label="DO1" top="-35" left="65" color="orange" fontWeight="bold"/>
      <Led top="-38" left="80" size="10" isOn={led2} />

      <Label label="DO2" top="-25" left="65" color="orange" fontWeight="bold"/>
      <Led top="-26" left="80" size="10" isOn={led3} />

      </div>
      
    </Fragment>
  )

}


function MotorSide({width, height,top, left, text01, text1,text2,text3,text4}){
  return(
  <Fragment>
      <div style={{ position: 'absolute', width: `${width}%`, height:`${height}%`, top: `${top}%`, left: `${left}%`}}>
    <MotorImage />

    <Label label="Crest" top="61" left="65" color="orange" fontWeight="bold"/>
    <TextBox top="60" left="82" length="30" height="6" value={text01} units=""/>

    <Label label="Temp" top="51" left="65" color="orange" fontWeight="bold"/>
    <TextBox top="50" left="82" length="30" height="6" value={text1} units="°C"/>

    <Label label="a RMS" top="41" left="65" color="orange"fontWeight="bold"/>
    <TextBox top="40" left="82" length="30" height="6" value={text2} units="m/s"/>

    <Label label="v RMS" top="31" left="65" color="orange"fontWeight="bold"/>
    <TextBox top="30" left="82" length="30" height="6" value={text3} units="m/s"/>

    <Label label="a Peak" top="21" left="65" color="orange"fontWeight="bold"/>
    <TextBoxSquared top="20" left="82" length="30" height="6" value={text4} units="m/s"/>

    <TextBubble text="AIT1"size={10} top={0} left={65}/>
    <Label label="VVB021" top="3" left="85" color="black" fontWeight="bold" fontSize={1.5}/>

    </div>
    
  </Fragment>)
}


function IOLinkImage() {
  
  return(
    <div style={{ position: 'absolute', width: `15%`, height:`80%`, top: '0%', left: '30%' }}>
    <img src={iolinkUrl} alt="Background" style={{position: 'absolute', width: '100%', height: '100%'}} />

    </div>
  )
}


function BeltImage() {
  
  return(
    <div style={{ position: 'absolute', width: `100%`, height:`100%` }}>
    <img src={beltUrl} alt="Background" style={{position: 'absolute', top: '60%', left: '25%', width: '80%', height: '40%'}} />
    <img src={objectUrl} alt="Background" style={{position: 'absolute', top: '55%', left: '35%', width: '8%', height: '8%'}} />
    <img src={objectUrl} alt="Background" style={{position: 'absolute', top: '65%', left: '65%', width: '16%', height: '16%'}} />

    </div>
  )
}

function MotorImage() {
  return (
    <div style={{ position: 'absolute', width: `100%`, height:`100%` }}>
    <SensorImage2 size={12}/>
    <img src={motorUrl} alt="Background" style={{position: 'absolute', top: '60%', left: '25%', width: '40%', height: '40%'}} />
    </div>
    )
}

function TankImage({text5}) {
    // const [top, setTop] = useState(initial/Top);
    // const [height, setHeight] = useState(15);

    // const handleHeightChange = (e) => {
    //   const newHeight = parseInt(e.target.value, 10);
    //   setHeight(newHeight);
    // };

    let max = 2000.0;  // Max value for the tank height

    let height = 52 - text5*52/max;

  

    return (
      <div style={{ position: 'absolute', width: `100%`, height:`100%` }}>

        <img src={tankUrl} alt="Background" style={{ width: '100%', height: '100%' }} />

        <SensorImage size={28}/>
        <TextBox left="35" length="30" value={text5} units="mm"/>
        <Label label="O1D103" top="70" left="40" color="black" fontWeight="bold" fontSize={1.5}/>
        <div
        style={{
            position: 'absolute',
            bottom: '35%', // Define la posición vertical desde la parte superior
            left: '8%',
            width: '85%',
            height: `${height}%`, // Altura fija del rectángulo
            backgroundColor: 'rgba(255, 0, 0, 0.8)', // Color de fondo del rectángulo
            borderRadius: '5%', // Bordes redondeados
        }}
        />
        {/* <input
        type="range"
        min="0"
        max='52' // Puedes ajustar el rango máximo según tus necesidades
        value={height}
        onChange={handleHeightChange}
        style={{ width: '100%' }}
            /> */}
    </div>
    );
  };
  


  function SensorImage({size}){
    return (

      <img
      src={sensorUrl}
      alt="Sensor"
      style={{
        position: 'absolute',
        top: `${-size/2}%`, // Ajusta la posición vertical desde la parte superior según tus necesidades
        left: `${50-size/2}%`, // Ajusta la posición horizontal según tus necesidades
        width: `${size}%`, // Ajusta el ancho de la imagen según tus necesidades
        height: `${size}%`, // Ajusta la altura de la imagen según tus necesidades
      }}
    />

    )
  }

  function SensorImage2({size}){
    return (

      <img
      src={sensor2Url}
      alt="Sensor2"
      style={{
        position: 'absolute',
        top: `${size+28}%`, // Ajusta la posición vertical desde la parte superior según tus necesidades
        left: `${50-size/2}%`, // Ajusta la posición horizontal según tus necesidades
        width: `${size}%`, // Ajusta el ancho de la imagen según tus necesidades
        height: `${2*size}%`, // Ajusta la altura de la imagen según tus necesidades
      }}
    />

    )
  }

  function SensorImage3({size}){
    return (

      <img
      src={sensor3Url}
      alt="Sensor3"
      style={{
        position: 'absolute',
        top: `55%`, // Ajusta la posición vertical desde la parte superior según tus necesidades
        left: `78%`, // Ajusta la posición horizontal según tus necesidades
        width: `${size}%`, // Ajusta el ancho de la imagen según tus necesidades
        height: `${size}%`, // Ajusta la altura de la imagen según tus necesidades
      }}
    />

    )
  }

  function SensorImage4({size}){
    return (

      <img
      src={sensor4Url}
      alt="Sensor4"
      style={{
        position: 'absolute',
        top: `25%`, // Ajusta la posición vertical desde la parte superior según tus necesidades
        left: `35%`, // Ajusta la posición horizontal según tus necesidades
        width: `${size}%`, // Ajusta el ancho de la imagen según tus necesidades
        height: `${2.5*size}%`, // Ajusta la altura de la imagen según tus necesidades
      }}
    />

    )
  }



  function Label({ label,top, left, fontSize, color,fontWeight}) {
    const {size} = useSize()
  
    const labelStyle = {
      position: 'absolute',
      top: `${top}%`,
      left: `${left}%`,
      color: `${color}`,
      marginRight: '5%',
      // fontSize: `${fontSize}em`,
      // fontSize: `${fontSize}vh`|| '3vh',
      fontSize: `${size === 'vw' ? '1.5' : '2'}${size}`,
      fontWeight: `${fontWeight}`,
    };
  
  
    return (
        <div style={labelStyle}>{label}</div>
    );
  }

  function TextBox({value, units, length, height, left, top}){
    const {size} = useSize()

    return (
    <div
      style={{
        top: `${top}%`, // Define la posición vertical desde la parte superior
        position: 'absolute',
        bottom: '5%', // Ajusta la posición vertical desde la parte superior según tus necesidades
        left: `${left}%`, // Ajusta la posición horizontal según tus necesidades
        width: `${length}%`, // Ajusta el ancho del cuadro de texto según tus necesidades
        textAlign: 'center', // Centra el texto horizontalmente
        color: 'black', // Color del texto
        backgroundColor: 'white', // Fondo blanco
        border: '0.1em solid black', // Borde de 1 píxel de ancho, color negro
        height: `${height}%`,
        fontSize: `2${size}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {value} {units}
    </div>
    );
  }

  function TextBoxSquared({value, units, length, height, left, top}){
    const unitsStyle = {
      verticalAlign: 'top',
      fontSize: '0.7em', // Tamaño de fuente más pequeño para el exponente
    };
    const {size} = useSize()

    return (
    <div
      style={{
        top: `${top}%`, // Define la posición vertical desde la parte superior
        position: 'absolute',
        bottom: '5%', // Ajusta la posición vertical desde la parte superior según tus necesidades
        left: `${left}%`, // Ajusta la posición horizontal según tus necesidades
        width: `${length}%`, // Ajusta el ancho del cuadro de texto según tus necesidades
        textAlign: 'center', // Centra el texto horizontalmente
        color: 'black', // Color del texto
        backgroundColor: 'white', // Fondo blanco
        border: '0.1em solid black', // Borde de 1 píxel de ancho, color negro
        height: `${height}%`,
        fontSize: `2${size}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {value} {units}<sup style={unitsStyle}>2</sup>
    </div>
    );
  }

function TextBubble({ text, size, top, left}) {
  const {size : size2} = useSize()

  return (
    <div
      style={{
        position: 'absolute',
        // display: 'inline-block',
        top: `${top}%`,
        left:`${left}%`,
        // paddingTop: '5%',
        width: `${size}%`, // Ajusta el ancho del círculo según tus necesidades
        height: `${size}%`, // Ajusta la altura del círculo según tus necesidades
        borderRadius: '50%', // Esto crea un círculo
        backgroundColor: 'white', // Fondo blanco
        border: '0.2em solid black', // Borde de 2 píxeles de ancho, color negro
        textAlign: 'center',
        color: 'black', // Color del texto
        fontSize: `${size2 === 'vw' ? '1.5' : '2'}${size2}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {text}
    </div>
  );
}


function Led({left, top, size, isOn}){

  const ledColor = isOn ? 'green' : 'red';

  if (isOn){
  return (

      <div style={{
        position: 'absolute',
        left: `${left}%`,
        top: `${top}%`,
        width: `${size}%`|| '30px',
        height: `${size}%` || '30px',
        backgroundColor: ledColor,
        borderRadius: '50%',
        // border: '4px solid black', // Borde de 1 píxel de ancho, color negro
        
    
      }}>
        <img src={ledonUrl} alt="Background" style={{position: 'absolute', width: '100%', height: '100%'}} />
      </div>

  );
    }

    else {
      return (

        <div style={{
          position: 'absolute',
          left: `${left}%`,
          top: `${top}%`,
          width: `${size}%` || '20px',
          height: `${size}%` || '20px',
          backgroundColor: ledColor,
          borderRadius: '50%',
          // border: '4px solid black', // Borde de 1 píxel de ancho, color negro
          
      
        }}>
          <img src={ledoffUrl} alt="Background" style={{position: 'absolute', width: '100%', height: '100%'}} />
        </div>
  
    );
    }

}




function Line({left, top, thickness, length, orientation }) {
  const lineStyle = {
    left: `${left}%`,
    top: `${top}%`,
    position: 'absolute',
    width: orientation ? thickness + '%' : length + '%',
    height: orientation ? length + '%' : thickness + '%',
    backgroundColor: 'orange', // Cambiamos el color a naranja
  };

  return <div style={lineStyle}></div>;
}


