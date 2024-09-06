<?php

// app/Http/Controllers/StateController.php
namespace App\Http\Controllers;

use App\Models\State;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StateController extends Controller
{
    /**
     * Display a listing of states.
     */
    public function listState()
    {
        $states = State::with('country')->get(); // Assuming a 'country' relationship exists in the State model
        return response()->json($states, 200);
    }

    /**
     * Store a newly created state in storage.
     */
    public function storeState(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:states,name',
            'country_id' => 'required|exists:countries,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $state = State::create($request->all());

        return response()->json($state, 201);
    }

    /**
     * Display the specified state.
     */
    public function showState($id)
    {
        $state = State::with('country')->find($id); // Assuming a 'country' relationship exists in the State model

        if (!$state) {
            return response()->json(['message' => 'State not found'], 404);
        }

        return response()->json($state, 200);
    }

    /**
     * Update the specified state in storage.
     */
    public function updateState(Request $request, $id)
    {
        $state = State::find($id);

        if (!$state) {
            return response()->json(['message' => 'State not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:states,name,' . $id,
            'country_id' => 'required|exists:countries,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $state->update($request->all());

        return response()->json($state, 200);
    }

    /**
     * Remove the specified state from storage.
     */
    public function destroyState($id)
    {
        $state = State::find($id);

        if (!$state) {
            return response()->json(['message' => 'State not found'], 404);
        }

        $state->delete();

        return response()->json(['message' => 'State deleted successfully'], 200);
    }
}
