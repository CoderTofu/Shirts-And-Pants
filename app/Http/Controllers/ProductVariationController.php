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

        if (!empty($params['product_id'])) {
            $query = $query->where('product_id', $params['product_id']);
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
            'product_id' => ['required', 'exists:products,id'],
            'size' => ['required'],
            'color' => ['required'],
            'stock' => ['required']
        ]);
        $prod = ProductVariation::create($validated);
        return response()->json($prod);
    }

    public function get(Request $request, int $id): JsonResponse
    {
        return response()->json(ProductVariation::with('images')->where('id', $id)->first());
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        $prod = ProductVariation::where('id', $id)->first();
        $prod->delete();

        return response()->json($prod, 200);
    }
}
