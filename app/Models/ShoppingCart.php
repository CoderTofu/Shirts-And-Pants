<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Http\Controllers\ProductController;
class ShoppingCart extends Model
{
    protected $fillable = [
        'user_id',
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

    public function jsonify(){
        return [
            "cart_id" => $this->id,
            "cart_items" => $this->items->map(function($item) 
            {
        
                return $item->jsonify();
            })
        ];
    }
}
