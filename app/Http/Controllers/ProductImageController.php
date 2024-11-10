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

        if (!empty($params['product_name'])) {
            $query = $query->where('product_name', $params['product_name']);
        }
        if (!empty($params['size'])) {
            $query = $query->where('size', $params['size']);
        }
        if (!empty($params['color'])) {
            $query = $query->where('color', $params['color']);
        }
        return response()->json($query->all());
    }
    public function add(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'product_name' => ['required', 'exists:product_variations,product_name'],
            'size' => ['required', 'exists:product_variations,size'],
            'color' => ['required', 'exists:product_variations,color'],
            'image' => ['required'],
        ]);
        $prod = ProductImage::create($validated);
        return response()->json($prod);
    }

    public function get(Request $request, string $name): JsonResponse
    {
        return response()->json(ProductImage::where('image', $name)->first());
    }
    public function destroy(Request $request, string $name): JsonResponse
    {
        $prod = ProductImage::where('image', $name)->first();
        $prod->delete();
        return response()->json($prod, 200);
    }
}
