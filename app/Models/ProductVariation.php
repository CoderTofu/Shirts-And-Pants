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
        'imageURL'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
