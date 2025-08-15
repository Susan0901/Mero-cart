<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/auth/google', [AuthController::class, 'googleLogin'])->name('google.login');

Route::post('login', [AuthController::class,'login'])->name('login');
