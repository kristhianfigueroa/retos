<?php

/**
 * This is the model class for table "curso_disponible".
 *
 * The followings are the available columns in table 'curso_disponible':
 * @property string $id_curso_disponible
 * @property string $id_socio_tecnologico
 * @property string $folio_socio_tecnologico
 * @property string $nombre_curso
 * @property string $descripcion
 * @property string $pdf_temario
 * @property string $id_cat_curso
 * @property integer $horas_curso
 * @property string $formato
 * @property string $fecha_inicio
 * @property integer $estatus_curso
 * @property string $id_cat_comprobante
 * @property string $persona_creacion
 * @property string $fecha_creacion
 * @property string $persona_modificacion
 * @property string $fecha_modificacion
 * @property integer $activo
 *
 * The followings are the available model relations:
 * @property CatComprobante $idCatComprobante
 * @property CatCurso $idCatCurso
 * @property SocioTecnologico $idSocioTecnologico
 * @property CursoDisponibleServidorPublico[] $cursoDisponibleServidorPublicos
 */
class CursoDisponible extends CActiveRecord
{

    /**
     * Returns the static model of the specified AR class.
     * @param string $className active record class name.
     * @return CursoDisponible the static model class
     */
    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }

    /**
     * @return string the associated database table name
     */
    public function tableName()
    {
        return 'curso_disponible';
    }

    /**
     * @return Validaciones de modelo
     */
    public function rules()
    {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('id_socio_tecnologico, folio_socio_tecnologico, nombre_curso, id_cat_curso, horas_curso, formato, id_cat_comprobante', 'required', 'message' => '{attribute} es requerido'),
            array('horas_curso, estatus_curso, activo', 'numerical', 'integerOnly' => true),
            array('id_socio_tecnologico, id_cat_curso, id_cat_comprobante', 'length', 'max' => 19),
            array('folio_socio_tecnologico, persona_creacion, persona_modificacion', 'length', 'max' => 20),
            array('nombre_curso, pdf_temario', 'length', 'max' => 200),
            array('descripcion, fecha_inicio, fecha_creacion, fecha_modificacion', 'safe'),
            array('pdf_temario', 'file', 'types' => 'pdf', 'allowEmpty' => true, 'on' => 'update'),
            // The following rule is used by search().
            // Please remove those attributes that should not be searched.
            array('id_curso_disponible, id_socio_tecnologico, folio_socio_tecnologico, nombre_curso, descripcion, pdf_temario, id_cat_curso, horas_curso, formato, fecha_inicio, estatus_curso, id_cat_comprobante, persona_creacion, fecha_creacion, persona_modificacion, fecha_modificacion, activo\n', 'safe', 'on' => 'search'),
        );
    }

    /**
     * @return array relational rules.
     */
    public function relations()
    {
        // NOTE: you may need to adjust the relation name and the related
        // class name for the relations automatically generated below.
        return array(
            'idCatComprobante' => array(self::BELONGS_TO, 'CatComprobante', 'id_cat_comprobante'),
            'idCatCurso' => array(self::BELONGS_TO, 'CatCurso', 'id_cat_curso'),
            'idSocioTecnologico' => array(self::BELONGS_TO, 'SocioTecnologico', 'id_socio_tecnologico'),
            'cursoDisponibleServidorPublicos' => array(self::HAS_MANY, 'CursoDisponibleServidorPublico', 'id_curso_disponible'),
        );
    }

    /**
     * @return array customized attribute labels (name=>label)
     */
    public function attributeLabels()
    {
        return array(
            'id_curso_disponible' => 'Curso Disponible',
            'id_socio_tecnologico' => 'Socio Tecnologico',
            'folio_socio_tecnologico' => 'Folio Socio Tecnologico',
            'nombre_curso' => 'Nombre Curso',
            'descripcion' => 'Descripcion',
            'pdf_temario' => 'Temario',
            'id_cat_curso' => 'Cat Curso',
            'horas_curso' => 'Horas Curso',
            'formato' => 'Formato',
            'fecha_inicio' => 'Fecha Inicio',
            'estatus_curso' => 'Estatus Curso',
            'id_cat_comprobante' => 'Cat Comprobante',
            'persona_creacion' => 'Persona Creacion',
            'fecha_creacion' => 'Fecha Creacion',
            'persona_modificacion' => 'Persona Modificacion',
            'fecha_modificacion' => 'Fecha Modificacion',
            'activo' => 'Activo',
        );
    }

    /**
     * @return array para Combobox
     */
    public function comboBox()
    {


        return CHtml::listData(CursoDisponible::model()->findAll(), 'id_curso_disponible', 'curso_disponible');
    }

    /**
     * Retrieves a list of models based on the current search/filter conditions.
     * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
     */
    public function search()
    {

        $criteria = new CDbCriteria();
        $criteria->compare('id_socio_tecnologico', $this->id_socio_tecnologico);
        $criteria->compare('folio_socio_tecnologico', $this->folio_socio_tecnologico, true);
        $criteria->compare('nombre_curso', $this->nombre_curso, true);
        $criteria->compare('descripcion', $this->descripcion, true);
        $criteria->compare('pdf_temario', $this->pdf_temario, true);
        $criteria->compare('id_cat_curso', $this->id_cat_curso);
        $criteria->compare('horas_curso', $this->horas_curso, true);
        $criteria->compare('formato', $this->formato, true);
        $criteria->compare('fecha_inicio', $this->fecha_inicio, true);
        $criteria->compare('estatus_curso', $this->estatus_curso, true);
        $criteria->compare('id_cat_comprobante', $this->id_cat_comprobante);

        $criteria->compare('activo', 1);
        Yii::app()->session['CursoDisponibleCriteria'] = $criteria;


        return new CActiveDataProvider($this, array(
                'criteria' => $criteria,
                'pagination' => array(
                    'pageSize' => 20),
            )
        );
    }

}
