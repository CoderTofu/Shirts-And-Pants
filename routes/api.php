<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductVariationController;
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
