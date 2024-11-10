<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductVariation extends Model
{
    protected $attributes = [
        'stock' => 10,
    ];
    protected $fillable = [
        'product_name',
        'size',
        'color',
        'stock',
    ];

    public $incrementing = false;

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class, 'product_name');
    }

}
