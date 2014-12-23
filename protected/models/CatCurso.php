<?php
/**
 * This is the model class for table "cat_curso".
 *
 * The followings are the available columns in table 'cat_curso':
 * @property string $id_cat_curso
 * @property string $cat_curso
 * @property string $persona_creacion
 * @property string $fecha_creacion
 * @property string $persona_modificacion
 * @property string $fecha_modificacion
 * @property integer $activo
 *
 * The followings are the available model relations:
 * @property CursoDisponible[] $cursoDisponibles
 */
class CatCurso extends CActiveRecord
{
    /**
     * Returns the static model of the specified AR class.
     * @param string $className active record class name.
     * @return CatCurso the static model class
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
        return 'cat_curso';
    }

    /**
     * @return Validaciones de modelo
     */
    public function rules()
    {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('cat_curso', 'required'),
            array('activo', 'numerical', 'integerOnly' => true),
            array('cat_curso', 'length', 'max' => 200),
            array('persona_creacion, persona_modificacion', 'length', 'max' => 20),
            array('fecha_creacion, fecha_modificacion', 'safe'),

            // The following rule is used by search().
            // Please remove those attributes that should not be searched.
            array('id_cat_curso, cat_curso, persona_creacion, fecha_creacion, persona_modificacion, fecha_modificacion, activo\n', 'safe', 'on' => 'search'),
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
            'cursoDisponibles' => array(self::HAS_MANY, 'CursoDisponible', 'id_cat_curso'),
        );
    }

    /**
     * @return array customized attribute labels (name=>label)
     */
    public function attributeLabels()
    {
        return array(
            'id_cat_curso' => 'Cat Curso',
            'cat_curso' => 'Cat Curso',
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


        return CHtml::listData(CatCurso::model()->findAll(),
            'id_cat_curso', 'cat_curso');

    }

    /**
     * Retrieves a list of models based on the current search/filter conditions.
     * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
     */

    public function search()
    {

        $criteria = new CDbCriteria();
        $criteria->compare('cat_curso', $this->cat_curso, true);

        $criteria->compare('activo', 1);
        Yii::app()->session['CatCursoCriteria'] = $criteria;


        return new CActiveDataProvider($this, array(
                'criteria' => $criteria,
                'pagination' => array(
                    'pageSize' => 20),
            )
        );

    }
}