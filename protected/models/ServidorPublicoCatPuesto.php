<?php
/**
 * This is the model class for table "servidor_publico_cat_puesto".
 *
 * The followings are the available columns in table 'servidor_publico_cat_puesto':
 * @property string $id_servidor_publico_cat_puesto
 * @property string $id_servidor_publico
 * @property string $id_cat_puesto
 * @property string $fecha_inicio
 * @property string $fecha_fin
 * @property string $persona_creacion
 * @property string $fecha_creacion
 * @property string $persona_modificacion
 * @property string $fecha_modificacion
 * @property integer $activo
 *
 * The followings are the available model relations:
 * @property CatPuesto $idCatPuesto
 * @property ServidorPublico $idServidorPublico
 */
class ServidorPublicoCatPuesto extends CActiveRecord
{
    /**
     * Returns the static model of the specified AR class.
     * @param string $className active record class name.
     * @return ServidorPublicoCatPuesto the static model class
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
        return 'servidor_publico_cat_puesto';
    }

    /**
     * @return Validaciones de modelo
     */
    public function rules()
    {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('id_servidor_publico, id_cat_puesto', 'required'),
            array('activo', 'numerical', 'integerOnly' => true),
            array('id_servidor_publico, id_cat_puesto', 'length', 'max' => 19),
            array('persona_creacion, persona_modificacion', 'length', 'max' => 20),
            array('fecha_inicio, fecha_fin, fecha_creacion, fecha_modificacion', 'safe'),

            // The following rule is used by search().
            // Please remove those attributes that should not be searched.
            array('id_servidor_publico_cat_puesto, id_servidor_publico, id_cat_puesto, fecha_inicio, fecha_fin, persona_creacion, fecha_creacion, persona_modificacion, fecha_modificacion, activo\n', 'safe', 'on' => 'search'),
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
            'idCatPuesto' => array(self::BELONGS_TO, 'CatPuesto', 'id_cat_puesto'),
            'idServidorPublico' => array(self::BELONGS_TO, 'ServidorPublico', 'id_servidor_publico'),
        );
    }

    /**
     * @return array customized attribute labels (name=>label)
     */
    public function attributeLabels()
    {
        return array(
            'id_servidor_publico_cat_puesto' => 'Servidor Publico Cat Puesto',
            'id_servidor_publico' => 'Servidor Publico',
            'id_cat_puesto' => 'Cat Puesto',
            'fecha_inicio' => 'Fecha Inicio',
            'fecha_fin' => 'Fecha Fin',
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


        return CHtml::listData(ServidorPublicoCatPuesto::model()->findAll(),
            'id_servidor_publico_cat_puesto', 'servidor_publico_cat_puesto');

    }

    /**
     * Retrieves a list of models based on the current search/filter conditions.
     * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
     */

    public function search()
    {

        $criteria = new CDbCriteria();
        $criteria->compare('id_servidor_publico', $this->id_servidor_publico);
        $criteria->compare('id_cat_puesto', $this->id_cat_puesto);
        $criteria->compare('fecha_inicio', $this->fecha_inicio, true);
        $criteria->compare('fecha_fin', $this->fecha_fin, true);
        $criteria->compare('activo', 1);
        Yii::app()->session['ServidorPublicoCatPuestoCriteria'] = $criteria;


        return new CActiveDataProvider($this, array(
                'criteria' => $criteria,
                'pagination' => array(
                    'pageSize' => 20),
            )
        );

    }
}