<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Breed;
use App\Models\Species;
use App\Models\Livestock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LivestockController extends Controller
{
    // List all livestock
    public function user(Request $request)
    {


        $user = User::create([
            'username' => $request->username,
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        return response()->json($user, 201);
    }

    public function listLivestock()
    {
        // $livestocks = Livestock::all();
        // return response()->json($livestocks);

        $livestock = Livestock::with(['owner', 'species', 'breed'])->orderBy('id', 'desc')->get();
        return response()->json($livestock);
    }


    // Store new livestock
    // public function storeLivestock(Request $request)
    // {
    //     // dd($request->all());

    //     // $id = Auth::user()->id;
    //     // DB::transaction(function () use ($request, $id) {
    //     //     $species = Invoice::where('invoice_nbr', $request->invoice_nbr)->where('invoice_customer_name', $request->invoice_customer_name)->update([
    //     //         'invoice_status' =>  $request->invoice_status,
    //     //         'invoice_paid_date' => $request->invoice_paid_date,
    //     //     ]);

    //     $species_id = Livestock::with(['species'])->where('id', $request->name)->value('name')->first();

    //     //:where('id', $request->id)->value('tenant_id');

    //     $breed_id = Breed::where('id', $request->name)->first();

    //     $request->validate([
    //         //'type' => 'required|string',
    //         // 'species_id' => $species_id,
    //         // 'breed_id' => $breed_id,
    //         'date_of_birth' => 'required|date',
    //         'gender' => 'required|in:Male,Female',
    //         'tag_id' => 'required|string|unique:livestocks',
    //         'herd_id' => 'required|string|unique:livestocks',
    //         'owner_id' => 'required|exists:users,id'
    //     ]);
    //     // $livestock = Livestock::create($request->all());
    //     $livestock = Livestock::create([
    //         'type' => $species_id,
    //         'date_of_birth' => $request->date_of_birth,
    //         'gender' => $request->gender,
    //         'tag_id' => $request->tag_id,
    //         'herd_id' => $request->herd_id,
    //         'health_status' => $request->health_status,
    //         'species_id' => $species_id,
    //         'breed_id' => $breed_id,
    //         'owner_id' => $request->owner_id,
    //     ]);
    //     return response()->json(['message' => 'Livestock record created successfully!', 'data' => $livestock], 201);

    //     // return response()->json($request->all(), 201);
    // }


    public function storeLivestock(Request $request)
    {


        $species = Species::where('id', $request->species_id)->first();
        $species_name = Species::all()->where('id', $request->name)->first();
        $type = $species_name;
        // Validate the request data
        $validatedData = $request->validate([
            'type' => 'nullable|string',
            'species' => 'required|exists:species,id',
            'breed' => 'required|exists:breeds,id',
            'date_of_birth' => 'required|date',
            'gender' => 'required',
            'health_status' => 'required',
            'tag_id' => 'required|unique:livestocks,tag_id',
            'herd_id' => 'required',
            'name' => 'nullable|string',
            'owner_id' => 'required|exists:users,id',
            'location_id' => 'nullable|string',
        ]);

        // Create the Livestock record
        $livestock = new Livestock();
        $livestock->species_id = $validatedData['species']; // Attach species ID
        $livestock->breed_id = $validatedData['breed'];     // Attach breed ID
        $livestock->type = $validatedData['type'];
        $livestock->date_of_birth = $validatedData['date_of_birth'];
        $livestock->gender = $validatedData['gender'];
        $livestock->health_status = $validatedData['health_status'];
        $livestock->tag_id = $validatedData['tag_id'];
        $livestock->herd_id = $validatedData['herd_id'];
        $livestock->name = $validatedData['name'];
        $livestock->owner_id = $validatedData['owner_id'];
        $livestock->location_id = $validatedData['location_id'];
        $livestock->save();

        return response()->json(['message' => 'Livestock created successfully']);
    }


    // Show a specific livestock
    public function showLivestock($id)
    {
        // Eager load the 'user' relationship with the Livestock model
        $livestock = Livestock::with(['owner', 'species', 'breed'])->findOrFail($id);

        return response()->json([
            'livestock' => $livestock,
        ]);
    }

    /**
     * Fetch all species.
     */
    public function getSpecies()
    {
        $species = Species::all(); // Get all species
        return response()->json($species);
    }


    /**
     * Fetch all breeds for the given species.
     */
    public function getBreeds($species_id)
    {
        $breeds = Breed::where('species_id', $species_id)->get(); // Get breeds by species
        return response()->json($breeds);
    }

    // Update livestock information
    public function updateLivestock(Request $request, $id)
    {
        // Validate incoming request data
        $request->validate([
            'type' => 'required|string|max:255',
            'species_id' => 'required|exists:species,id',
            'breed_id' => 'required|exists:breeds,id',
            'date_of_birth' => 'required|date',
            'gender' => 'required|string|max:10',
            'health_status' => 'required|string|max:255',
        ]);

        // Find the livestock by ID
        $livestock = Livestock::findOrFail($id);

        // Update livestock attributes
        $livestock = $livestock->update([
            'type' => $request->input('type'),
            'species_id' => $request->input('species_id'),
            'breed_id' => $request->input('breed_id'),
            'date_of_birth' => $request->input('date_of_birth'),
            'gender' => $request->input('gender'),
            'health_status' => $request->input('health_status'),
        ]);

        return response()->json([
            'livestock' => $livestock,
            'message' => 'Livestock updated successfully!',
        ]);
    }

    // Delete a livestock record
    public function destroyLivestock($id)
    {
        Livestock::destroy($id);
        return response()->json(null, 204);
    }

    public function getLivestockBySpecies(Request $request)
    {
        $speciesId = $request->query('species_id');
        $livestock = Livestock::where('species_id', $speciesId)->get();

        return response()->json($livestock);
    }
}
