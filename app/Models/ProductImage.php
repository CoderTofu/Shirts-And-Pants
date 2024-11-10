<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
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
        return $this->belongsTo(ProductVariation::class, 'product_name', 'product_name')
            ->where('size', $this->size)
            ->where('color', $this->color);
    }
}
