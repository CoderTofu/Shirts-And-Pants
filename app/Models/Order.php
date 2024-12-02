<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $attributes = [
        'status' => 'To ship',
    ];

    protected $fillable = [
        'user_id',
        'status',
        'total'
    ];

    public function items(){
        return $this->hasMany(OrderItem::class, 'order_id', 'id');
    }

    public function customer(){
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function jsonify(){
        return ['id' => $this->id,
        'total' => $this->total,
        'status' => $this->status, 
        'date' => $this->created_at,
        'customer' => $this->customer->jsonify(),
        'products' => $this->items->map(
            function ($item) {
                return $item->jsonify();
         })
        ]; 
    }

}
