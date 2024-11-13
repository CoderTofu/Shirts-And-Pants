<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShoppingCartItem extends Model
{
    protected $fillable = [
        'shopping_cart_id',
        'variant_id',
        'quantity',
        'price'
    ];
    public function shoppingCart(){
        return $this->belongsTo(ShoppingCart::class, 'shopping_cart_id', 'id');
    }
    public function product(){
        return $this->belongsTo(ProductVariation::class, 'variant_id', 'id');
    }
}
