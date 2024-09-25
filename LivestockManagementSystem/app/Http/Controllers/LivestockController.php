<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Livestock;
use Illuminate\Http\Request;

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

        $livestock = Livestock::with(['owner'])->orderBy('id', 'desc')->get();
        return response()->json($livestock);
    }

    // Store new livestock
    public function storeLivestock(Request $request)
    {
        // dd($request->all());

        $request->validate([
            'type' => 'required|string',
            'species_id' => 'required|exists:species,id',
            'date_of_birth' => 'required|date',
            'gender' => 'required|in:Male,Female',
            'tag_id' => 'required|string|unique:livestocks',
            'herd_id' => 'required|string|unique:livestocks',
            'owner_id' => 'required|exists:users,id'
        ]);
        // $livestock = Livestock::create($request->all());
        $livestock = Livestock::create([
            'type' => $request->type,
            'date_of_birth' => $request->date_of_birth,
            'gender' => $request->gender,
            'tag_id' => $request->tag_id,
            'herd_id' => $request->herd_id,
            'health_status' => $request->health_status,
            'species_id' => $request->species,
            'owner_id' => $request->owner_id,
        ]);
        return response()->json(['message' => 'Livestock record created successfully!', 'data' => $livestock], 201);

        // return response()->json($request->all(), 201);
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
