<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class ProductVariant extends Model
{
    protected $attributes = [
        'stock' => 10,
    ];
    protected $fillable = [
        'product_id',
        'size_id',
        'color_id',
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

    public function color(){
        return $this->belongsTo(Color::class, 'color_id', 'id');
    }

    public function size() {
        return $this->belongsTo(Size::class, 'size_id', 'id');
    }

    public function images()
    {
        return $this->hasMany(
            ProductImage::class,
            'variant_id',
            'id'
        );
    }
}
