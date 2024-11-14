<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model{
    protected $fillable = [
        'variant_id',
        'image'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
    public function productVariant()
    {
        return $this->belongsTo(
            ProductVariant::class, 'variant_id', 'id'
        );
    }
}
