<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'username',
        'password',
        'address',
        'phone'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $attributes = [
        'is_admin' => false,
    ];
    protected $keyType = 'string';
    public $incrementing = false;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function orders(){
        return $this->hasMany(Order::class, 'user_id', 'id');
    }
    public function jsonify(){
        return ['id'=>$this->id, 'name' => $this->first_name.' '.$this->last_name, 'username' => $this->username, 'address' => $this->address, 'phone' => $this->phone, 'email' => $this->email];
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $number = strval(mt_rand(0, 999999999));
                $model->id = str_pad($number, 9, '0', STR_PAD_LEFT);
            }
        });
    }
    public function getAuthIdentifier()
    {
        return $this->getKey();
    }
}
