let scs = document.getElementById('success');

function marcaTarefa(){
    var scs = 'success'; // Assuming 'success' is the ID of the element you want to manipulate
    var item = document.getElementById(scs);
    var classe = item.getAttribute('class');
    console.log(classe);

    if(classe == "item"){
        item.classList.add('clicado');

        var icone = document.getElementById('icone_' + scs);
        icone.classList.remove('success');
        icone.classList.add('mdi-check-circle');

        item.parentNode.appendChild(item);
    }
}

console.log (marcaTarefa);