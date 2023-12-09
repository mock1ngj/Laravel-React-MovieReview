<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\ViewController;
use App\Http\Controllers\RatingsController;
use App\Http\Controllers\TestImage;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::controller(LoginController::class)->group(function () {
    Route::post('/auth', 'auth');
    Route::post('/logout', 'logout'); 
    Route::post('/user', 'user');
});

Route::controller(ViewController::class)->group(function() {
    Route::get('/home', 'home');
    Route::get('/login', 'login');
    Route::get('/admin', 'admin')->middleware('admin');
});

Route::resource('/movies', MovieController::class);
Route::resource('/reviews', RatingsController::class);