<?php
/**
* This is the model class for table "objetivo".
*
* The followings are the available columns in table 'objetivo':

    * @property string $id_objetivo
    * @property string $objetivo
    * @property integer $anio
    * @property integer $cumplido
    * @property string $id_servidor_publico
    * @property string $persona_creacion
    * @property string $fecha_creacion
    * @property string $persona_modificacion
    * @property string $fecha_modificacion
    * @property integer $activo

    *
    * The followings are the available model relations:
            * @property ServidorPublico $idServidorPublico
    */
class Objetivo extends CActiveRecord
{
    public $updateType;
        /**
        * Returns the static model of the specified AR class.
        * @param string $className active record class name.
        * @return Objetivo the static model class
        */
        public static function model($className=__CLASS__)
        {
        return parent::model($className);
        }
        
        /**
        * @return string the associated database table name
        */
        public function tableName()
        {
        return 'objetivo';
        }

        /**
        * @return Validaciones de modelo
        */
        public function rules()
        {
            // NOTE: you should only define rules for those attributes that
            // will receive user inputs.
            return array(
                            array('id_servidor_publico', 'required'),
                            array('anio, cumplido, activo', 'numerical', 'integerOnly'=>true),
                            array('objetivo', 'length', 'max'=>200),
                            array('id_servidor_publico', 'length', 'max'=>19),
                            array('persona_creacion, persona_modificacion', 'length', 'max'=>20),
                            array('fecha_creacion, fecha_modificacion', 'safe'),
            
            // The following rule is used by search().
            // Please remove those attributes that should not be searched.
            array('id_objetivo, objetivo, anio, cumplido, id_servidor_publico, persona_creacion, fecha_creacion, persona_modificacion, fecha_modificacion, activo\n', 'safe', 'on'=>'search'),
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
                );
        }

        /**
        * @return array customized attribute labels (name=>label)
        */
        public function attributeLabels()
        {
        return array(
        'id_objetivo' => 'Objetivo',
'objetivo' => 'Objetivo',
'anio' => 'Anio',
'cumplido' => 'Cumplido',
'id_servidor_publico' => 'Servidor Publico',
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






    return CHtml::listData(Objetivo::model()->findAll(),
    'id_objetivo', 'objetivo');

}

        /**
        * Retrieves a list of models based on the current search/filter conditions.
        * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
        */

        public function search()
        {

        $criteria = new CDbCriteria();
		$criteria->compare('objetivo',$this->objetivo,true);
		$criteria->compare('anio',$this->anio, true);
		$criteria->compare('cumplido',$this->cumplido, true);
		$criteria->compare('id_servidor_publico', $this->id_servidor_publico);


Yii::app()->session['ObjetivoCriteria'] = $criteria;


                    return new CActiveDataProvider($this, array(
                        'criteria'=>$criteria,
                        'pagination'=>array(
                        'pageSize'=>20),
                        )
        );

    }
  }