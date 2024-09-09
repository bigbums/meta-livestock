<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TranslationController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/translations', [TranslationController::class, 'index']);
