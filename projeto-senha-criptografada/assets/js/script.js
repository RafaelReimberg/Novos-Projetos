    function gerarSenhaCriptografada() {
        const senhaInput = document.getElementById('password');
        const senha = senhaInput.value;

        // Verificar se a senha não está vazia
        if (senha.trim() === '') {
            alert('Por favor, insira uma senha válida.');
            return;
        }

        // Criptografar a senha usando SHA-256 (como no exemplo anterior)
        sha256(senha)
            .then(senhaCriptografada => {
                const senhaCriptografadaElement = document.getElementById('senhaCriptografada');
                senhaCriptografadaElement.textContent = senhaCriptografada;
            })
            .catch(error => {
                console.error(error);
            });
    }

    function sha256(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        return crypto.subtle.digest('SHA-256', data)
            .then(buffer => {
                const array = Array.from(new Uint8Array(buffer));
                return array.map(byte => byte.toString(16).padStart(2, '0')).join('');
            });
    }

    const pass = document.getElementById('password');
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