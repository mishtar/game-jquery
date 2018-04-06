//variables globales
let numero=0;
let picas=0;
let fijas=0;

//Funciones generales
function aleatorio4Digitos(){
    return shuffle( "123456789".split('') ).join('').substring(0,4);
}

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function digitosRepetidos(number) {
    return (/([0-9]).*?\1/).test(number)
}  

//document ready
$(function() {
    numero = aleatorio4Digitos();
    console.log(numero);
});

//Métodos botones
$("#btn-new").on('click',function(){
    picas=0;
    fijas=0;

    //Generar nuevo numero
    numero = aleatorio4Digitos();
    console.log(numero);

    //Reinicializar
    $('table tbody').html('');
    $("#modalNavigation").modal('hide');
    $("#number").val('');
});

$("#number").on('keypress', function(event) {
    //Valida solo cuando enter   
    if(event.which === 13){
        event.preventDefault();
        picas=0;
        fijas=0;
        let numeroTextbox = $("#number").val();   
        //Validaciones generales
        if(numeroTextbox.length != 4 || digitosRepetidos(numeroTextbox)){
            $("#number").addClass("is-invalid");
            $("#mensaje").addClass("text-danger");
            return false;
        }
        else{
            $("#number").removeClass("is-invalid");
            $("#mensaje").removeClass("text-danger");
        }             

        //Valida picas y fijas
        for(let i=0; i< numeroTextbox.length; i++){
            if(numeroTextbox[i] === numero[i]){
                fijas++;
            }else if (numero.includes(numeroTextbox[i])){
                picas++;
            }
        }

        //En caso de terminar el juego mostrar el modal
        if(fijas===4){
            $("#modalNavigation").modal();
            return true;
        }

        $("#number").val('');
        //En caso contrario agregar fila a la tabla
        $('table tbody').append(`<tr><td>${numeroTextbox}</td><td>${picas}</td><td>${fijas}</td></tr>`); 
    }
});