<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $fillable = [
        'order_id',
        'shopping_cart_item_id',
    ];
    public function item(){
        return $this->belongsTo(ShoppingCartItem::class, 'shopping_cart_item_id', 'id');
    }
    public function cart(){
        return $this->belongsTo(Order::class, 'order_id', 'id');
    }
}
