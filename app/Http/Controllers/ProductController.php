<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductVariation;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
class ProductController extends Controller
{

    public function list(Request $request): JsonResponse
    {
       
        $products = Product::with('variations.images');      
        return response()->json($products->get());
    }
    public function add(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required'],
            'description' => ['required'],
            'type' => ['required', 'regex:/shirt|pants/'],
            'gender' => ['regex:/M|F|Unisex/'],
            'price' => ['required'],
        ]);
        $prod = Product::create($validated);
        return response()->json($prod);
    }

    public function get(Request $request, int $id): JsonResponse
    {
        $params = $request->query();
        $variation = Product::where("id", $id);
        if(empty($params)){
            return response()->json($variation->with('variations')->get());
        }
        $variation = $variation->with(['variations' => function($query) use($params) {
            if(!empty($params['size'])){
                $query->where('size', $params['size']);
            }
            if(!empty($params['color'])){
                $query->where('color', $params['color']);
            }
            $query->with('images');
        }]);
        return response()->json($variation->first());
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        $prod = Product::where('id', $id)->first();
        $prod->delete();
        return response()->json($prod, 200);
    }
}
