<?php

namespace App\Http\Controllers;

use App\Models\Product;
use DB;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
class ProductController extends Controller
{

    public function list(Request $request): JsonResponse
    {
        $params = $request->query();
        if (empty($params)) {
            $products = Product::with('variations.images')->select('product_name', 'description', 'type', 'gender', 'price');

            return response()->json($products->get());
        }
        $products = Product::whereHas(
            'variations',
            function ($query) use ($params) {
                if (!empty($params['product_name'])) {
                    $query->where('product_name', $params['product_name']);
                }
                if (!empty($params['size'])) {
                    $query->where('size', $params['size']);
                }
                if (!empty($params['color'])) {
                    $query->where('color', $params['color']);
                }
            }
        )->with([
                    'variations' => function ($query) use ($params) {
                        if (!empty($params['product_name'])) {
                            $query->where('product_name', $params['product_name']);
                        }
                        if (!empty($params['size'])) {
                            $query->where('size', $params['size']);
                        }
                        if (!empty($params['color'])) {
                            $query->where('color', $params['color']);
                        }
                    },
                    'variations.images'
                ])->select('product_name', 'description', 'type', 'gender', 'price');

        return response()->json($products->get());
    }
    public function add(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'product_name' => ['required'],
            'description' => ['required'],
            'type' => ['required', 'regex:/shirt|pants/'],
            'gender' => ['regex:/M|F|Unisex/'],
            'price' => ['required'],
        ]);
        $prod = Product::create($validated);
        return response()->json($prod);
    }

    public function get(Request $request, string $name): JsonResponse
    {
        return response()->json(Product::with('variations')
            ->where('product_name', $name)->first());
    }
    public function destroy(Request $request, string $name): JsonResponse
    {
        $prod = Product::where('product_name', $name)->first();
        $prod->delete();

        return response()->json($prod, 200);
    }
}
