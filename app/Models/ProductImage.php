<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model{
    protected $fillable = [
        'variation_id',
        'image'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
    public function productVariation()
    {
        return $this->belongsTo(
            ProductVariation::class, 'variation_id', 'id'
        );
    }
}
