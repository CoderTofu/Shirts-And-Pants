<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $primaryKey = 'product_name';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $attributes = [
        'gender' => 'Unisex',
    ];
    protected $fillable = [
        'product_name',
        'description',
        'type',
        'gender',
        'price',
    ];

    public function variations()
    {
        return $this->hasMany(ProductVariation::class, 'product_name')
            ->select(['product_name', 'stock', 'color', 'size']);
    }
}
