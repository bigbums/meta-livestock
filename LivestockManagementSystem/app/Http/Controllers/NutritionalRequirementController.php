<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\NutritionalRequirement;

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
        // $validatedData = $request->validate([
        //     'species_id' => 'required',
        //     'breed_id' => 'required',
        //     'age_range' => 'required',
        //     'weight_range' => 'required',
        //     'production_type' => 'required',
        //     'requirement_type' => 'required',
        //     'requirement_value' => 'required',
        // ]);
        // Log each input field with its datatype
        // foreach ($request->all() as $key => $value) {
        //     Log::info("Field: $key, Value: $value, Type: " . gettype($value));
        // }
        $nutritionalRequirement = NutritionalRequirement::create([
            'species_id' => $request->species,
            'breed_id' => $request->breed,
            'age_range' => $request->age_range,
            'weight_range' => $request->weight_range,
            'production_type' => $request->production_type,
            'requirement_type' => $request->requirement_type,
            'requirement_value' => $request->requirement_value,
        ]);

        return response()->json(201);
    }



    // public function storeLivestock(Request $request)
    // {


    //     // $species = Species::where('id', $request->species_id)->first();
    //     // $species_name = Species::all()->where('id', $request->name)->first();
    //     // $type = $species_name;

    //     // Validate the request data
    //     $validatedData = $request->validate([
    //         'species' => 'required|exists:species,id',
    //         'breed' => 'required|exists:breeds,id',
    //         'date_of_birth' => 'required|date',
    //         'gender' => 'required',
    //         'health_status' => 'required',
    //         'tag_id' => 'required|unique:livestocks,tag_id',
    //         'herd_id' => 'required',
    //         'name' => 'nullable|string',
    //         'owner_id' => 'required|exists:users,id',
    //         'location_id' => 'nullable|string',
    //     ]);

    //     // Create the Livestock record
    //     $livestock = new Livestock();
    //     $livestock->species_id = $validatedData['species']; // Attach species ID
    //     $livestock->breed_id = $validatedData['breed'];     // Attach breed ID
    //     $livestock->type = $validatedData['type'];
    //     $livestock->date_of_birth = $validatedData['date_of_birth'];
    //     $livestock->gender = $validatedData['gender'];
    //     $livestock->health_status = $validatedData['health_status'];
    //     $livestock->tag_id = $validatedData['tag_id'];
    //     $livestock->herd_id = $validatedData['herd_id'];
    //     $livestock->name = $validatedData['name'];
    //     $livestock->owner_id = $validatedData['owner_id'];
    //     $livestock->location_id = $validatedData['location_id'];
    //     $livestock->save();

    //     return response()->json(['message' => 'Livestock created successfully']);
    // }




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
            //'livestock_id' => 'required|exists:livestock,id', // Validate livestock_id
            'species_id' => 'required|exists:species,id',
            'breed_id' => 'required|exists:breeds,id',
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
