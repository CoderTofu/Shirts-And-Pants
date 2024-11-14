<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShoppingCart extends Model
{
    protected $fillable = [
        'user_id',
        'total_price',
        'status'
    ];
    protected $hidden = [
        'created_at',
        'updated_at',
    ];
    public function user(){
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function items(){
        return $this->hasMany(ShoppingCartItem::class, 'shopping_cart_id', 'id');
    }
}
