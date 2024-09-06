<?php

namespace App\Http\Controllers;

use App\Models\LocalizatnTracking;
use Illuminate\Http\Request;

class LocalizatnTrackingController extends Controller
{
    // Fetch all localization records
    public function listLocalization()
    {
        return response()->json(LocalizatnTracking::all());
    }

    // Store a new localization record
    public function storeLocalization(Request $request)
    {
        $validatedData = $request->validate([
            'livestock_id' => 'required|exists:livestock,id',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'timestamp' => 'required|date',
            'speed' => 'nullable|numeric',
            'direction' => 'nullable|string|max:50',
        ]);

        $localization = LocalizatnTracking::create($validatedData);

        return response()->json(['message' => 'Localization record created successfully!', 'data' => $localization], 201);
    }

    // Fetch a specific localization record
    public function showLocalization($id)
    {
        $localization = LocalizatnTracking::findOrFail($id);
        return response()->json($localization);
    }

    // Update an existing localization record
    public function updateLocalization(Request $request, $id)
    {
        $localization = LocalizatnTracking::findOrFail($id);

        $validatedData = $request->validate([
            'livestock_id' => 'required|exists:livestock,id',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'timestamp' => 'required|date',
            'speed' => 'nullable|numeric',
            'direction' => 'nullable|string|max:50',
        ]);

        $localization->update($validatedData);

        return response()->json(['message' => 'Localization record updated successfully!', 'data' => $localization]);
    }

    // Delete a localization record
    public function destroyLocalization($id)
    {
        $localization = LocalizatnTracking::findOrFail($id);
        $localization->delete();

        return response()->json(['message' => 'Localization record deleted successfully!']);
    }
}
