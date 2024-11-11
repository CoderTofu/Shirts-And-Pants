<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{

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
