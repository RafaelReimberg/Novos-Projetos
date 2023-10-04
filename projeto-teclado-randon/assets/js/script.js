//Teclado 
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById("passwordInput");
    const keys = document.querySelectorAll(".key");
    const clearButton = document.querySelector(".clear");

    keys.forEach(function(key) {
        key.addEventListener("click", function() {
            passwordInput.value += key.textContent;
        });
    });

    clearButton.addEventListener("click", function() {
        passwordInput.value = "";
    });
});


// Verificar o icone olho aberto e fechado
const pass = document.getElementById('passwordInput');
const icon = document.getElementById('icon');

    function showHide(){
        if(pass.type === 'password'){
            pass.setAttribute('type','text');
            icon.classList.add('hide')
        }
            else{
                pass.setAttribute('type', 'password');
                icon.classList.remove('hide')
            }
    } 