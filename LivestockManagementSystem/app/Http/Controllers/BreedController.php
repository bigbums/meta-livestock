<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Breed;  // Import the Breed model

class BreedController extends Controller
{
    public function index()
    {
        $breeds = Breed::all();  // Fetch all breeds
        return response()->json($breeds);
    }


    public function getBreedsBySpecie($specieId)
    {
        try {
            // Assuming you have a Breed model with a relationship to Species
            $breeds = Breed::where('species', $specieId)->get();
            return response()->json($breeds);
        } catch (\Exception $e) {
            // Log the exception message
            Log::error("Error fetching breeds for specie ID {$specieId}: " . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch breeds'], 500);
        }

        $breeds = Breed::where('species', $specieId)->get();
        return response()->json($breeds);
    }


    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'species_id' => 'required|exists:species,id',  // Ensure species exists
            'is_african_based' => 'required|boolean',
        ]);

        $breed = Breed::create($validatedData);
        return response()->json($breed);
    }
}
