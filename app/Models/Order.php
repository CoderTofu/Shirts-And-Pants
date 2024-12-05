<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Order extends Model
{
    use HasUlids;
    protected $attributes = [
        'status' => 'Pending Order',
    ];

    protected $fillable = [
        'user_id',
        'status',
        'total'
    ];

    protected $keyType = 'string';
    public $incrementing = false;

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
            $number = strval(mt_rand(0, 999999999));
            $model->id = str_pad($number, 9, '0', STR_PAD_LEFT); // Generate a 9-character string
        });
    }
    public function getAuthIdentifier()
    {
        return $this->getKey();
    }

    protected static function booted()
    {
        static::addGlobalScope('ordered', function ($query) {
            $query->orderBy('created_at', 'desc');
        });
    }

}
