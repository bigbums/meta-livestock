<?php

namespace App\Http\Controllers;

use App\Models\FeedingManagement;
use App\Models\Livestock;
use Illuminate\Http\Request;

class FeedingManagementController extends Controller
{
    // Display a list of feeding records
    public function listFeeding()
    {
        $feedingRecords = FeedingManagement::with('livestock')->get();
        return response()->json($feedingRecords);
    }

    // Show a specific feeding record
    public function showFeeding($id)
    {
        $feedingRecord = FeedingManagement::with('livestock')->find($id);
        if (!$feedingRecord) {
            return response()->json(['message' => 'Feeding record not found'], 404);
        }
        return response()->json($feedingRecord);
    }

    // Store a new feeding record
    public function storeFeeding(Request $request)
    {
        $validatedData = $request->validate([
            'livestock_id' => 'required|exists:livestock,id',
            'feeding_date' => 'required|date',
            'feed_type' => 'required|string',
            'quantity' => 'required|numeric',
            'unit' => 'required|string',
            'notes' => 'nullable|string',
        ]);

        $feedingRecord = FeedingManagement::create($validatedData);

        return response()->json($feedingRecord, 201);
    }

    // Update a feeding record
    public function updateFeeding(Request $request, $id)
    {
        $feedingRecord = FeedingManagement::find($id);

        if (!$feedingRecord) {
            return response()->json(['message' => 'Feeding record not found'], 404);
        }

        $validatedData = $request->validate([
            'livestock_id' => 'required|exists:livestock,id',
            'feeding_date' => 'required|date',
            'feed_type' => 'required|string',
            'quantity' => 'required|numeric',
            'unit' => 'required|string',
            'notes' => 'nullable|string',
        ]);

        $feedingRecord->update($validatedData);

        return response()->json($feedingRecord);
    }

    // Delete a feeding record
    public function destroyFeeding($id)
    {
        $feedingRecord = FeedingManagement::find($id);

        if (!$feedingRecord) {
            return response()->json(['message' => 'Feeding record not found'], 404);
        }

        $feedingRecord->delete();

        return response()->json(['message' => 'Feeding record deleted successfully']);
    }
}
