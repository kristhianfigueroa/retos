<?php
/**
 * Created by PhpStorm.
 * User: kristhian
 * Date: 12/22/14
 * Time: 5:45 PM
 */


$pageTitle = $this->pageTitle = Yii::app()->name;
$baseUrl = Yii::app()->request->baseUrl;


$this->widget('zii.widgets.CListView', array(
        'id' => 'VideoList',
        'dataProvider' => $cursoDisponible->search(),
        'itemView' => '_view',
        'template' => '{items} {pager}',
        'pager' => array(
            'class' => 'ext.infiniteScroll.IasPager',
            'rowSelector' => '.row',
            'listViewId' => 'VideoList',
            'header' => '',
            'loaderText' => 'Loading...',
            'options' => array('history' => false,
                'triggerPageTreshold' => 2,
                'trigger' => 'Load more'),
        )
    )
);


?>



<script type="text/javascript">

    function informacionCurso(idCurso) {
        $.get("<?php echo $this->createUrl('funcionario/informacionCurso'); ?>", {
            id_curso_disponible: idCurso
        }, function (dato) {
            $(".modal-body").html(dato);
        });

        $("#myModal").modal('toggle');


    }

    function registrarFuncionario(idCurso) {

        $.ajax({
                data: {"id_curso_disponible": idCurso},
                url: '<?php echo $this->createUrl('/funcionario/registrarFuncionario'); ?>',
                type: 'GET',
                success: function (response) {
                    var returnedData = JSON.parse(response);
                    alert(returnedData.respuesta);
                    $("#myModal").modal('toggle');
                },
                beforeSend: function () {
                },
                error: function () {
                    alert('Hubo un error, por favor recarga la página e intenta nuevamente');
                    $("#myModal").modal('toggle');
                }
            }
        );
    }


</script>


<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">Detalle</h4>
            </div>
            <!--Se muestra con una llaamada ajax-->
            <div class="modal-body">

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

