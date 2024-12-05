<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Order extends Model
{
    use HasUlids;
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

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->user_id)) {
                $model->user_id = Str::random(12); // Generate a 9-character string
            }
        });
    }

}
