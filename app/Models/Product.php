<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $attributes = [
        'gender' => 'Unisex',
    ];
    protected $fillable = [
        'name',
        'description',
        'type',
        'gender',
        'price',
    ];

    public function variations()
    {
        return $this->hasMany(ProductVariation::class);
    }
}
