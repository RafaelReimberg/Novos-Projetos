        //Gerador de senha Criptografada
        function gerarSenhaCriptografada() {
            const senhaInput = document.getElementById('password');
            const senha = senhaInput.value;
                // Verificar se a senha não está vazia
                if (senha.trim() === '') {
                    alert('Por favor, insira uma senha válida.');
                    return;
                }
                    // Criptografar a senha usando SHA256
                    sha256(senha)
                        .then(senhaCriptografada => {
                            const senhaCriptografadaElement = document.getElementById('senhaCriptografada');
                            senhaCriptografadaElement.textContent = senhaCriptografada;
                        })
                            .catch(error => {
                                console.error(error);
                            });
        }
            function sha256(str){
                const encoder = new TextEncoder();
                const data = encoder.encode(str);
                return crypto.subtle.digest('SHA-256', data)
                    .then(buffer => {
                        const array = Array.from(new Uint8Array(buffer));
                        return array.map(byte => byte.toString(16).padStart(2, '0')).join('');
                    });
            }
            // Verificar o icone olho aberto e fechado
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