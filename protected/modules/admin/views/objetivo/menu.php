<?php
function menu($pagina)
{
    $index = '';
    $create = '';

    switch ($pagina) {

        case '':
        {
            $index = 'active';
            break;
        }
        case 'index':
        {
            $index = 'active';
            break;
        }
        case 'create':
        {
            $create = 'active';
            break;
        }
        default:
        {
            $index = 'active';
            break;
        }
    }

    return array(
        array('label' => 'Agregar Objetivo',
            'url' => array('create'), 'itemOptions' => array('class' => $create)),

        array('label' => 'Lista de Objetivo',
            'url' => array('index'), 'itemOptions' => array('class' => $index))
    );
}


