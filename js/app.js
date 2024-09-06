//variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
// const eliminar = document.querySelector("#eliminar");

let tweets = [];
// console.log(tweets);
//event listeners
eventListeners();

function eventListeners(){
    formulario.addEventListener("submit", agregarTweet);
    listaTweets.addEventListener("click", eliminarTweet);

    document.addEventListener("DOMContentLoaded", () => {
        tweets = JSON.parse(localStorage.getItem("tweets")) || [];

        // console.log(tweets);

        crearHTML();
    })

}

//funciones

function agregarTweet(e){
    e.preventDefault();
    
    //text area donde el user escribe
    const tweet = document.querySelector("#tweet").value;
    
    //validacion del tweet:
    if(!tweet){
        alertaError();
        return;
    }
    
    const tweetObj = {
        date: Date.now(),
        mensaje: tweet,
    }
    //añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];

    //crear html de tweets
    crearHTML();
    formulario.reset();
};

function alertaError(){
    const alertaError = document.createElement("P");
    alertaError.textContent = "El tweet está vacío";
    alertaError.classList.add("error");

    if(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }

    listaTweets.appendChild(alertaError);
    setTimeout(() => {
        listaTweets.removeChild(listaTweets.firstChild);
    }, 3000);

}

//muestra un litsado delos tweets
function crearHTML(){
    limpiarHTML();
    if(tweets.length > 0){
        tweets.forEach(tweet => {
            const contenedorTweet = document.createElement("div");
            contenedorTweet.classList.add("contenedor-tweet");

            const mostrarTweet = document.createElement("P");
            mostrarTweet.textContent = tweet.mensaje;
            mostrarTweet.classList.add("cuerpo__tweet");

            contenedorTweet.appendChild(mostrarTweet);

            const borrarTweet = document.createElement("BUTTON");
            borrarTweet.textContent = "X"
            borrarTweet.classList.add("error");

            borrarTweet.onclick = () =>{
                eliminarTweet(tweet.date)
            }

            contenedorTweet.appendChild(borrarTweet);

            listaTweets.appendChild(contenedorTweet);
        });

        sincronizarStorage();
    };
}

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    };
};

function eliminarTweet(id){
    tweets = tweets.filter(tweet => tweet.date !== id);
    console.log(tweets);
    crearHTML()
};

function sincronizarStorage(){
    localStorage.setItem("tweets", JSON.stringify(tweets));
    // location.reload();
};