<?php
/**
 * This is the model class for table "area_interes".
 *
 * The followings are the available columns in table 'area_interes':
 * @property string $id_area_interes
 * @property string $area_interes
 * @property string $persona_creacion
 * @property string $fecha_creacion
 * @property string $persona_modificacion
 * @property string $fecha_modificacion
 * @property integer $activo
 *
 * The followings are the available model relations:
 * @property CursosDeseados[] $cursosDeseadoses
 */
class AreaInteres extends CActiveRecord
{
    /**
     * Returns the static model of the specified AR class.
     * @param string $className active record class name.
     * @return AreaInteres the static model class
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
        return 'area_interes';
    }

    /**
     * @return Validaciones de modelo
     */
    public function rules()
    {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('activo', 'numerical', 'integerOnly' => true),
            array('area_interes', 'length', 'max' => 200),
            array('persona_creacion, persona_modificacion', 'length', 'max' => 20),
            array('fecha_creacion, fecha_modificacion', 'safe'),

            // The following rule is used by search().
            // Please remove those attributes that should not be searched.
            array('id_area_interes, area_interes, persona_creacion, fecha_creacion, persona_modificacion, fecha_modificacion, activo\n', 'safe', 'on' => 'search'),
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
            'cursosDeseadoses' => array(self::HAS_MANY, 'CursosDeseados', 'id_area_interes'),
        );
    }

    /**
     * @return array customized attribute labels (name=>label)
     */
    public function attributeLabels()
    {
        return array(
            'id_area_interes' => 'Area Interes',
            'area_interes' => 'Area Interes',
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


        return CHtml::listData(AreaInteres::model()->findAll(),
            'id_area_interes', 'area_interes');

    }

    /**
     * Retrieves a list of models based on the current search/filter conditions.
     * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
     */

    public function search()
    {

        $criteria = new CDbCriteria();
        $criteria->compare('area_interes', $this->area_interes, true);
        $criteria->compare('activo', 1);


        Yii::app()->session['AreaInteresCriteria'] = $criteria;


        return new CActiveDataProvider($this, array(
                'criteria' => $criteria,
                'pagination' => array(
                    'pageSize' => 20),
            )
        );

    }
}