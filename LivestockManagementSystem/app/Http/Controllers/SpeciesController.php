<?php

namespace App\Http\Controllers;

use App\Models\Species;
use Illuminate\Http\Request;

class SpeciesController extends Controller
{
    public function index()
    {
        $species = Species::orderBy('african', 'desc')->get();  // Fetch all species
        return response()->json($species);
    }


    // Fetch breeds based on species ID
    public function getBreeds($id)
    {
        $species = Species::find($id);

        if (!$species) {
            return response()->json(['message' => 'Species not found'], 404);
        }

        return $species->breeds()->get();  // Assuming a relationship exists in Species model
    }



    public function indexSpeciesBreed()
    {
        $speciesbreed = Species::with('breeds')->get();
        return response()->json($speciesbreed);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'sub_species' => 'nullable|string',
            'is_african_based' => 'required|boolean',
            'location' => 'nullable|string',
        ]);

        $species = Species::create($validatedData);
        return response()->json($species);
    }
}
