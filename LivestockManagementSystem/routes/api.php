<?php

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\FarmController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BreedController;
use App\Http\Controllers\StateController;
use App\Http\Controllers\UsageController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\SpeciesController;
use App\Http\Controllers\BreedingController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\PedigreeController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\LivestockController;
use App\Http\Controllers\PrivilegeController;
use App\Http\Controllers\HealthRecordController;
use App\Http\Controllers\RolePrivilegeController;
use App\Http\Controllers\DiseaseIncidentController;
use App\Http\Controllers\FeedingManagementController;
use App\Http\Controllers\BreedingManagementController;
use App\Http\Controllers\LocalizatnTrackingController;
use App\Http\Controllers\HandlingEventManagementController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('posts', PostController::class);

// Route::get('/', function () {
//     return 'API';
// });

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Route::apiResource('livestocks', LivestockController::class);
// Route::get('/c/to', [LivestockController::class, 'listLivestock']);

// Route::apiResource('livestocks', LivestockController::class);

Route::prefix('livestocks')->group(function () {

    Route::post('/user', [LivestockController::class, 'user']);
    Route::get('/list', [LivestockController::class, 'listLivestock']);
    Route::get('/detail/{id}', [LivestockController::class, 'showLivestock']);
    Route::post('/store', [LivestockController::class, 'storeLivestock']);
    Route::put('/update/{id}', [LivestockController::class, 'updateLivestock']);
    Route::delete('delete/{id}', [LivestockController::class, 'destroyLivestock']);
});


// CRUD routes for Usage
Route::get('/usages', [UsageController::class, 'index']);  // Get all usages
Route::get('/usages/{id}', [UsageController::class, 'show']);  // Get a specific usage
Route::post('/usages', [UsageController::class, 'store']);  // Create new usage
Route::put('/usages/{id}', [UsageController::class, 'update']);  // Update usage
Route::delete('/usages/{id}', [UsageController::class, 'destroy']);  // Delete usage

// CRUD routes for Species
Route::get('/species', [SpeciesController::class, 'index']);  // Get all species
Route::get('/species/{id}/breeds', [SpeciesController::class, 'getBreeds']);
Route::get('/species/{id}', [SpeciesController::class, 'show']);  // Get a specific species
Route::post('/species', [SpeciesController::class, 'store']);  // Create new species
Route::put('/species/{id}', [SpeciesController::class, 'update']);  // Update species
Route::delete('/species/{id}', [SpeciesController::class, 'destroy']);  // Delete species

// CRUD routes for Breed
Route::get('/breeds', [BreedController::class, 'index']);  // Get all breeds
Route::get('/breeds/{id}', [BreedController::class, 'show']);  // Get a specific breed
Route::post('/breeds', [BreedController::class, 'store']);  // Create new breed
Route::put('/breeds/{id}', [BreedController::class, 'update']);  // Update breed
Route::delete('/breeds/{id}', [BreedController::class, 'destroy']);  // Delete breed
Route::get('/breeds/{specie_id}', [BreedController::class, 'getBreedsBySpecie']);

// Attach and detach relationships
Route::post('/species/{species}/usages', [SpeciesController::class, 'attachUsage']);  // Attach usage to species
Route::delete('/species/{species}/usages/{usage}', [SpeciesController::class, 'detachUsage']);  // Detach usage from species
Route::post('/breeds/{breed}/usages', [BreedController::class, 'attachUsage']);  // Attach usage to breed
Route::delete('/breeds/{breed}/usages/{usage}', [BreedController::class, 'detachUsage']);  // Detach usage from breed
Route::post('/species/{species}/breeds', [SpeciesController::class, 'attachBreed']);  // Attach breed to species
Route::delete('/species/{species}/breeds/{breed}', [SpeciesController::class, 'detachBreed']);  // Detach breed from species




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

// Route::apiResource('privileges', PrivilegeController::class);
Route::middleware(['auth:api'])->group(function () {


    // Only admins can create, update, and delete roles
    Route::middleware('admin')->group(function () {
        Route::get('index/privileges', [PrivilegeController::class, 'index']);
        Route::get('show/privileges/{privilege}', [PrivilegeController::class, 'show']);
        Route::post('store/privileges', [PrivilegeController::class, 'store']);
        Route::put('update/privileges/{privilege}', [PrivilegeController::class, 'update']);
        Route::delete('destroy/privileges/{privilege}', [PrivilegeController::class, 'destroy']);

        Route::prefix('roles')->group(function () {
            Route::get('/', [RoleController::class, 'listRole']); // List all roles
            // Route model binding for Role
            Route::get('{role}', [RoleController::class, 'showRole']); // Show a specific role

            // Only admins can create, update, and delete privileges
            Route::middleware('admin')->group(function () {
                Route::post('/', [RoleController::class, 'storeRole']); // Create a new role
                Route::put('{role}', [RoleController::class, 'updateRole']); // Update a specific role
                Route::delete('{role}', [RoleController::class, 'destroyRole']); // Delete a specific role
            });

            Route::prefix('roles')->group(function () {
                Route::get('{roleId}/privileges', [RolePrivilegeController::class, 'listRolePrivileges']);
                Route::post('assign-privilege', [RolePrivilegeController::class, 'assignPrivilegeToRole']);
                Route::post('remove-privilege', [RolePrivilegeController::class, 'removePrivilegeFromRole']);
            });
        });
    });
});

// User Routes
// Route::post('register', [UserController::class, 'storeUser']);
// Route::get('email/verify/{id}/{hash}', [UserController::class, 'activate'])->name('verification.verify');

// Admin Routes (Protected)
// Route::middleware('auth:sanctum')->group(function () {
//     Route::post('admin/activate-user/{id}', [UserController::class, 'activateUserByAdmin']);
//     Route::post('admin/deactivate-user/{id}', [UserController::class, 'deactivateUserByAdmin']);
// });



Route::prefix('health-records/{healthRecordId}/disease-incidents')->group(function () {
    Route::get('/', [DiseaseIncidentController::class, 'index']);
    Route::post('/', [DiseaseIncidentController::class, 'store']);
    Route::get('{id}', [DiseaseIncidentController::class, 'show']);
    Route::put('{id}', [DiseaseIncidentController::class, 'update']);
    Route::delete('{id}', [DiseaseIncidentController::class, 'destroy']);
});


Route::prefix('livestock/{livestockId}')->group(function () {
    Route::post('schedule-breeding', [BreedingController::class, 'scheduleBreeding']);
    Route::post('record-breeding', [BreedingController::class, 'recordBreeding']);
    Route::get('breeding-records', [BreedingController::class, 'getBreedingRecords']);
});




Route::prefix('livestock/{livestockId}')->group(function () {
    Route::post('pedigree', [PedigreeController::class, 'storePedigree']);
    Route::put('pedigree', [PedigreeController::class, 'updatePedigree']);
    Route::get('pedigree', [PedigreeController::class, 'showPedigree']);
});
