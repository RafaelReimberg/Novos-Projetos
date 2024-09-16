//Gerador de senha Criptografada
function gerarSenhaCriptografada() {
  const senhaInput = document.getElementById("password");
  const senha = senhaInput.value;
  // Verificar se a senha não está vazia
  if (senha.trim() === "") {
    alert("Por favor, insira uma senha válida.");
    return;
  }

  // Chamada da function sha256
  sha256(senha)
    .then((senhaCriptografada) => {
      const senhaCriptografadaElement =
        document.getElementById("senhaCriptografada");
      senhaCriptografadaElement.textContent = senhaCriptografada;
    })
    .catch((error) => {
      console.error(error);
    });
}

// Criptografar a senha usando SHA256
function sha256(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  return crypto.subtle.digest("SHA-256", data).then((buffer) => {
    const array = Array.from(new Uint8Array(buffer));
    return array.map((byte) => byte.toString(16).padStart(2, "0")).join("");
  });
}

function showHide() {
  if (pass.type === "password") {
    pass.setAttribute("type", "text");
    icon.classList.add("hide");
  } else {
    pass.setAttribute("type", "password");
    icon.classList.remove("hide");
  }
}

function copy() {
  const senhaCrip = document.querySelector("#senhaCriptografada");

  // Verifica se o elemento realmente existe e possui texto
  if (senhaCrip && senhaCrip.textContent.trim() !== "") {
    navigator.clipboard
      .writeText(senhaCrip.textContent)
      .then(() => {
        alert("Senha copiada");
      })
      .catch((error) => {
        console.error("Erro ao copiar a senha:", error);
      });
  } else {
    alert("A senha não está disponível.");
  }
}

document.querySelector(".btn-copy").addEventListener("click", copy);
document.querySelector("#btn-copy-2").addEventListener("click", copy);

// Verificar o icone olho aberto e fechado
const pass = document.getElementById("password");
const icon = document.getElementById("icon");
