<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HandlingEventManagement;

class HandlingEventManagementController extends Controller
{
    // Fetch all handling and event records
    public function listEvent()
    {
        return response()->json(HandlingEventManagement::all());
    }

    // Store a new handling and event record
    public function storeEvent(Request $request)
    {
        $validatedData = $request->validate([
            'livestock_id' => 'required|exists:livestock,id',
            'event_type' => 'required|string|max:100',
            'event_date' => 'required|date',
            'description' => 'nullable|string',
            'handler_name' => 'nullable|string|max:100',
            'cost' => 'nullable|numeric',
        ]);

        $event = HandlingEventManagement::create($validatedData);

        return response()->json(['message' => 'Handling and Event record created successfully!', 'data' => $event], 201);
    }

    // Fetch a specific handling and event record
    public function showEvent($id)
    {
        $event = HandlingEventManagement::findOrFail($id);
        return response()->json($event);
    }

    // Update an existing handling and event record
    public function updateEvent(Request $request, $id)
    {
        $event = HandlingEventManagement::findOrFail($id);

        $validatedData = $request->validate([
            'livestock_id' => 'required|exists:livestock,id',
            'event_type' => 'required|string|max:100',
            'event_date' => 'required|date',
            'description' => 'nullable|string',
            'handler_name' => 'nullable|string|max:100',
            'cost' => 'nullable|numeric',
        ]);

        $event->update($validatedData);

        return response()->json(['message' => 'Handling and Event record updated successfully!', 'data' => $event]);
    }

    // Delete a handling and event record
    public function destroyEvent($id)
    {
        $event = HandlingEventManagement::findOrFail($id);
        $event->delete();

        return response()->json(['message' => 'Handling and Event record deleted successfully!']);
    }
}
