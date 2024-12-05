<?php

use App\Models\Product;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\CheckAdmin;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductVariantController;
use App\Http\Controllers\ProductImageController;
use App\Http\Controllers\ShoppingCartController;

Route::get('/', function () {
    $products = Product::inRandomOrder()
        ->limit(4)
        ->get()
        ->map(function ($product) {
            return $product->jsonify();
        }
    );
    return Inertia::render('Home', [
        'randomProducts' => $products,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/about', function () {
    return Inertia::render('About', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('about');

Route::controller(ProductController::class)->group(
    function () {
        Route::get('/products', 'list')->name('products');
        Route::get('/products/{id}', 'get')->name('products.get');
        Route::post('/products/add', 'add')->name('products.add');
        Route::delete('/products/{id}', 'destroy')->name('products.destroy');
    }
);

Route::controller(ProductVariantController::class)->group(
    function () {
        Route::get('/product-variants', 'list')->name('product-variants');
        Route::get('/product-variants/product/{id}', 'getFromProductId')->name('product-variants.prod-id');
        Route::post('/product-variants/add', 'add')->name('product-variants.add');
        Route::get('/product-variants/{id}', 'get')->name('product-variants.get');
        Route::delete('/product-variants/{id}', 'destroy')->name('product-variants.destroy');
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
        Route::delete('/shopping-cart', 'destroy')->name('shopping-cart.destroy');
        Route::post('/shopping-cart/add-to-cart', 'addToCart')->name('shopping-cart.add');
        Route::post('/shopping-cart/checkout', 'checkout')->name('shopping-cart.checkout');
        Route::post('/shopping-cart/buy', 'buy')->name('shopping-cart.buy');
        Route::post('/shopping-cart/confirm', 'confirmOrder')->name('shopping-cart.confirm');
        Route::get('/shopping-cart/checkout', 'getCart');
    }
);

Route::get('/dashboard', [OrderController::class, 'list'])->middleware(['auth', 'verified', CheckAdmin::class])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', CheckAdmin::class])->group(function (){
    Route::get('/order/{id}', [OrderController:: class, 'get'])->name('order');
    Route::patch('/order/{id}', [OrderController:: class, 'edit'])->name('order.edit');
    Route::delete('/order/{id}', [OrderController:: class, 'destroy'])->name('order.destroy');
});

Route::fallback(function () {
    return Inertia::render('404')
        ->toResponse(request())
        ->setStatusCode(404);
});

require __DIR__ . '/auth.php';
