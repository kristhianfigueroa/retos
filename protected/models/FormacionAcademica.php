<?php

/**
 * This is the model class for table "formacion_academica".
 *
 * The followings are the available columns in table 'formacion_academica':
 * @property string $id_formacion_academica
 * @property string $id_servidor_publico
 * @property string $id_tipo_estudio
 * @property string $descripcion
 * @property string $fecha_inicio
 * @property string $fecha_fin
 *
 * The followings are the available model relations:
 * @property ServidorPublico $idServidorPublico
 * @property TipoEstudio $idTipoEstudio
 */
class FormacionAcademica extends CActiveRecord
{
    public $updateType;

    /**
     * Returns the static model of the specified AR class.
     * @param string $className active record class name.
     * @return FormacionAcademica the static model class
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
        return 'formacion_academica';
    }

    /**
     * @return Validaciones de modelo
     */
    public function rules()
    {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('id_servidor_publico, id_tipo_estudio', 'required'),
            array('id_servidor_publico, id_tipo_estudio', 'length', 'max' => 19),
            array('descripcion, fecha_inicio, fecha_fin', 'safe'),
            // The following rule is used by search().
            // Please remove those attributes that should not be searched.
            array('id_formacion_academica, id_servidor_publico, id_tipo_estudio, descripcion, fecha_inicio, fecha_fin\n', 'safe', 'on' => 'search'),
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
            'idServidorPublico' => array(self::BELONGS_TO, 'ServidorPublico', 'id_servidor_publico'),
            'idTipoEstudio' => array(self::BELONGS_TO, 'TipoEstudio', 'id_tipo_estudio'),
        );
    }

    /**
     * @return array customized attribute labels (name=>label)
     */
    public function attributeLabels()
    {
        return array(
            'id_formacion_academica' => 'Formacion Academica',
            'id_servidor_publico' => 'Servidor Público',
            'id_tipo_estudio' => 'Tipo Estudio',
            'descripcion' => 'Descripción',
            'fecha_inicio' => 'Fecha Inicio',
            'fecha_fin' => 'Fecha Fin',
        );
    }

    /**
     * @return array para Combobox
     */
    public function comboBox()
    {


        return CHtml::listData(FormacionAcademica::model()->findAll(), 'id_formacion_academica', 'formacion_academica');
    }

    /**
     * Retrieves a list of models based on the current search/filter conditions.
     * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
     */
    public function search()
    {

        $criteria = new CDbCriteria();
        $criteria->compare('id_servidor_publico', $this->id_servidor_publico);
        $criteria->compare('id_tipo_estudio', $this->id_tipo_estudio);
        $criteria->compare('descripcion', $this->descripcion, true);
        $criteria->compare('fecha_inicio', $this->fecha_inicio, true);
        $criteria->compare('fecha_fin', $this->fecha_fin, true);
      //  $criteria->compare('activo', 1);

        Yii::app()->session['FormacionAcademicaCriteria'] = $criteria;


        return new CActiveDataProvider($this, array(
                'criteria' => $criteria,
                'pagination' => array(
                    'pageSize' => 20),
            )
        );
    }

}
