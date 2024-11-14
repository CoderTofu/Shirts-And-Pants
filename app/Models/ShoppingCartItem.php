<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShoppingCartItem extends Model
{
    protected $fillable = [
        'shopping_cart_id',
        'product_id',
        'variation_id',
        'quantity',
        'price'
    ];
    protected $hidden = [
        'created_at',
        'updated_at',
    ];
    public function shoppingCart(){
        return $this->belongsTo(ShoppingCart::class, 'shopping_cart_id', 'id');
    }
    public function variation(){
        return $this->belongsTo(ProductVariation::class, 'variation_id', 'id');
    }

    public function product(){
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

}
