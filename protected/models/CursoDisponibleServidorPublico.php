<?php
/**
 * This is the model class for table "curso_disponible_servidor_publico".
 *
 * The followings are the available columns in table 'curso_disponible_servidor_publico':
 * @property string $id_curso_disponible_servidor_publico
 * @property string $id_curso_disponible
 * @property string $folio_socio_tecnologico
 * @property string $id_servidor_publico
 * @property string $fecha_inicio
 * @property string $fecha_fin
 * @property integer $finalizacion_curso
 * @property integer $calificacion
 * @property string $persona_creacion
 * @property string $fecha_creacion
 * @property string $persona_modificacion
 * @property string $fecha_modificacion
 * @property integer $activo
 *
 * The followings are the available model relations:
 * @property CursoDisponible $idCursoDisponible
 * @property ServidorPublico $idServidorPublico
 */
class CursoDisponibleServidorPublico extends CActiveRecord
{
    /**
     * Returns the static model of the specified AR class.
     * @param string $className active record class name.
     * @return CursoDisponibleServidorPublico the static model class
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
        return 'curso_disponible_servidor_publico';
    }

    /**
     * @return Validaciones de modelo
     */
    public function rules()
    {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('id_curso_disponible, id_servidor_publico, fecha_inicio', 'required'),
            array('finalizacion_curso, calificacion, activo', 'numerical', 'integerOnly' => true),
            array('id_curso_disponible, id_servidor_publico', 'length', 'max' => 19),
            array('folio_socio_tecnologico', 'length', 'max' => 200),
            array('persona_creacion, persona_modificacion', 'length', 'max' => 20),
            array('fecha_fin, fecha_creacion, fecha_modificacion', 'safe'),

            // The following rule is used by search().
            // Please remove those attributes that should not be searched.
            array('id_curso_disponible_servidor_publico, id_curso_disponible, folio_socio_tecnologico, id_servidor_publico, fecha_inicio, fecha_fin, finalizacion_curso, calificacion, persona_creacion, fecha_creacion, persona_modificacion, fecha_modificacion, activo\n', 'safe', 'on' => 'search'),
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
            'idCursoDisponible' => array(self::BELONGS_TO, 'CursoDisponible', 'id_curso_disponible'),
            'idServidorPublico' => array(self::BELONGS_TO, 'ServidorPublico', 'id_servidor_publico'),
        );
    }

    /**
     * @return array customized attribute labels (name=>label)
     */
    public function attributeLabels()
    {
        return array(
            'id_curso_disponible_servidor_publico' => 'Curso Disponible Servidor Publico',
            'id_curso_disponible' => 'Curso Disponible',
            'folio_socio_tecnologico' => 'Folio Socio Tecnologico',
            'id_servidor_publico' => 'Servidor Publico',
            'fecha_inicio' => 'Fecha Inicio',
            'fecha_fin' => 'Fecha Fin',
            'finalizacion_curso' => 'Finalizacion Curso',
            'calificacion' => 'Calificacion',
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


        return CHtml::listData(CursoDisponibleServidorPublico::model()->findAll(),
            'id_curso_disponible_servidor_publico', 'curso_disponible_servidor_publico');

    }

    /**
     * Retrieves a list of models based on the current search/filter conditions.
     * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
     */

    public function search()
    {

        $criteria = new CDbCriteria();
        $criteria->compare('id_curso_disponible', $this->id_curso_disponible);
        $criteria->compare('folio_socio_tecnologico', $this->folio_socio_tecnologico, true);
        $criteria->compare('id_servidor_publico', $this->id_servidor_publico);
        $criteria->compare('fecha_inicio', $this->fecha_inicio, true);
        $criteria->compare('fecha_fin', $this->fecha_fin, true);
        $criteria->compare('finalizacion_curso', $this->finalizacion_curso, true);
        $criteria->compare('calificacion', $this->calificacion, true);

        Yii::app()->session['CursoDisponibleServidorPublicoCriteria'] = $criteria;


        return new CActiveDataProvider($this, array(
                'criteria' => $criteria,
                'pagination' => array(
                    'pageSize' => 20),
            )
        );

    }
}