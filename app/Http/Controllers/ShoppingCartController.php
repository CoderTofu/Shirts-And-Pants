<?php

namespace App\Http\Controllers;

use App\Models\ShoppingCart;
use App\Models\ShoppingCartItem;
use App\Models\ProductVariant;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;


class ShoppingCartController extends Controller
{

    public static function toJson($cart){

    }
    public function fetch(){
        $userId = Auth::id();
        $cart = ShoppingCart::with(['items' => ['product', 'variant.images', 'variant.color', 'variant.size']])
            ->where('user_id', $userId)
            ->where('status', 'open')
            ->first();
        if(!$cart){
            ShoppingCart::create(['user_id' => $userId,  'total_price' => 0, 'status' => 'open']);
            $cart = ShoppingCart::with(['items' => ['product', 'variant.images', 'variant.color', 'variant.size']])
                ->where('user_id', $userId)
                ->where('status', 'open')
                ->first();
        }
        return [
            "id" => $cart->id,
            "total_price" => $cart->total_price,
            "items" => $cart->items->map(function($item)
            {
                return [
                    "product_id" => $item->product->id,
                    "product_name" => $item->product->name,
                    "price"=>$item->product->price,
                    "variant_id" => $item->variant->id,
                    "color" =>$item->variant->color->color_name,
                    "size"=> $item->variant->size->size_name,
                    "stock" => $item->variant->stock,
                    "quantity" => $item->quantity,
                    "display_image" => $item->variant->images[0]->image
                ];
            })
        ];
    }

    public function update(Request $request) {
        $validated = $request->validate([
            'id' => ['required'],
            'product_id' => ['exists:products,id'],
            'color' => ['string'],
            'quantity'=> ['integer'],
            'size' => ['string']
        ]);
        
        $cartId = $validated['id'];
        $quantity = array_key_exists('quantity', $validated);
        $size = array_key_exists('size', $validated);
        $color = array_key_exists('color', $validated);
        $cartItem = ShoppingCartItem::find( $cartId);
        
        if($quantity){
            $cartItem->update(['quantity'=>$validated['quantity']]);
        }
        if($size && $color){
            $newVariant = ProductVariant::where('product_id', $validated['product_id'])
            ->where('size', $validated['size'])->where('color',$validated['color'])->first();
            if($newVariant){
                $cartItem->variant_id = $newVariant->id;
                $cartItem->quantity = 1;
                $cartItem->save();
            }
        }
        return redirect()->back();
    }

    public function getCart(){
        $cart = $this->fetch();
        return Inertia::render('Dynamic/ShoppingCart', ['cart' => $cart]);
    }

    public function addToCart(Request $request){
      
        $product_id = $request->input('product_id');
        $variant_id = $request->input('variant_id');
        $quantity = $request->input('quantity');
        $price = $request->input('price');
        $cart = $this->fetch();
        $cart->update(['total_price' => $cart->total_price + (((float)$price)*$quantity)]);

        $item = ShoppingCartItem::where('shopping_cart_id', $cart->id)
            ->where('product_id', $product_id)
            ->where('variant_id', $variant_id)
            ->first();

        if($item){
            $item->update(['quantity' => $item->quantity + $quantity]);
        }
        else{
            ShoppingCartItem::create(
                [
                    'shopping_cart_id' => $cart->id,
                    'product_id' => $request->input('product_id'),
                    'variant_id' => $request->input('variant_id'), 
                    'quantity' => $request->input('quantity'), 
                    'price' => $request->input('price')
                ]);        
        }
        return redirect()->back();
    }
}
