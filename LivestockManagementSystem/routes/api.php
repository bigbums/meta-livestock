<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\LivestockController;
use App\Http\Controllers\HealthRecordController;
use App\Http\Controllers\BreedingManagementController;
use App\Http\Controllers\FeedingManagementController;

Route::apiResource('livestocks', LivestockController::class);
Route::apiResource('inventories', InventoryController::class);
Route::apiResource('health-records', HealthRecordController::class);

Route::prefix('breeding-management')->group(function () {
    Route::get('/', [BreedingManagementController::class, 'listBreedbirth']);
    Route::get('/{id}', [BreedingManagementController::class, 'show']);
    Route::post('/', [BreedingManagementController::class, 'store']);
    Route::put('/{id}', [BreedingManagementController::class, 'update']);
    Route::delete('/{id}', [BreedingManagementController::class, 'destroy']);
});

Route::prefix('feeding-management')->group(function () {
    Route::get('/', [FeedingManagementController::class, 'index']);
    Route::get('/{id}', [FeedingManagementController::class, 'show']);
    Route::post('/', [FeedingManagementController::class, 'store']);
    Route::put('/{id}', [FeedingManagementController::class, 'update']);
    Route::delete('/{id}', [FeedingManagementController::class, 'destroy']);
});
