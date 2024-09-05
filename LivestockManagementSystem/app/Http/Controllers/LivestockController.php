<?php

namespace App\Http\Controllers;

use App\Models\Livestock;
use Illuminate\Http\Request;

class LivestockController extends Controller
{
    // List all livestock
    public function listLivestock()
    {
        $livestocks = Livestock::all();
        return response()->json($livestocks);
    }

    // Store new livestock
    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|string',
            'breed' => 'required|string',
            'date_of_birth' => 'required|date',
            'gender' => 'required|in:Male,Female',
            'rfid_tag' => 'required|string|unique:livestocks',
            'herd_id' => 'required|string|unique:livestocks',
            'owner_id' => 'required|exists:users,id'
        ]);

        $livestock = Livestock::create($request->all());
        return response()->json($livestock, 201);
    }

    // Show a specific livestock
    public function showLivestock($id)
    {
        $livestock = Livestock::findOrFail($id);
        return response()->json($livestock);
    }

    // Update livestock information
    public function updateLivestock(Request $request, $id)
    {
        $livestock = Livestock::findOrFail($id);
        $livestock->update($request->all());
        return response()->json($livestock, 200);
    }

    // Delete a livestock record
    public function destroyLivestock($id)
    {
        Livestock::destroy($id);
        return response()->json(null, 204);
    }
}
