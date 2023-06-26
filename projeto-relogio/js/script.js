var tempo = document.getElementById('time');
var dia = document.getElementById('day');
var midday = document.getElementById('midday');

var relogio = setInterval(
    function calcTime(){
        var date_now = new Date();
        var hr = date_now.getHours();
        var min = date_now.getMinutes();
        var sec = date_now.getSeconds();
        var middayValue = "AM";
        var dias = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
        var hora = hr.toLocaleString('pt-BR',{timeStyle: 'short'});

        dia.textContent = dias[date_now.getDay()];

        middayValue = (hr > 12) ? "PM" : "AM";

        if(hora == 0){
            hora = 12;
        }
        else if(hora > 12){
            hora -= 12;
        }
        
        hora = (hora < 10) ? "0" + hora : hora;
        min = (min < 10) ? "0" + min : min;
        sec = (sec < 10) ? "0" + sec : sec;

        tempo.textContent = `${hora}:${min}:${sec}`;
        midday.textContent = middayValue;
    }, 1000
);