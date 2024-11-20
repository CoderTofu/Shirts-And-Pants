<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;

class ProductController extends Controller
{

    public static function toJson($product){
        return [
            'id' => $product->id,
            'name' => $product->name,
            'description' => $product->description,
            'type' => $product->type,
            'gender' => $product->gender,
            'price' => $product->price,
            'display_image' => $product->images[0]->image,
            'images' => $product->images->map(function ($image) {
                return 
                    $image->image;
            }),
            'sizes' => $product->variants->map(function ($variant) {
                return [
                    "variant_id" => $variant->id,
                    "size" => $variant->size->size_name,
                    "stock" => $variant->stock
                ];
            })
        ];    
    }
    public function list(Request $request)
    {
        $products = Product::with(['variants.size', 'images'])->get();
        $response = $products->map(function ($product) { 
            return $this->toJson($product); 
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
        
        return Inertia::render('Dynamic/Product', ['product' => $this->toJson($product)]);
    }

    public function getAsJson(int $id){
        $product = Product::with(['images', 'variants.size'])->find($id);
        return response()->json($this->toJson($product));
    }
    public function destroy(Request $request, int $id): JsonResponse
    {
        $prod = Product::where('id', $id)->first();
        $prod->delete();
        return response()->json($prod, 200);
    }
    
}
