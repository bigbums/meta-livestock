<?php

namespace App\Http\Controllers;

use App\Models\BreedingManagement;
use App\Models\Livestock;
use Illuminate\Http\Request;

class BreedingManagementController extends Controller
{
    // Display a list of breeding records
    public function listBreedbirth()
    {
        $breedingRecords = BreedingManagement::with('livestock')->get();
        return response()->json($breedingRecords);
    }

    // Show a specific breeding record
    public function showBreedbirth($id)
    {
        $breedingRecord = BreedingManagement::with('livestock')->find($id);
        if (!$breedingRecord) {
            return response()->json(['message' => 'Breeding record not found'], 404);
        }
        return response()->json($breedingRecord);
    }

    // Store a new breeding record
    public function storeBreedbirth(Request $request)
    {
        $validatedData = $request->validate([
            'livestock_id' => 'required|exists:livestock,id',
            'breeding_type' => 'required|string',
            'breeding_date' => 'required|date',
            'expected_delivery_date' => 'nullable|date',
            'actual_delivery_date' => 'nullable|date',
            'offspring_count' => 'nullable|integer',
            'status' => 'required|in:pending,confirmed,failed',
            'notes' => 'nullable|string',
        ]);

        $breedingRecord = BreedingManagement::create($validatedData);

        return response()->json($breedingRecord, 201);
    }

    // Update a breeding record
    public function updateBreedbirth(Request $request, $id)
    {
        $breedingRecord = BreedingManagement::find($id);

        if (!$breedingRecord) {
            return response()->json(['message' => 'Breeding record not found'], 404);
        }

        $validatedData = $request->validate([
            'livestock_id' => 'required|exists:livestock,id',
            'breeding_type' => 'required|string',
            'breeding_date' => 'required|date',
            'expected_delivery_date' => 'nullable|date',
            'actual_delivery_date' => 'nullable|date',
            'offspring_count' => 'nullable|integer',
            'status' => 'required|in:pending,confirmed,failed',
            'notes' => 'nullable|string',
        ]);

        $breedingRecord->update($validatedData);

        return response()->json($breedingRecord);
    }

    // Delete a breeding record
    public function destroyBreedbirth($id)
    {
        $breedingRecord = BreedingManagement::find($id);

        if (!$breedingRecord) {
            return response()->json(['message' => 'Breeding record not found'], 404);
        }

        $breedingRecord->delete();

        return response()->json(['message' => 'Breeding record deleted successfully']);
    }
}
