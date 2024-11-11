<?php

namespace App\Http\Controllers;

use App\Models\BreedingProgram;
use Illuminate\Http\Request;

class BreedingProgramController extends Controller
{
    // Retrieve all breeding programs
    // public function index()
    // {
    //     return BreedingProgram::all();
    // }

    // Retrieve all breeding programs
    public function index()
    {
        $programs = BreedingProgram::all();

        if ($programs->isEmpty()) {
            return response()->json(['message' => 'No breeding programs found.'], 404);
        }

        return response()->json($programs);
    }


    public function indexBreedingGroup()
    {
        $programs = BreedingProgram::all('program_name'); // Retrieve only the program names
        return response()->json($programs);
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
            'program_name' => 'required|string|max:255',
            'description' => 'string|max:255',
            'target_offspring_count' => 'nullable|integer',
            'livestock_group_id' => 'integer|exists:livestock_groups,id',
            // 'objective' => 'required|string|max:500',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
        ]);

        $breedingProgram = BreedingProgram::create($validatedData);
        // $breedingProgram = $request->all();
        return response()->json($breedingProgram, 201);
    }

    // Update an existing breeding program
    public function update(Request $request, $id)
    {
        $breedingProgram = BreedingProgram::findOrFail($id);
        $validatedData = $request->validate([
            'program_name' => 'string|max:255',
            'description' => 'string|max:255',
            'target_offspring_count' => 'nullable|integer',
            'start_date' => 'date',
            'end_date' => 'nullable|date',
            'livestock_group_id' => 'integer|exists:livestock_groups,id',
        ]);

        $breedingProgram->update($validatedData);
        // $breed = $request->all();
        // return response()->json($breedingProgram, 200);
        return response()->json(200);
    }

    // Delete a breeding program
    // public function destroy($id)200
    // {
    //     $breedingProgram = BreedingProgram::findOrFail($id);
    //     $breedingProgram->delete();
    //     return response()->json(['message' => 'Breeding program deleted successfully'], 200);
    // }

    public function destroy($id)
    {
        $program = BreedingProgram::findOrFail($id);
        $program->delete();

        return response()->json(['message' => 'Breeding program deleted successfully.']);
    }
}
