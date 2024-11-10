<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductImageController;
use App\Http\Controllers\ProductVariationController;
use Illuminate\Support\Facades\Route;


Route::controller(ProductController::class)->group(
    function () {
        Route::get('/products', 'list');
        Route::post('/products', 'add');
        Route::get('/products/{name}', 'get');
        Route::delete('/products/{name}', 'destroy');
    }
);

Route::controller(ProductVariationController::class)->group(
    function () {
        Route::get('/product-variations', 'list');
        Route::post('/product-variations', 'add');
        Route::delete('/product-variations/{id}', 'destroy');
    }
);

Route::controller(ProductImageController::class)->group(
    function () {
        Route::get('/product-images', 'list');
        Route::post('/product-images', 'add');
        Route::get('/product-images/{name}', 'get');
        Route::delete('/product-images/{name}', 'destroy');
    }
);