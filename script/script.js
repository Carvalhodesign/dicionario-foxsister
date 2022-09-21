let elementoFormulario = document.querySelector('.js-formulario'); 
let elementoResultado = document.querySelector('.js-resultado'); 
let elementoCarregamento = document.querySelector('.js-carregamento'); 
let elementoResultadoTitulo = document.querySelector('.js-resultado_titulo'); 
let elementoResultadoDescricao = document.querySelector(
    '.js-resultado_descricao'
);

function erroPalavraNaoEncontrada() {
    elementoResultadoTitulo.textContent =
      "Palavra não encontrada, verifique a grafia e tente novamente!";
    elementoResultadoDescricao.textContent = "";
  }

  function PalavraEncontrada(resposta,palavra) {
    elementoResultadoTitulo.textContent =
    palavra;
    txt  = String(resposta);
    elementoResultadoDescricao.textContent = txt.replaceAll(",",", ");
  

  }

  function FraseEncontrada(resposta) {
    elementoResultadoFrase.textContent =
    resposta[0];
}

elementoFormulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
       
    elementoCarregamento.classList.remove("display-none");
    elementoResultado.classList.remove("display-none");

    let palavra = evento.target[0].value; 
    evento.target[0].value="";
    let urlSinonimos = `https://significado.herokuapp.com/v2/sinonimos/${palavra}`;


    fetch(urlSinonimos)
    .then((resposta) => resposta.json())
    .then((resposta) => {
        console.log(resposta)

        if (!resposta[0]) {
            erroPalavraNaoEncontrada();
           console.log(erroPalavraNaoEncontrada)
           return;
         }
         else{
          PalavraEncontrada(resposta,palavra);
   
         }
        
       })
       .finally(() => {
        elementoCarregamento.classList.add("display-none");      

});

});
