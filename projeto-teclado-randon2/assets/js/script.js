document.addEventListener("DOMContentLoaded", function() {
// Função para embaralhar um array usando o algoritmo de Fisher-Yates
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Criação de um array de números de 0 a 9 e embaralhamento
  const numeros = Array.from({ length: 10 }, (_, i) => i);
  shuffleArray(numeros);

  // Criação do teclado numérico
  const tecladoDiv = document.getElementById("teclado");
  var conta = 1;
  for (let i = 0; i < 10; i += 2) {
    const button = document.createElement("button");
    const numero1 = numeros[i];
    const numero2 = numeros[i + 1];
    button.textContent = `${numero1} - ${numero2}`;
        button.addEventListener("click", () => {
        document.getElementById("pass").textContent = `${numero1} - ${numero2}`; 
        //alert(`Você pressionou o botão ${numero1} - ${numero2}`);
        console.log(pass);
    });
    
    if(conta === 3 || conta === 5){	  
      tecladoDiv.appendChild(document.createElement("br"));
      tecladoDiv.appendChild(button);
    }else{
      tecladoDiv.appendChild(button);
    }
    conta += 1;
  }
  
  const button = document.createElement("button");
  button.textContent = `Limpar`;
  button.style.background = `rgb(253, 59, 0)`;
  button.style.color = `white`;
  
        
  //button.addEventListener('click', clearButton);
    //function limparDados() {
      //  document.getElementById("pass").innerHTML = clearButton; 
    //} 
    tecladoDiv.appendChild(button);
    console.log(clearButton);
    
});
     