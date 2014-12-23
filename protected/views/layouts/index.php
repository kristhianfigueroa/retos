<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Kristhian Figueroa Villegas, Roberto Cruz
 * mail: kristhian@appfactory.com.mx
 * Date:08-05-2014
 * Time: 19:May:11
 **/

$pageTitle = $this->pageTitle = Yii::app()->name;
$baseUrl = Yii::app()->request->baseUrl;
?>

<?php
/* @var $this ClienteController */
/* @var $model Cliente */


?>


<script type="text/javascript">


    function getDetalle(idCampo) {
        $.get("index.php?r=Cliente/getDetalle", {IdRegistro: idCampo}, function (dato) {
            $(".modal-body").html(dato);
        });
        $("#myModal").modal('toggle');

    }
</script>


<!-- Modal -->
<div class="modal fade " id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
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

<section class="panel">
    <header class="panel-heading">
        <div class="position-center">
            <h4>Administrar Cliente</h4>
        </div>
    </header>
    <div class="panel-body">


        <div class="btn-group">
            <?php

            echo CHtml::link('<i class="fa fa-plus"></i> Agregar', array('create'), array(
                'class' => 'btn btn-verde'
            ));

            ?></div>

        <div class="btn-group pull-right">

            <?php
            echo CHtml::link('<i class="fa fa-file-text"></i> Pdf', array('exportToPdf'), array(
                'class' => 'btn btn-primary link'
            ));

            echo CHtml::link('<i class="fa fa-table"></i> Excel', array('exportarExcel'), array(
                'class' => 'btn btn-primary link'
            ));

            ?>
        </div>


        <div class="table-responsive">
            <?php $this->widget('zii.widgets.grid.CGridView', array(
                'id' => 'cliente-grid',
                'dataProvider' => $model->search(),
                'itemsCssClass' => 'table table-striped table-hover table-bordered table-responsive',
                'rowCssClassExpression' => '($data->activo==1)?"":"danger"',
                'pagerCssClass' => 'dataTables_paginate paging_bootstrap pagination',
                'pager' => array('header' => ''),
                'filter' => $model,
                'columns' => array(
                    'id_cliente',
                    'cliente',
                    //Dato fiscal
                    array(
                        'class' => 'CButtonColumn',
                        'template' => '{dfiscal}',
                        'htmlOptions' => array('width' => '60px', 'align' => 'center'),
                        'header' => 'Dato Fiscal',
                        'buttons' => array(

                            'dfiscal' => array(
                                'label' => 'Dato fiscal',
                                'url' => "CHtml::normalizeUrl(array('datoFiscal/', 'id'=>\$data->id_cliente))",
                                'imageUrl' => Yii::app()->request->baseUrl . '/img/details_open.png',

                            )
                        )
                    ),
                    //Zona
                    array(
                        'class' => 'CButtonColumn',
                        'template' => '{zona}',
                        'htmlOptions' => array('width' => '60px', 'align' => 'center'),
                        'header' => 'Zona',
                        'buttons' => array(

                            'zona' => array(
                                'label' => 'Agregar zona',
                                'url' => "CHtml::normalizeUrl(array('zona/', 'id'=>\$data->id_cliente))",
                                'imageUrl' => Yii::app()->request->baseUrl . '/img/location.png',
                            )
                        )
                    ),
                    //Encuesta
                    array(
                        'class' => 'CButtonColumn',
                        'template' => '{encuesta}',
                        'htmlOptions' => array('width' => '60px', 'align' => 'center'),
                        'header' => 'Encuesta',
                        'buttons' => array(

                            'encuesta' => array(
                                'label' => 'Ver encuestas',
                                'url' => "CHtml::normalizeUrl(array('encuesta/', 'id'=>\$data->id_cliente))",
                                'imageUrl' => Yii::app()->request->baseUrl . '/img/search-icon.png',
                            )
                        )
                    ),
                    array(
                        'class' => 'CButtonColumn',
                        'template' => '{view}',
                        'htmlOptions' => array('width' => '60px', 'align' => 'center'),
                        'header' => 'Detalle',
                        'buttons' => array(

                            'view' => array(
                                'label' => 'Ver detalle',
                                'click' => 'function(event){
                event.preventDefault();
                var link = $(this);
                var idRegistro = link.attr("href").split("=")[2];
                getDetalle(idRegistro);
                }',
                                'url' => "CHtml::normalizeUrl(array('view', 'id'=>\$data->id_cliente))",
                                'imageUrl' => Yii::app()->request->baseUrl . '/img/search-icon.png'
                            )
                        )
                    ),


                    array(
                        'class' => 'CButtonColumn',
                        'template' => '{delete}',
                        'htmlOptions' => array('width' => '60px', 'align' => 'center'),
                        'header' => 'Borrar',
                        'buttons' => array(

                            'delete' => array(
                                'label' => 'Eliminar',
                                'url' => "CHtml::normalizeUrl(array('delete', 'id'=>\$data->id_cliente))",
                                'imageUrl' => Yii::app()->request->baseUrl . '/img/details_close.png'
                            )
                        )
                    ),

                    array(
                        'class' => 'CButtonColumn',
                        'template' => '{update}',
                        'htmlOptions' => array('width' => '60px', 'align' => 'center'),
                        'header' => 'Actualizar',
                        'buttons' => array(
                            'update' => array(
                                'label' => 'Editar',
                                'url' => "CHtml::normalizeUrl(array('update', 'id'=>\$data->id_cliente))",
                                'imageUrl' => Yii::app()->request->baseUrl . '/img/pen.png'
                            )
                        )
                    )
                )
            )); ?>
        </div>
    </div>
</section>

<!--
<style type="text/css">
    table>tbody>tr:hover{
        cursor: pointer;
        background-color: #cfe4c6;
    }
</style>

-->