<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;


class ProductVariantController extends Controller
{
    public function toJson($variant) {
        return [
            "id" => $variant->id,
            "size" => $variant->size_name
        ];
    }
    public function list(Request $request): JsonResponse
    {
        $params = $request->query();
        if (empty($params)) {
            return response()->json(ProductVariant::with('images')->get());
        }

        $query = ProductVariant::with('images');

        if (!empty($params['product_id'])) {
            $query = $query->where('product_id', $params['product_id']);
        }
        if (!empty($params['size'])) {
            $query = $query->where('size', $params['size']);
        }

        return response()->json($query->get());
    }
    public function add(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'size' => ['required'],
            'stock' => ['required']
        ]);
        $prod = ProductVariant::create($validated);
        return response()->json($prod);
    }

    public function get(Request $request, int $id): JsonResponse
    {
        return response()->json(ProductVariant::with('images')->where('id', $id)->first());
    }

    public function getFromProductId(int $productId) {
        return response()->json(Product::with('variants')->where('id', $productId)->first());
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        $prod = ProductVariant::where('id', $id)->first();
        $prod->delete();

        return response()->json($prod, 200);
    }
}
