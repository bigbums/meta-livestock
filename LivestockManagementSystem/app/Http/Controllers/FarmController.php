<?php

// app/Http/Controllers/FarmController.php
namespace App\Http\Controllers;

use App\Models\Farm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FarmController extends Controller
{
    /**
     * Display a listing of farms.
     */
    public function listFarm()
    {
        $farms = Farm::with(['user', 'location'])->get(); // Assuming relationships exist in the Farm model
        return response()->json($farms, 200);
    }

    /**
     * Store a newly created farm in storage.
     */
    public function storeFarm(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'address' => 'required|string',
            'contact_number' => 'nullable|string',
            'user_id' => 'required|exists:users,id',
            'location_id' => 'required|exists:locations,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $farm = Farm::create($request->all());

        return response()->json($farm, 201);
    }

    /**
     * Display the specified farm.
     */
    public function showFarm($id)
    {
        $farm = Farm::with(['user', 'location'])->find($id); // Assuming relationships exist in the Farm model

        if (!$farm) {
            return response()->json(['message' => 'Farm not found'], 404);
        }

        return response()->json($farm, 200);
    }

    /**
     * Update the specified farm in storage.
     */
    public function updateFarm(Request $request, $id)
    {
        $farm = Farm::find($id);

        if (!$farm) {
            return response()->json(['message' => 'Farm not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'address' => 'required|string',
            'contact_number' => 'nullable|string',
            'user_id' => 'required|exists:users,id',
            'location_id' => 'required|exists:locations,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $farm->update($request->all());

        return response()->json($farm, 200);
    }

    /**
     * Remove the specified farm from storage.
     */
    public function destroyFarm($id)
    {
        $farm = Farm::find($id);

        if (!$farm) {
            return response()->json(['message' => 'Farm not found'], 404);
        }

        $farm->delete();

        return response()->json(['message' => 'Farm deleted successfully'], 200);
    }
}
