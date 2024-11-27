<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $attributes = [
        'status' => 'to ship',
    ];

    protected $fillable = [
        'user_id',
        'status',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function items(){
        return $this->hasMany(OrderItem::class, 'order_id', 'id');
    }
}
