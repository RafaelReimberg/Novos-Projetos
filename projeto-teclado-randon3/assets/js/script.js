const pinInput = document.getElementById('pin-input');
const keyboard = document.querySelector('.keyboard');
const submitButton = document.getElementById('submit-button');

let pin = '';
const randomDigits = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

// Função para embaralhar um array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Função para criar botões do teclado randômico
function createKeyboard() {
    randomDigits.forEach(digit => {
        const key = document.createElement('div');
        key.classList.add('key');
        key.textContent = digit;
        key.addEventListener('click', () => {
            pin += digit;
            pinInput.value = '*'; // Esconde o PIN inserido
        });
        keyboard.appendChild(key);
    });
}

createKeyboard();

submitButton.addEventListener('click', () => {
    // Aqui você pode adicionar a lógica para verificar o PIN
    // Por exemplo, você pode comparar o PIN com um valor predefinido.
    if (pin === '1234') {
        alert('PIN correto! Acesso permitido.');
    } else {
        alert('PIN incorreto! Tente novamente.');
    }

    // Limpa o PIN após a verificação
    pin = '';
    pinInput.value = '';
});

// Verificar o icone olho aberto e fechado
const pass = document.getElementById('pin-input');
const icon = document.getElementById('icon');

    function showHide(){
        if(pass.type === 'pin-input'){
            pass.setAttribute('type','text');
            icon.classList.add('hide')
        }
            else{
                pass.setAttribute('type', 'pin-input');
                icon.classList.remove('hide')
            }
    }   
    console.log(showHide);