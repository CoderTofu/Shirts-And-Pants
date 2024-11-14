<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class ProductVariation extends Model
{
    protected $attributes = [
        'stock' => 10,
    ];
    protected $fillable = [
        'product_id',
        'size',
        'color',
        'stock',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    public function images()
    {
        return $this->hasMany(
            ProductImage::class,
            'variation_id',
            'id'
        );
    }
}
