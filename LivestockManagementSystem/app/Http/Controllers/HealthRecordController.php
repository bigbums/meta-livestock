<?php

namespace App\Http\Controllers;

use App\Models\HealthRecord;
use App\Models\Livestock;
use Illuminate\Http\Request;

class HealthRecordController extends Controller
{
    // List all health records
    public function listRecords()
    {
        $healthRecords = HealthRecord::with('livestock')->get();
        return response()->json($healthRecords);
    }

    // Store a new health record
    public function storeRecords(Request $request)
    {
        $request->validate([
            'livestock_id' => 'required|exists:livestocks,id',
            'date' => 'required|date',
            'vitals' => 'nullable|array',
            'diagnosis' => 'nullable|string',
            'treatment' => 'nullable|string',
            'notes' => 'nullable|string'
        ]);

        $healthRecord = HealthRecord::create($request->all());
        return response()->json($healthRecord, 201);
    }

    // Show a specific health record
    public function showRecord($id)
    {
        $healthRecord = HealthRecord::with('livestock')->findOrFail($id);
        return response()->json($healthRecord);
    }

    // Update an existing health record
    public function updateRecord(Request $request, $id)
    {
        $healthRecord = HealthRecord::findOrFail($id);

        $request->validate([
            'livestock_id' => 'required|exists:livestocks,id',
            'date' => 'required|date',
            'vitals' => 'nullable|array',
            'diagnosis' => 'nullable|string',
            'treatment' => 'nullable|string',
            'notes' => 'nullable|string'
        ]);

        $healthRecord->update($request->all());
        return response()->json($healthRecord, 200);
    }

    // Delete a health record
    public function destroyRecord($id)
    {
        HealthRecord::destroy($id);
        return response()->json(null, 204);
    }
}
