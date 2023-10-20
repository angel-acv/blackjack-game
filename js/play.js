/*
    2C = Two of clubs
    2D = Two of Diaminds
    2H = Two of Hearts
    25 = Two of Spades 
*/

let deck= [];
let typesCards = ['C', 'D', 'H', 'S'];
let specials = ['A', 'J', 'Q', 'K'];

let puntosPlayer = 0, puntosCompu = 0;
// Referencias de html
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevaPartida = document.querySelector('#btnNuevo');
const viewPoints = document.querySelectorAll('small');
const CardsPlayer = document.querySelector('#player-card');
const cardsCompu = document.querySelector('#comput-card'); 

//creamos el deck
const crearDeck = ()=>{
    for(let i = 2; i <= 10; i++) {
        typesCards.forEach( typeCard => {
            deck.push(i + typeCard);
        });
    }

    typesCards.forEach(typesCard => {
        specials.forEach(special => {
            deck.push(special + typesCard);
        });   
    });
    

    // console.log(deck);

    deck = _.shuffle(deck);
    console.log(deck);
}

crearDeck();

//esta funcion me permite tomar una carta del deck

const pedirCarta = () =>{

    if(deck.length === 0){
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();
    return carta;
}

// pedirCarta()

const valueCard = (carta) => {
    const value = carta.substring(0, carta.length - 1);
    
    return (isNaN(value))
            ? (value === 'A')
            ? 11 : 10 
            : value * 1;
}
  

const turnCompu = (pointsMins) => {
    do{
        const concatCarta = pedirCarta();
    
        puntosCompu = puntosCompu + valueCard(concatCarta); //valor de los puntos del jugador
        viewPoints[1 ].innerText = puntosCompu; 
    
        const imageCard = document.createElement('img'); // crear elemento de html
        imageCard.classList.add('cards'); // añadir clase hacia el elemento del html
        imageCard.src = `cartas/${concatCarta}.png`; // ruta para imagenes de cartas
        cardsCompu.append( imageCard ); // añadir carta al dom
        
        if(pointsMins > 21){
            break; 
        }
        // console.log(` puntos de maquina: ${puntosCompu} `);

    }while( (puntosCompu < pointsMins) && (pointsMins <= 21)  );

    setTimeout(() => {
        if (puntosCompu === pointsMins) {
            
            Swal.fire({
                title: 'Empate',
                text: "Parece que no hubo ganador",
                icon: 'info',
                
            })
        }else if(pointsMins > 21){
            Swal.fire({
                title: 'Perdiste',
                text: 'Vuelve a intentarlo',
                icon: 'error',
            })
        }else if(puntosCompu > 21){
            Swal.fire({
                title: 'Ganaste!',
                text: 'Felicidades, venciste a la maquina',
                icon: 'success',
            })
        }else{
            Swal.fire({
                title: 'Perdiste',
                text: 'Vuelve a intentarlo',
                icon: 'error',
            })
        }
    }, 15);
}


//Eventos de botones

// Evento de pedir carta
btnPedir.addEventListener('click', () =>{
    const concatCarta = pedirCarta();
    
    puntosPlayer = puntosPlayer + valueCard(concatCarta); //valor de los puntos del jugador
    viewPoints[0].innerText = puntosPlayer; 

    const imageCard = document.createElement('img'); // crear elemento de html
    imageCard.classList.add('cards'); // añadir clase hacia el elemento del html
    imageCard.src = `cartas/${concatCarta}.png`; // ruta para imagenes de cartas
    CardsPlayer.append( imageCard ); // añadir carta al dom

    if ( puntosPlayer > 21) {
        console.warn("Has perdido 💀");
        btnPedir.disabled = true; // bloquea el boton
        btnDetener.disabled = true; 
        turnCompu( puntosPlayer );
        // location.reload();

    }else if (puntosPlayer == 21){
        console.warn("21 puntos, felicitaciones 🤩");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnCompu( puntosPlayer );
        
    }

    // console.log(`Puntos de jugador: ${puntosPlayer}`);
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    console.warn('Partida detenida, espera respuesta...');
    (() => {
        const alertStop = () =>{
            Swal.fire({
                title: 'Has detenido tu partida',
                text:'Espera tu respuesta...',
                icon: 'warning',
                showConfirmButton: false,
            })
            
            setTimeout(() => {
                turnCompu(puntosPlayer);
            }, 2000);
        }
        alertStop();
        console.log('fin de bloqueante');
    })();

})

btnNuevaPartida.addEventListener('click', () => {
    btnDetener.disabled = true;
    btnDetener.disabled= true;

    Swal.fire({
        title: '¿Desea volver a intentarlo?',
        text: "Si vuelves a internarlo, se perdera el progreso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4235CD',
        cancelButtonColor: '#EA5353',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, Quiero volver a intentarlo'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Aprobado!',
            'Suerte en este intento',
            'success'
          )
          setTimeout(() => {
            location.reload();
            console.clear();
            deck= []
            deck= crearDeck();
          }, 1500);

        }
    })

    
})