// Array para armazenar clientes (simulando banco de dados)
        let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

        // Referências dos elementos
        const form = document.getElementById('clienteForm');
        const btnSubmit = document.getElementById('btnSubmit');
        const btnText = document.getElementById('btnText');
        const btnLimpar = document.getElementById('btnLimpar');
        const alertContainer = document.getElementById('alertContainer');
        const listaClientes = document.getElementById('listaClientes');

        // Máscaras para inputs
        function aplicarMascaras() {
            const cpfCnpjInput = document.getElementById('cpf_cnpj');
            const telefoneInput = document.getElementById('telefone');

            cpfCnpjInput.addEventListener('input', function(e) {
                let valor = e.target.value.replace(/\D/g, '');

                if (valor.length <= 11) {
                    // Máscara CPF
                    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
                    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
                    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                } else {
                    // Máscara CNPJ
                    valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
                    valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
                    valor = valor.replace(/\.(\d{3})(\d)/, '.$1/$2');
                    valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
                }

                e.target.value = valor;
            });

            telefoneInput.addEventListener('input', function(e) {
                let valor = e.target.value.replace(/\D/g, '');
                valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
                valor = valor.replace(/(\d)(\d{4})$/, '$1-$2');
                e.target.value = valor;
            });
        }

        // Função para mostrar alertas
        function mostrarAlerta(tipo, mensagem) {
            alertContainer.innerHTML = `
                <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
                    <i class="fas fa-${tipo === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2"></i>
                    ${mensagem}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `;

            // Auto-remover após 5 segundos
            setTimeout(() => {
                const alert = alertContainer.querySelector('.alert');
                if (alert) {
                    alert.remove();
                }
            }, 5000);
        }

        // Função para validar CPF/CNPJ
        function validarCpfCnpj(valor) {
            const numeros = valor.replace(/\D/g, '');
            return numeros.length === 11 || numeros.length === 14;
        }

        // Função para validar email
        function validarEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }

        // Função para validar formulário
        function validarFormulario(formData) {
            const erros = [];

            if (!formData.nome.trim()) {
                erros.push('Nome é obrigatório');
            }

            if (!validarCpfCnpj(formData.cpf_cnpj)) {
                erros.push('CPF/CNPJ inválido');
            }

            if (!formData.telefone.trim()) {
                erros.push('Telefone é obrigatório');
            }

            if (!validarEmail(formData.email)) {
                erros.push('Email inválido');
            }

            if (!formData.endereco.trim()) {
                erros.push('Endereço é obrigatório');
            }

            return erros;
        }

        // Função para salvar cliente
        function salvarCliente(cliente) {
            cliente.id = Date.now();
            cliente.data_cadastro = new Date().toLocaleDateString('pt-BR');
            clientes.push(cliente);
            localStorage.setItem('clientes', JSON.stringify(clientes));
        }

        // Função para atualizar lista de clientes
        function atualizarListaClientes() {
            if (clientes.length === 0) {
                listaClientes.innerHTML = '<p class="text-muted">Nenhum cliente cadastrado ainda.</p>';
                return;
            }

            const html = clientes.map(cliente => `
                <div class="card mb-2">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-3">
                                <strong>${cliente.nome}</strong>
                            </div>
                            <div class="col-md-2">
                                ${cliente.cpf_cnpj}
                            </div>
                            <div class="col-md-2">
                                ${cliente.telefone}
                            </div>
                            <div class="col-md-3">
                                ${cliente.email}
                            </div>
                            <div class="col-md-2 text-end">
                                <button class="btn btn-sm btn-danger" onclick="excluirCliente(${cliente.id})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');

            listaClientes.innerHTML = html;
        }

        // Função para excluir cliente
        function excluirCliente(id) {
            if (confirm('Tem certeza que deseja excluir este cliente?')) {
                clientes = clientes.filter(cliente => cliente.id !== id);
                localStorage.setItem('clientes', JSON.stringify(clientes));
                atualizarListaClientes();
                mostrarAlerta('success', 'Cliente excluído com sucesso!');
            }
        }

        // Event listener para o formulário
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Remover classes de validação anteriores
            form.classList.remove('was-validated');

            // Coletar dados do formulário
            const formData = {
                nome: document.getElementById('nome').value,
                cpf_cnpj: document.getElementById('cpf_cnpj').value,
                telefone: document.getElementById('telefone').value,
                email: document.getElementById('email').value,
                endereco: document.getElementById('endereco').value
            };

            // Validar formulário
            const erros = validarFormulario(formData);

            if (erros.length > 0) {
                mostrarAlerta('danger', 'Erros encontrados:<br>• ' + erros.join('<br>• '));
                form.classList.add('was-validated');
                return;
            }

            // Verificar se CPF/CNPJ já existe
            const cpfCnpjExiste = clientes.some(cliente =>
                cliente.cpf_cnpj === formData.cpf_cnpj
            );

            if (cpfCnpjExiste) {
                mostrarAlerta('danger', 'CPF/CNPJ já cadastrado!');
                return;
            }

            // Simular loading
            btnSubmit.disabled = true;
            btnText.textContent = 'Cadastrando...';

            setTimeout(() => {
                try {
                    salvarCliente(formData);
                    mostrarAlerta('success', 'Cliente cadastrado com sucesso!');
                    form.reset();
                    atualizarListaClientes();
                } catch (error) {
                    mostrarAlerta('danger', 'Erro ao cadastrar cliente: ' + error.message);
                } finally {
                    btnSubmit.disabled = false;
                    btnText.textContent = 'Cadastrar Cliente';
                }
            }, 1000);
        });

        // Event listener para limpar formulário
        btnLimpar.addEventListener('click', function() {
            if (confirm('Tem certeza que deseja limpar o formulário?')) {
                form.reset();
                form.classList.remove('was-validated');
                alertContainer.innerHTML = '';
            }
        });

        // Inicializar
        document.addEventListener('DOMContentLoaded', function() {
            aplicarMascaras();
            atualizarListaClientes();
        });

        // Expor função excluirCliente para uso global
        window.excluirCliente = excluirCliente;
