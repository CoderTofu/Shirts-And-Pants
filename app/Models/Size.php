<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
    protected $fillable = [
        'size_name'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    // public function variants(){
    //     return $this->hasMany(ProductVariant::class, 'variant_id', 'id');
    // }
    
}
