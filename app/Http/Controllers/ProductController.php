<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;

class ProductController extends Controller
{

    public function list(Request $request = null)
    {
        $products = Product::with(['variants.size', 'images'])->get();
        $response = $products->map(function ($product) { 
            return $product->jsonify(); 
        });
        
        return Inertia::render('Products', [ 
            'products' => $response
        ]);
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

    public function get(int $id)
    {
        $product = Product::with(['images', 'variants.size'])->find($id);
        if(!$product){
            return Inertia::render('Dynamic/NotFound', [
                'message' => 'Product not found.',
            ]);
        }
        
        return Inertia::render('Dynamic/Product', ['product' => $product->jsonify()]);
    }

    public function getAsJson(int $id){
        $product = Product::with(['images', 'variants.size'])->find($id);
        return response()->json($product->jsonify());
    }
    public function destroy(Request $request, int $id): JsonResponse
    {
        $prod = Product::where('id', $id)->first();
        $prod->delete();
        return response()->json($prod, 200);
    }
    
}
