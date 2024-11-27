<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use App\Models\ShoppingCart;
use App\Models\ShoppingCartItem;
use App\Models\ProductVariant;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;



class ShoppingCartController extends Controller
{
    public function fetch(){
        $userId = Auth::id();
        $cart = ShoppingCart::with(['items' => ['product.images', 'variant.size']])
            ->where('user_id', $userId)
            ->where('status', 'open')
            ->first();
        if(!$cart){
            ShoppingCart::create(['user_id' => $userId, 'status' => 'open']);
            $cart = ShoppingCart::with(['items' => ['product.images', 'variant.size']])
                ->where('user_id', $userId)
                ->where('status', 'open')
                ->first();
        }
       return $cart;
    }

    public function update(Request $request) {
        $validated = $request->validate([
            'id' => ['required'],
            'quantity'=> ['integer'],
            'variant_id' => ['exists:product_variants,id'],
        ]);
        
        $cartItem = ShoppingCartItem::find( $validated['id']);     
        $cart = $this->fetch();

        $inCart = ShoppingCartItem::where('shopping_cart_id', $cart->id)->where('variant_id', $validated['variant_id'])->get();
        if(count($inCart) == 1){
            $item = $inCart->first();
            if($cartItem->variant->id != $item->variant->id){
                $variant = ProductVariant::find($item->variant->id);  
                if($item->quantity+1 <= $variant->stock){
                    $item->quantity = $item->quantity+1;
                    $item->save();
                }
                $cartItem->delete();
                return redirect()->back();
            }            
            $cartItem->quantity = $validated['quantity'];
            $cartItem->save();
            return redirect()->back();
        }
        
        $variant = ProductVariant::find($validated['variant_id']);
        $cartItem->variant_id = $variant->id;
        $cartItem->quantity = 1;
        $cartItem->save();
        
        return redirect()->back();
    }

    public function getCart(){
        $cart = $this->fetch();
        $orders = Order::where('user_id', Auth::id())->get();
        return Inertia::render('Dynamic/ShoppingCart', 
        ['cart' => $cart->jsonify(), 
                'orders' => $orders->map( 
                function ($order)
                { 
                    return $order->jsonify();
                }
            )]);
    }

    public function addToCart(Request $request){
      
        $product_id = $request->input('product_id');
        $variant_id = $request->input('variant_id');
        $quantity = $request->input('quantity');
        $cart = $this->fetch();

        $item = ShoppingCartItem::where('shopping_cart_id', $cart->id)
            ->where('product_id', $product_id)
            ->where('variant_id', $variant_id)
            ->first();

        if($item){
            if($item->quantity+$quantity <= $item->variant->stock){
                $item->quantity = $item->quantity + $quantity;
                $item->save();
            }
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

    public function checkout(Request $request)
    {
        $order = Order::create([
            'user_id' => Auth::id(),
            'total' => $request->input("total_price")
        ]);
    
        $items = $request->input('selected_items');
        foreach ($items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'shopping_cart_item_id' => $item['id']
            ]);
    
            $variant = ProductVariant::find($item['variant_id_on_cart']);
            if ($variant && $variant->stock > 0) {
                $variant->stock--;
                $variant->save();
            }
        }

        $cart = $this->fetch();
        $cart->status = 'closed';
        $cart->save();
        return Inertia::render('Dynamic/Checkout', ['order' => $order]);
    }
    
}
