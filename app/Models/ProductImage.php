<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Awobaz\Compoships\Compoships;

class ProductImage extends Model
{
    use Compoships;

    protected $primaryKey = 'image';
    protected $keyType = 'string';
    public $incrementing = false;
    protected $fillable = [
        'product_name',
        'color',
        'size',
        'image'
    ];

    public function productVariation()
    {
        return $this->belongsTo(
            ProductVariation::class,
            ['product_name', 'size', 'color'],
            ['product_name', 'size', 'color']
        )->select(['product_name', 'size', 'color', 'image']);
    }
}
