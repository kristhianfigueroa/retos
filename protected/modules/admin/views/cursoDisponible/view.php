<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Kristhian Figueroa Villegas
 * mail: kristhian@appfactory.com.mx
 * Date: 9/18/13
 **/

$pageTitle = $this->pageTitle = Yii::app()->name;
$baseUrl = Yii::app()->request->baseUrl;


$contador = 0;


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