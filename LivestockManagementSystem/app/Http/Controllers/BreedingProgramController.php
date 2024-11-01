<?php

namespace App\Http\Controllers;

use App\Models\BreedingProgram;
use Illuminate\Http\Request;

class BreedingProgramController extends Controller
{
    // Retrieve all breeding programs
    public function index()
    {
        return BreedingProgram::all();
    }

    // Retrieve a specific breeding program
    public function show($id)
    {
        return BreedingProgram::findOrFail($id);
    }

    // Create a new breeding program
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'objective' => 'required|string|max:500',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
        ]);

        $breedingProgram = BreedingProgram::create($validatedData);
        return response()->json($breedingProgram, 201);
    }

    // Update an existing breeding program
    public function update(Request $request, $id)
    {
        $breedingProgram = BreedingProgram::findOrFail($id);
        $validatedData = $request->validate([
            'name' => 'string|max:255',
            'objective' => 'string|max:500',
            'start_date' => 'date',
            'end_date' => 'nullable|date',
        ]);

        $breedingProgram->update($validatedData);
        return response()->json($breedingProgram, 200);
    }

    // Delete a breeding program
    public function destroy($id)
    {
        $breedingProgram = BreedingProgram::findOrFail($id);
        $breedingProgram->delete();
        return response()->json(['message' => 'Breeding program deleted successfully'], 200);
    }
}
