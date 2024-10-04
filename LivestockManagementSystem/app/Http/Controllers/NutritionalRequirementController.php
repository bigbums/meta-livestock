<?php

namespace App\Http\Controllers;

use App\Models\NutritionalRequirement;
use Illuminate\Http\Request;

class NutritionalRequirementController extends Controller
{
    // Display all nutritional requirements
    public function index()
    {
        $nutritionalRequirements = NutritionalRequirement::with('species', 'breed')->get();
        return response()->json($nutritionalRequirements);
    }

    // Store a new nutritional requirement
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'species_id' => 'required|exists:species,id',
            'breed_id' => 'nullable|exists:breeds,id',
            'age_range' => 'nullable|string',
            'weight_range' => 'nullable|string',
            //'health_status' => 'nullable|string',
            'production_type' => 'nullable|string',
            'requirement_type' => 'required|string',
            'requirement_value' => 'required|numeric',
        ]);

        $nutritionalRequirement = NutritionalRequirement::create($validatedData);

        return response()->json($nutritionalRequirement, 201);
    }

    // Show a single nutritional requirement
    public function show($id)
    {
        $nutritionalRequirement = NutritionalRequirement::with('species', 'breed')->findOrFail($id);
        return response()->json($nutritionalRequirement);
    }

    // Update an existing nutritional requirement
    public function update(Request $request, $id)
    {
        $nutritionalRequirement = NutritionalRequirement::findOrFail($id);

        $validatedData = $request->validate([
            'species_id' => 'required|exists:species,id',
            'breed_id' => 'nullable|exists:breeds,id',
            'age_range' => 'nullable|string',
            'weight_range' => 'nullable|string',
            //'health_status' => 'nullable|string',
            'production_type' => 'nullable|string',
            'requirement_type' => 'required|string',
            'requirement_value' => 'required|numeric',
        ]);

        $nutritionalRequirement->update($validatedData);

        return response()->json($nutritionalRequirement, 200);
    }

    // Delete a nutritional requirement
    public function destroy($id)
    {
        $nutritionalRequirement = NutritionalRequirement::findOrFail($id);
        $nutritionalRequirement->delete();

        return response()->json(null, 204);
    }
}
