<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    protected $table = 'templates';

    protected $fillable = ['name', 'type', 'image', 'fields', 'template_category_id'];
}
