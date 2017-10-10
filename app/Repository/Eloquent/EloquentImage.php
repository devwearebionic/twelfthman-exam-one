<?php namespace App\Repository\Eloquent;

use Illuminate\Database\Eloquent\Model;

use App\Repository\Interfaces\ImageInterface;

use DB;

class EloquentImage implements ImageInterface

{

  /**
   * Eloquent model
   *
   * @var Illuminate\Database\Eloquent\Model
   */

  protected $image;


  public function __construct( Model $image )
  {

    $this->image = $image;

  }

  public function getById($id){

    $search = array([
        'field'    => 'id',
        'operation' => '=',
        'value'     => $id
    ]);

    return $this->search($search, true);

  }

  public function active(){

    $search = array([
        'field'    => 'status',
        'operation' => '=',
        'value'     => '1'
    ]);

    return $this->search($search);

  }

  public function deleted(){

    $search = array([
        'field'    => 'status',
        'operation' => '=',
        'value'     => '2'
    ]);

    return $this->search($search);

  }


  public function search($search = false, $first = false){

    if( !$search ){
      return false;
    }

    $image = $this->image;

    if( count($search) > 0 ){

      foreach($search as $searchInfo){

        $image = $image->where($searchInfo['field'],$searchInfo['operation'],$searchInfo['value']);

      }

    }

    return ( $image->count() > 0 )? ( $first )? $image->first() : $image->get() : false;


  }

  public function insert($data){

  	return $this->image->insert($data);
  }

  public function update($id, $data){

    return $this->image
                ->where('id','=',$id)
                ->update($data);

  }


}