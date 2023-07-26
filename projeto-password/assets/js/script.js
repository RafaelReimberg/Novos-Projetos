
// validador de senha se corresponde a normas citadas.

(function () {
    document.addEventListener("DOMContentLoaded", function () {
    let password = document.querySelector('.password');

    let helperText = {
        charLength: document.querySelector('.helper-text .lenght'),
        lowercase: document.querySelector('.helper-text .lowercase'),
        uppercase: document.querySelector('.helper-text .uppercase'),
        special: document.querySelector('.helper-text .special')
    };

    // processo para validação de ação da senha
        password.addEventListener("keyup", function () {

        patternTest(pattern.charLength(), helperText.charLength);

        patternTest(pattern.lowercase(), helperText.lowercase);

        patternTest(pattern.uppercase(), helperText.uppercase);

        patternTest(pattern.special(), helperText.special);

        if (
            hasClass(helperText.charLength, "valid") &&
            hasClass(helperText.lowercase, "valid") &&
            hasClass(helperText.uppercase, "valid") &&
            hasClass(helperText.special, "valid")
        ) {

            addClass(password, "valid");
        } else {
            
            removeClass(password, "valid");
        }

    });

    let pattern = {
        charLength: function () {
            if (password.value.length >= 8) {
                return true;
            }
        },
        lowercase: function () {
            let regex = /^(?=.*[a-z]).+$/;

            if (regex.test(password.value)) {
                return true;
            }
        },
        uppercase: function () {
            let regex = /^(?=.*[A-Z]).+$/;

            if (regex.test(password.value)) {
                return true;
            }
        },
        special: function () {
            let regex = /^(?=.*[0-9_\W]).+$/;

            if (regex.test(password.value)) {
                return true;
            }
        }
    };

    function removeClass(el, className) {
        if (el && el.classList) {
            el.classList.remove(className);
        } else if (el && el.className) {
            el.className = el.className.replace(
                new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"),
                " "
            );
        }
    }

    function hasClass(el, className) {
        if (el && el.classList) {
            console.log(el.classList);
            return el.classList.contains(className);
        } else {
            new RegExp("(^| )" + className + "( |$)", "gi").test(el && el.className);
        }

    }

    function patternTest(pattern, response) {
        if (pattern) {
            addClass(response, "valid");
        } else {
            removeClass(response, "valid");
        }
    }

    function addClass(el, className) {
        if (el && el.classList) {
            el.classList.add(className);
        } else if (el && el.className) {
            el.className += " " + className;
        }
    }


    let senha = $("#senha");
    let olho= $("#olho");

    olho.mousedown(function() {
    senha.attr("type", "text");
    });

    olho.mouseup(function() {
    senha.attr("type", "password");
    });
    // para evitar o problema de arrastar a imagem e a senha continuar exposta, 
    //citada pelo nosso amigo nos comentários
    $("#olho").mouseout(function() { 
    $("#senha").attr("type", "password");
    });

});
})();




