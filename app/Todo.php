<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
  protected $table = 'todos';
  protected $fillable= array('name','title');
  protected $keyType = 'string';

}
