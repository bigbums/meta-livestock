<?php

namespace App\Http\Controllers;

use App\Models\Livestock;
use App\Models\Pregnancy;
use Illuminate\Http\Request;


class PregnancyRecordController extends Controller
{
    // Fetch all pregnancy records
    public function index()
    {
        return Pregnancy::with('livestock')->get();
    }

    // Fetch a single pregnancy record by ID
    public function show($id)
    {
        $record = Pregnancy::with('livestock')->find($id);
        if (!$record) {
            return response()->json(['message' => 'Record not found'], 404);
        }
        return $record;
    }

    // Store a new pregnancy record
    public function store(Request $request)
    {
        $validated = $request->validate([
            'livestock_id' => 'required|exists:livestock,id',
            'breeding_date' => 'required|date',
            'pregnancy_status' => 'required|in:positive,negative,pending',
            'detection_method' => 'nullable|string',
            'detection_date' => 'nullable|date',
            'expected_delivery_date' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        $record = Pregnancy::create($validated);
        return response()->json($record, 201);
    }

    // Update a pregnancy record
    public function update(Request $request, $id)
    {
        $record = Pregnancy::find($id);
        if (!$record) {
            return response()->json(['message' => 'Record not found'], 404);
        }

        $validated = $request->validate([
            'breeding_date' => 'nullable|date',
            'pregnancy_status' => 'nullable|in:positive,negative,pending',
            'detection_method' => 'nullable|string',
            'detection_date' => 'nullable|date',
            'expected_delivery_date' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        $record->update($validated);
        return response()->json($record);
    }

    // Delete a pregnancy record
    public function destroy($id)
    {
        $record = Pregnancy::find($id);
        if (!$record) {
            return response()->json(['message' => 'Record not found'], 404);
        }

        $record->delete();
        return response()->json(['message' => 'Record deleted successfully']);
    }
}
