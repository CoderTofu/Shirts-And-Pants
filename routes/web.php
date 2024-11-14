<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductVariationController;
use App\Http\Controllers\ProductImageController;
use App\Http\Controllers\ShoppingCartController;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::controller(ProductController::class)->group(
    function () {
        Route::get('/products', 'list')->name('products');
        Route::get('/products/{id}', 'get')->name('products.get');
        Route::post('/products/add', 'add')->name('products.add');
        Route::delete('/products/{id}', 'destroy')->name('products.destroy');
    }
);

Route::controller(ProductVariationController::class)->group(
    function () {
        Route::get('/product-variations', 'list')->name('product-variations');
        Route::get('/product-variations/product/{id}', 'getFromProductId')->name('product-variations.prod-id');
        Route::post('/product-variations/add', 'add')->name('product-variations.add');
        Route::get('/product-variations/{id}', 'get')->name('product-variations.get');
        Route::delete('/product-variations/{id}', 'destroy')->name('product-variations.destroy');
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


Route::middleware('auth')->controller(ShoppingCartController::class)->group(
    function(){
        Route::get('/shopping-cart', 'getCart')->name('shopping-cart');
        Route::patch('/shopping-cart', 'update')->name('shopping-cart.update');
        Route::post('/shopping-cart/add-to-cart', 'addToCart')->name('shopping-cart.add');
    }
);


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
