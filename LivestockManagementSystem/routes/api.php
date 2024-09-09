<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CityController;
use App\Http\Controllers\FarmController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StateController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\LivestockController;
use App\Http\Controllers\PrivilegeController;
use App\Http\Controllers\HealthRecordController;
use App\Http\Controllers\FeedingManagementController;
use App\Http\Controllers\BreedingManagementController;
use App\Http\Controllers\LocalizatnTrackingController;
use App\Http\Controllers\HandlingEventManagementController;


// Route::apiResource('livestocks', LivestockController::class);
// Route::get('/c/to', [LivestockController::class, 'listLivestock']);

Route::prefix('livestocks')->group(function () {

    Route::post('/user', [LivestockController::class, 'user']);
    Route::get('/list', [LivestockController::class, 'listLivestock']);
    Route::get('/detail/{id}', [LivestockController::class, 'showLivestock']);
    Route::post('/store', [LivestockController::class, 'storeLivestock']);
    Route::put('/update/{id}', [LivestockController::class, 'updateLivestock']);
    Route::delete('delete/{id}', [LivestockController::class, 'destroyLivestock']);
});


Route::apiResource('inventories', InventoryController::class);
Route::apiResource('health-records', HealthRecordController::class);

Route::prefix('breeding-management')->group(function () {
    Route::get('/listBreedbirth', [BreedingManagementController::class, 'listBreedbirth']);
    Route::get('/showBreedbirth/{id}', [BreedingManagementController::class, 'showBreedbirth']);
    Route::post('/storeBreedbirth', [BreedingManagementController::class, 'storeBreedbirth']);
    Route::put('/updateBreedbirth/{id}', [BreedingManagementController::class, 'updateBreedbirth']);
    Route::delete('/destroyBreedbirth/{id}', [BreedingManagementController::class, 'destroyBreedbirth']);
});

Route::prefix('feeding-management')->group(function () {
    Route::get('/listFeeding', [FeedingManagementController::class, 'listFeeding']);
    Route::get('/showFeeding/{id}', [FeedingManagementController::class, 'showFeeding']);
    Route::post('/storeFeeding', [FeedingManagementController::class, 'storeFeeding']);
    Route::put('/updateFeeding/{id}', [FeedingManagementController::class, 'updateFeeding']);
    Route::delete('/destroyFeeding/{id}', [FeedingManagementController::class, 'destroyFeeding']);
});

Route::prefix('localization-tracking')->group(function () {
    Route::get('/listLocalization', [LocalizatnTrackingController::class, 'listLocalization']); // Fetch all records
    Route::post('/storeLocalization', [LocalizatnTrackingController::class, 'storeLocalization']); // Create a new record
    Route::get('/showLocalization/{id}', [LocalizatnTrackingController::class, 'showLocalization']); // Fetch a single record
    Route::put('/updateLocalization/{id}', [LocalizatnTrackingController::class, 'updateLocalization']); // Update a record
    Route::delete('/destroyLocalization/{id}', [LocalizatnTrackingController::class, 'destroyLocalization']); // Delete a record
});


Route::prefix('handling-event-management')->group(function () {
    Route::get('/listEvent', [HandlingEventManagementController::class, 'listEvent']); // Fetch all records
    Route::post('/storeEvent', [HandlingEventManagementController::class, 'storeEvent']); // Create a new record
    Route::get('/showEvent/{id}', [HandlingEventManagementController::class, 'showEvent']); // Fetch a single record
    Route::put('/updateEvent/{id}', [HandlingEventManagementController::class, 'updateEvent']); // Update a record
    Route::delete('/destroyEvent/{id}', [HandlingEventManagementController::class, 'destroyEvent']); // Delete a record
});


Route::apiResource('countries', CountryController::class);
Route::apiResource('states', StateController::class);
Route::apiResource('cities', CityController::class);
Route::apiResource('locations', LocationController::class);
Route::apiResource('farms', FarmController::class);

Route::apiResource('roles', RoleController::class);
Route::apiResource('privileges', PrivilegeController::class);


// User Routes
Route::post('register', [UserController::class, 'storeUser']);
Route::get('email/verify/{id}/{hash}', [UserController::class, 'activate'])->name('verification.verify');

// Admin Routes (Protected)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('admin/activate-user/{id}', [UserController::class, 'activateUserByAdmin']);
    Route::post('admin/deactivate-user/{id}', [UserController::class, 'deactivateUserByAdmin']);
});


// Unauthenticated routes
// Route::post('register', [UserController::class, 'store']);
// Route::get('email/verify/{id}/{hash}', [UserController::class, 'activate'])->name('verification.verify');

// // Authenticated routes (Protected)
// Route::middleware('auth:sanctum')->group(function () {
//     Route::post('admin/activate-user/{id}', [UserController::class, 'activateUserByAdmin']);
//     Route::post('admin/deactivate-user/{id}', [UserController::class, 'deactivateUserByAdmin']);
// });
