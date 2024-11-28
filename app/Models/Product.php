<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $attributes = [
        'gender' => 'Unisex',
    ];
    protected $fillable = [
        'name',
        'description',
        'type',
        'gender',
        'price'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function variants()
    {
        return $this->hasMany(ProductVariant::class, 'product_id', 'id');
    }
    public function images(){
        return $this->hasMany(ProductImage::class, 'product_id', 'id');
    }
    public function inCart(){
        return $this->hasMany(ShoppingCartItem::class, 'product_id', 'id');
    }

    public function jsonify(){
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'type' => $this->type,
            'gender' => $this->gender,
            'price' => $this->price,
            'display_image' => $this->images[0]->image,
            'images' => $this->images->map(function ($image) {
                return 
                    $image->image;
            }),
            'sizes' => $this->variants->map(function ($variant) {
                return [
                    "variant_id" => $variant->id,
                    "size" => $variant->size->size_name,
                    "stock" => $variant->stock
                ];
            })
        ];    
    }

}
