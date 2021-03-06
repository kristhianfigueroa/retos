<?php
/**
 * This is the model class for table "cat_dependencia".
 *
 * The followings are the available columns in table 'cat_dependencia':
 * @property string $id_cat_dependencia
 * @property string $cat_dependencia
 * @property string $persona_creacion
 * @property string $fecha_creacion
 * @property string $persona_modificacion
 * @property string $fecha_modificacion
 * @property integer $activo
 *
 * The followings are the available model relations:
 * @property CatAreaDependencia[] $catAreaDependencias
 * @property ServidorPublico[] $servidorPublicos
 */
class CatDependencia extends CActiveRecord
{
    /**
     * Returns the static model of the specified AR class.
     * @param string $className active record class name.
     * @return CatDependencia the static model class
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
        return 'cat_dependencia';
    }

    /**
     * @return Validaciones de modelo
     */
    public function rules()
    {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('cat_dependencia', 'required'),
            array('activo', 'numerical', 'integerOnly' => true),
            array('cat_dependencia', 'length', 'max' => 200),
            array('persona_creacion, persona_modificacion', 'length', 'max' => 20),
            array('fecha_creacion, fecha_modificacion', 'safe'),

            // The following rule is used by search().
            // Please remove those attributes that should not be searched.
            array('id_cat_dependencia, cat_dependencia, persona_creacion, fecha_creacion, persona_modificacion, fecha_modificacion, activo\n', 'safe', 'on' => 'search'),
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
            'catAreaDependencias' => array(self::HAS_MANY, 'CatAreaDependencia', 'id_cat_dependencia'),
            'servidorPublicos' => array(self::HAS_MANY, 'ServidorPublico', 'id_cat_dependencia'),
        );
    }

    /**
     * @return array customized attribute labels (name=>label)
     */
    public function attributeLabels()
    {
        return array(
            'id_cat_dependencia' => 'Cat Dependencia',
            'cat_dependencia' => 'Cat Dependencia',
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


        return CHtml::listData(CatDependencia::model()->findAll(),
            'id_cat_dependencia', 'cat_dependencia');

    }

    /**
     * Retrieves a list of models based on the current search/filter conditions.
     * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
     */

    public function search()
    {

        $criteria = new CDbCriteria();
        $criteria->compare('cat_dependencia', $this->cat_dependencia, true);

        $criteria->compare('activo', 1);
        Yii::app()->session['CatDependenciaCriteria'] = $criteria;


        return new CActiveDataProvider($this, array(
                'criteria' => $criteria,
                'pagination' => array(
                    'pageSize' => 20),
            )
        );

    }
}