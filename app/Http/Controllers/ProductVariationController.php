<?php

namespace App\Http\Controllers;

use App\Models\ProductVariation;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;


class ProductVariationController extends Controller
{

    public function list(Request $request): JsonResponse
    {
        $params = $request->query();
        if (empty($params)) {
            return response()->json(ProductVariation::with('images')->get());
        }

        $query = ProductVariation::with('images');

        if (!empty($params['product_name'])) {
            $query = $query->where('product_name', $params['product_name']);
        }
        if (!empty($params['size'])) {
            $query = $query->where('size', $params['size']);
        }
        if (!empty($params['color'])) {
            $query = $query->where('color', $params['color']);
        }
        return response()->json($query->get());
    }
    public function add(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'product_name' => ['required', 'exists:products,product_name'],
            'size' => ['required'],
            'color' => ['required'],
            'stock' => ['required']
        ]);
        $prod = ProductVariation::create($validated);
        return response()->json($prod);
    }

    public function destroy(Request $request): JsonResponse
    {
        $query = $request->query();
        $prod = ProductVariation::where('product_name', $query['name'])
            ->where('size', $query['size'])
            ->where('color', $query['color'])
            ->first();
        $prod->delete();

        return response()->json($prod, 200);
    }
}
