<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    //     
    public function listCity()
    {
        $cities = City::with('state')->get(); // Assuming a 'state' relationship exists in the City model
        return response()->json($cities, 200);
    }

    /**
     * Store a newly created city in storage.
     */
    public function storeCity(Request $request)
    {
        $validator =  $request->validate($request->all(), [
            'name' => 'required|string|unique:cities,name',
            'state_id' => 'required|exists:states,id',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
        ]);



        return City::create($validator);



        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $city = City::create($request->all());

        return response()->json($city, 201);
    }

    /**
     * Display the specified city.
     */
    public function showCity($id)
    {
        $city = City::with('state')->find($id); // Assuming a 'state' relationship exists in the City model

        if (!$city) {
            return response()->json(['message' => 'City not found'], 404);
        }

        return response()->json($city, 200);
    }

    /**
     * Update the specified city in storage.
     */
    public function updateCity(Request $request, $id)
    {
        $city = City::find($id);

        if (!$city) {
            return response()->json(['message' => 'City not found'], 404);
        }

        $validator =  $request->validate($request->all(), [
            'name' => 'required|string|unique:cities,name,' . $id,
            'state_id' => 'required|exists:states,id',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
        ]);




        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);

            $city->update($request->all());

            return response()->json($city, 200);
        }
    }
    /**
     * Remove the specified city from storage.
     */
    public function destroyCity($id)
    {
        $city = City::find($id);

        if (!$city) {
            return response()->json(['message' => 'City not found'], 404);
        }

        $city->delete();

        return response()->json(['message' => 'City deleted successfully'], 200);
    }
}
