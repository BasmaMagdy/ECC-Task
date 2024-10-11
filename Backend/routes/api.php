<?php

use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::get('/products/search',[ProductController::class,'search'])->name("product.search");

Route::resource('products', ProductController::class);
Route::resource('categories', CategoryController::class);

Route::get('/csrf-token', function () {
    return csrf_token();
});