<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Kristhian Figueroa Villegas, Roberto Cruz
 * mail: kristhian@appfactory.com.mx
 * Date: 19-12-2014

 * */
$pageTitle = $this->pageTitle = Yii::app()->name;
$baseUrl = Yii::app()->request->baseUrl;
?> 

<?php
/* @var $this SocioTecnologicoController */
/* @var $socioTecnologico SocioTecnologico */
?>


<script type="text/javascript">

    function getDetalle(idCampo) {
        $.get("index.php?r=SocioTecnologico/getDetalle", {IdRegistro: idCampo}, function (dato) {
            $(".modal-body").html(dato);
        });
        $("#myModal").modal('toggle');

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


<section class="panel">
    <header class="panel-heading">
        <div class="position-center">
            <h4>Administrar Socio Tecnologico</h4>
        </div>
    </header>
    <div class="panel-body">


        <div class="btn-group">
            <?php
            echo CHtml::link('<i class="fa fa-plus"></i> Agregar', array('create'), array(
                'class' => 'btn btn-primary'
            ));
            ?>        </div>

        <div class="btn-group pull-right">

            <?php
            echo CHtml::link('<i class="fa fa-table"></i> Excel', array('exportarExcel'), array(
                'class' => 'btn btn-primary'
            ));
            ?>
        </div>


        <div class="table-responsive">
            <?php
            $this->widget('zii.widgets.grid.CGridView', array(
                'id' => 'socio-tecnologico-grid',
                'dataProvider' => $socioTecnologico->search(),
                'itemsCssClass' => 'table table-striped table-hover table-bordered table-responsive',
                //'rowCssClassExpression'=>'($data->activo==1)?"":"danger"',
                'pagerCssClass' => 'dataTables_paginate paging_bootstrap pagination',
                'pager' => array('header' => ''),
                'filter' => $socioTecnologico,
                'columns' => array(
                    'nombre',
                    'razon_social',
                    'telefono',
                    'email',
                    'direccion',
                    'usuario',
                    array(
                        'class' => 'CButtonColumn',
                        'template' => '{cursos}',
                        'htmlOptions' => array('width' => '60px'),
                        'header'  => 'Cursos',
                        'buttons' => array(
                            'cursos' => array(
                                'label' => 'Ver cursos',
                                'url' => "CHtml::normalizeUrl(array('cursoDisponible/index', 'id_socio_tecnologico'=>\$data->id_socio_tecnologico))",
                                'imageUrl' => Yii::app()->request->baseUrl . '/img/pen.png'
                            )
                        )
                    ),
                    array(
                        'class' => 'CButtonColumn',
                        'template' => '{view}',
                        'htmlOptions' => array('width' => '60px'),
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
                                'url' => "CHtml::normalizeUrl(array('view', 'id_socio_tecnologico'=>\$data->id_socio_tecnologico))",
                                'imageUrl' => Yii::app()->request->baseUrl . '/img/search-icon.png'
                            )
                        )
                    ),
                    array(
                        'class' => 'CButtonColumn',
                        'template' => '{delete}',
                        'htmlOptions' => array('width' => '60px'),
                        'header' => 'Borrar',
                        'buttons' => array(
                            'delete' => array(
                                'label' => 'Eliminar',
                                'url' => "CHtml::normalizeUrl(array('delete', 'id_socio_tecnologico'=>\$data->id_socio_tecnologico))",
                                'imageUrl' => Yii::app()->request->baseUrl . '/img/details_close.png'
                            )
                        )
                    ),
                    array(
                        'class' => 'CButtonColumn',
                        'template' => '{update}',
                        'htmlOptions' => array('width' => '60px'),
                        'header' => 'Actualizar',
                        'buttons' => array(
                            'update' => array(
                                'label' => 'Editar',
                                'url' => "CHtml::normalizeUrl(array('update', 'id_socio_tecnologico'=>\$data->id_socio_tecnologico))",
                                'imageUrl' => Yii::app()->request->baseUrl . '/img/pen.png'
                            )
                        )
                    )
                )
            ));
            ?>
        </div>
    </div>
</section>

