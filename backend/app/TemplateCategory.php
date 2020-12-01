<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TemplateCategory extends Model
{
    protected $table = 'template_categories';

    protected $fillable = ['name'];
}
