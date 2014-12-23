/**
 * Created by appfactory on 11/07/14.
 */

var modelReportes = new ViewModelReporte();
ko.applyBindings(modelReportes);

var idCliente = 0;
var idEncuesta = 0;


/***SELECCIONAR TODAS LAS PREGUNTAS***/
$(document).on('click', '.preguntas', function () {//Remover una pregunta del array
    var valor = $(this).is(':checked');

    modelReportes.questions.remove(this.value);

    if (!valor) {//Si se desactiva se quita del array
        $('#chkPreguntas').prop('checked', false);
        modelReportes.questions.remove(this.value);
    }

    else
        modelReportes.questions.push(this.value);// Si se activa nuevamente se le agrega al array otra ves


});

/*****SELECCIONAR TODAS LAS PREGUNTAS*****/
$(document).on('click', '#chkPreguntas', function () {

    var valor = $(this).is(':checked');

    var preguntas = $(".preguntas");
    preguntas.prop('checked', valor);
    modelReportes.questions.removeAll();//vacia el arreglo de preguntas

    if (valor) {
        $.each(preguntas, function () {

            modelReportes.questions.push(this.value);
        });
    }
    console.log(modelReportes.questions());

});
/**FIN DE PREGUNTAS**/



//INICIO DE ZONAS
$(document).on('click', '.zonas', function () {//Remover una pregunta del array

    var valor = $(this).is(':checked');//
    modelReportes.zonas.remove(this.value);

    if (!valor) {//Si se desactiva se quita del array
        $('#chkZonas').prop("checked", false);
        modelReportes.zonas.remove(this.value);
    }


    else
        modelReportes.zonas.push(this.value);// Si se activa nuevamente se le agrega al array otra ves

    console.log("EL NUEVO VALOR ES :" + modelReportes.zonas());

});


$(document).on('click', '#chkZonas', function () {

    var valor = $(this).is(':checked');//

    var zonas = $(".zonas");
    zonas.prop('checked', valor);
    modelReportes.zonas.removeAll();// Vacia el arreglo de zonas

    if (valor) {
        $.each(zonas, function () {
            modelReportes.zonas.push(this.value);
        });
    }
    console.log(modelReportes.zonas());

});
//FIN  DE ZONAS


$(function () {
    $("#cmbEncuesta").change(function () {
        var valor = $(this).val();

        if(valor==''){
            modelReportes.activo(false);
            return;
        }


        $.getJSON('index.php?r=reporte/getallpreguntas', {idEncuesta: valor}, function (data) {//

            var elemento = ' <a href="#" class="list-group-item active"><input id="chkPreguntas" type="checkbox" >&nbsp;&nbsp;Todas las preguntas </a>';


            $.each(data, function () {
                elemento += '<a href="#" class="list-group-item">' +
                    '<input type="checkbox" class="preguntas" id=' + this.value + ' name= ' + this.label + ' value=' + this.value + ' >&nbsp;'
                    + this.label + '</a>';
            });
            $("#cmbPregunta").html(elemento);
            modelReportes.activo(true);

        });
    });


    /* $("#cmbZona").change(function () {
     var id = $(this).val();

     $.getJSON("index.php?r=reporte/getallsucursales", {idZona: id}, function (data) {

     });

     });*/


    // $("#btnClean").click(cleanUnput);
    $("#btnGet").click(function (event) {
        event.preventDefault();

        var preguntas = ko.toJSON(modelReportes.questions());
        var zonas = ko.toJSON(modelReportes.zonas());


        var fechaInicio = $("#Reporte_fecha_respuesta").val();
        var fechaFin = $("#fechaFin").val();

        var idEncuesta = $("#cmbEncuesta").val();


        if (idCliente == 0) {
            $("#cliente").effect("shake");
            return;
        }

        if (fechaInicio == '') {
            $("#Reporte_fecha_respuesta").effect("shake");
            return;
        }
        if (fechaFin == '') {
            $("#fechaFin").effect("shake");
            return;
        }


        else if (idEncuesta == '') {
            $("#cmbEncuesta").effect("shake");
            return;

        }

        $.ajax({
            type: 'POST',
            url: 'index.php?r=reporte/Buscar',
            data: {inicio: fechaInicio, fin: fechaFin, id_encuesta: idEncuesta, id_cliente: idCliente, pre: preguntas, zon: zonas},
            success: function (data) {
                $("#indicator").hide("clip", function () {
                    $(".table-responsive").html(data);
                });

            },
            beforeSend: function () {
                $("#indicator").show("clip");

            }
        });
    });
});
/*function cleanUnput() {
 $("#VReporte_fecha_respuesta").val('');
 $("#cliente").val('');
 idCliente = 0;
 $("#fechaFin").val('');
 }*/

function probar(s) {
    idCliente = s;

    if (idCliente == "") {
        idCliente = 0;
    }
    var combo = $("#cmbEncuesta");
    var elementos = "<option  value='' selected>Elige la encuesta..</option>";
    var minimo = "";//id="chkZonas"

    var item = '<a href="#"  class="list-group-item active"> <input id="chkZonas" type="checkbox">&nbsp;Todas las  Zonas </a>';

    $.getJSON("index.php?r=respuestaUsuarioFinal/getEncuestasCliente", {idCliente: idCliente}, function (response) {
        $.each(response.zonas, function () {
            item += "<a href='#' class='list-group-item'><input class='zonas' type='checkbox' value=" + this.value + ">&nbsp;" + this.label + "</a>";
        });


        $.each(response.encuestas, function () {
            elementos += "<option value=" + this.value + ">" + this.label + "</option>";
            minimo = this.fecha_inicio;
        });



        $("#VReporteMaster_fecha_respuesta").datepicker("option", "minDate", minimo);
        $("#fechaFin").datepicker("option", "minDate", minimo);

        combo.html(elementos);
        $("#cmbZona").html(item);

    });

}


function ViewModelReporte() {
    var self = this;
    self.questions = ko.observableArray();
    self.zonas = ko.observableArray();
    self.activo=ko.observable(false);
}