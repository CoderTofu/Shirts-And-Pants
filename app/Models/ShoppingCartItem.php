<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShoppingCartItem extends Model
{
    protected $fillable = [
        'shopping_cart_id',
        'product_id',
        'variant_id',
        'quantity',
        'price'
    ];
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    protected $attributes = [
        'status' => 'open'
    ];
    
    public function shoppingCart(){
        return $this->belongsTo(ShoppingCart::class, 'shopping_cart_id', 'id');
    }
    public function variant(){
        return $this->belongsTo(ProductVariant::class, 'variant_id', 'id');
    }

    public function product(){
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    public function order(){
        return $this->belongsTo(OrderItem::class, 'shopping_cart_item_id', 'id');
    }
    public function jsonify(){
        return [
            "id" => $this->id,
            "product" => $this->product->jsonify(),
            "variant_id_on_cart" => $this->variant->id,
            "quantity" => $this->quantity,
            'display_image' => $this->product->jsonify()['display_image'],
            'stock' => $this->variant->stock
        ];
    }

}
