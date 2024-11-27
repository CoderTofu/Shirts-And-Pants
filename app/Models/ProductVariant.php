<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class ProductVariant extends Model
{
    protected $attributes = [
        'stock' => 10,
    ];
    protected $fillable = [
        'product_id',
        'size_id',
        'stock',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    public function size() {
        return $this->belongsTo(Size::class, 'size_id', 'id');
    }

    public function jsonify() {
        return [
            "id" => $this->id,
            "size" => $this->size->size_name
        ];
    }
}
