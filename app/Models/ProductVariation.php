<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Awobaz\Compoships\Compoships;
class ProductVariation extends Model
{
    use Compoships;

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
        return $this->belongsTo(Product::class)
            ->select(['product_name', 'stock', 'color', 'size']);
    }

    public function images()
    {
        return $this->hasMany(
            ProductImage::class,
            ['product_name', 'size', 'color'],
            ['product_name', 'size', 'color']
        )->select(['product_name', 'size', 'color', 'image']);
    }
}
