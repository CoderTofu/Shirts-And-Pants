<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;

class ProductController extends Controller
{

    public function list(Request $request)
    {
        $products = Product::with('variations.images')->get();
        return Inertia::render('Products', [ 
            'products' => $products
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

    public function get(Request $request, int $id)
    {
        $params = $request->query();
        $product = Product::where("id", $id);
        if(!$product){
            return Inertia::render('Dynamic/NotFound', [
                'message' => 'Product not found.',
            ]);
        }
        
        if(empty($params)){
            return Inertia::render('Dynamic/Product', 
            ['product' => $product->with('variations.images')
                ->get()
                ->first()
            ]);
        }

        $product = $product->with(['variations' => function($query) use($params) {
            if(!empty($params['size'])){
                $query->where('size', $params['size']);
            }
            if(!empty($params['color'])){
                $query->where('color', $params['color']);
            }
            $query->with('images');
        }]);

        return Inertia::render('Dynamic/Product', ['product' => $product->first()]);
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        $prod = Product::where('id', $id)->first();
        $prod->delete();
        return response()->json($prod, 200);
    }
    
}
