<?php

namespace App\Http\Controllers;

use App\Models\Livestock;
use App\Models\BreedingRecord;
use App\Models\BreedingSchedule;
use Illuminate\Http\Request;

class BreedingController extends Controller
{
    /**
     * Schedule a breeding for a livestock.
     */
    public function scheduleBreeding(Request $request, $livestockId)
    {
        $validated = $request->validate([
            'scheduled_date' => 'required|date',
            'breeding_method' => 'required|string',
        ]);

        $livestock = Livestock::findOrFail($livestockId);
        $schedule = $livestock->breedingSchedules()->create($validated);

        return response()->json($schedule, 201);
    }

    /**
     * Record a breeding event.
     */
    public function recordBreeding(Request $request, $livestockId)
    {
        $validated = $request->validate([
            'breeding_schedule_id' => 'required|exists:breeding_schedules,id',
            'breeding_date' => 'required|date',
            'breeding_method' => 'required|string',
            'status' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $livestock = Livestock::findOrFail($livestockId);
        $record = $livestock->breedingRecords()->create($validated);

        return response()->json($record, 201);
    }

    /**
     * Get breeding records for a livestock.
     */
    public function getBreedingRecords($livestockId)
    {
        $livestock = Livestock::findOrFail($livestockId);
        $records = $livestock->breedingRecords()->with('breedingSchedule')->get();

        return response()->json($records, 200);
    }
}
