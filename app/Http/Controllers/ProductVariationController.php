<?php

namespace App\Http\Controllers;

use App\Models\ProductVariation;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;


class ProductVariationController extends Controller
{

    public function list(Request $request): JsonResponse
    {
        return response()->json(ProductVariation::all());
    }
    public function add(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'size' => ['required', 'regex:/XS|S|M|L|XL/'],
            'color' => ['required'],
            'imageURL' => ['required']
        ]);
        $prod = ProductVariation::create($validated);
        return response()->json($prod);
    }

    public function get(Request $request, int $id): JsonResponse
    {
        return response()->json(ProductVariation::where('id', $id)->first());
    }
    public function destroy(Request $request, int $id): JsonResponse
    {
        $prod = ProductVariation::where('id', $id)->first();
        $prod->delete();

        return response()->json($prod, 200);
    }
}
