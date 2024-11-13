<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductImageController;
use App\Http\Controllers\ProductVariationController;
use App\Http\Controllers\ShoppingCartController;
use App\Models\ShoppingCart;
use Illuminate\Support\Facades\Route;


Route::controller(ProductController::class)->group(
    function () {
        Route::get('/products', 'list');
        Route::post('/products', 'add');
        Route::get('/products/{id}', 'get');
        Route::delete('/products/{id}', 'destroy');
    }
);

Route::controller(ProductVariationController::class)->group(
    function () {
        Route::get('/product-variations', 'list');
        Route::post('/product-variations', 'add');
        Route::get('/product-variations/{id}', 'get');
        Route::delete('/product-variations/{id}', 'destroy');
    }
);

Route::controller(ProductImageController::class)->group(
    function () {
        Route::get('/product-images', 'list');
        Route::post('/product-images', 'add');
        Route::get('/product-images/{id}', 'get');
        Route::delete('/product-images/{id}', 'destroy');
    }
);

Route::controller(ShoppingCartController::class)->group(
    function(){
        Route::post('/shopping-cart/add-to-cart', 'addToCart');
        Route::post('/shopping-cart/{userId}', 'createCart');
        Route::get('/shopping-cart/{userId}', 'getCart');
    }
);