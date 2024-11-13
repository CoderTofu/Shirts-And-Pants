<?php

namespace App\Http\Controllers;

use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;


class ProductImageController extends Controller
{

    public function list(Request $request): JsonResponse
    {
        $params = $request->query();
        if (empty($params)) {
            return response()->json(ProductImage::all());
        }

        $query = ProductImage::all();

        if (!empty($params['variation_id'])) {
            $query = $query->where('variation_id', $params['variation_id']);
        }
    
        return response()->json($query->all());
    }
    public function add(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'variation_id' => ['required', 'exists:product_variations,id'],
            'image' => ['required'],
        ]);
        $prod = ProductImage::create($validated);
        return response()->json($prod);
    }

    public function get(Request $request, int $id): JsonResponse
    {
        return response()->json(ProductImage::where('id', $id)->first());
    }
    public function destroy(Request $request, int $id): JsonResponse
    {
        $prod = ProductImage::where('', $id)->first();
        $prod->delete();
        return response()->json($prod, 200);
    }
}
