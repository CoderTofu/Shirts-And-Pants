<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderItem;
class OrderController extends Controller
{
    public function list(){
        $orders = Order::all()->map(function ($order) { return $order->jsonify(); });
        return Inertia::render('Dashboard', ['orders' => $orders] );
    }

    public function get(Request $request, int $id){
        $order = Order::find($id)->jsonify();
        return Inertia::render('Dynamic/Order', ['order'=>$order]);
    }

    public function edit(Request $request, int $id){
        $order = Order::find($id);
        $order->status = $request->input('status');
        $toDelete = $request->input('toDelete');
        OrderItem::destroy($toDelete);
        $order->total = $request->input('total');
        $order->save();   
    }
}
