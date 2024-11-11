<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{

    // function for dynamic product pages
    public function show(int $id): Response
    {
        // Fetch product by ID
        $product = Product::find($id);

        // Not Found
        if (!$product) {
            return Inertia::render('Dynamic/NotFound', [
                'message' => 'Product not found.',
            ]);
        }

        // Pass product data to the view
        return Inertia::render('Dynamic/Product', [
            'product' => $product
        ]);
    }

    public function list(Request $request): JsonResponse
    {
        return response()->json(Product::with('variations')->get());
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
        return response()->json(Product::where('id', $id)->first());
    }
    public function destroy(Request $request, int $id): JsonResponse
    {
        $prod = Product::where('id', $id)->first();
        $prod->delete();

        return response()->json($prod, 200);
    }
    
}
