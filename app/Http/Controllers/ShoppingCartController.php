<?php

namespace App\Http\Controllers;

use App\Models\ShoppingCart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ShoppingCartController extends Controller
{
    public function createCart(Request $request, int $userId){
        Validator::make($request->all(), [
            'user_id' => [
                'required',
                Rule::exists('users')->where(function ($query) use($request) {
                    return $query->where('id', $request->user_id);
                }),
            ],
        ]);
        $cart = ShoppingCart::where('user_id', $userId)->where('status', 'open')->first();
        if(!$cart){
            ShoppingCart::create([$userId, 0, 'open']);
        }
    }

    public function getCart(Request $request, int $userId){
        return ShoppingCart::where('user_id', $userId)->where('status', 'open')->first();
    }

    public function addToCart(Request $request){
        $userId = $request->input('user_id');
        return response()->json(['authenticated' => auth()->check(), $userId]);
        // $userCart = $this->getCart($request, $userId);
    }
}
