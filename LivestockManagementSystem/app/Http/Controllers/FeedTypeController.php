<?php

namespace App\Http\Controllers;

use App\Models\FeedType;
use Illuminate\Http\Request;

class FeedTypeController extends Controller
{
    public function index()
    {
        return response()->json(FeedType::all(), 200);
    }



    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'feed_type_name' => 'required|string|max:255',
            'feed_type_variant_name' => 'nullable|string',
            'feed_type_desc' => 'nullable|string',
            'feed_type_notes' => 'nullable|string',
        ]);

        $feedType = FeedType::create($validatedData);
        return response()->json($feedType, 201);
    }

    public function show($id)
    {
        $feedType = FeedType::findOrFail($id);
        return response()->json($feedType, 200);  // Return directly
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'variant_name' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $feedType = FeedType::findOrFail($id);
        $feedType->update($request->all());
        // $feedType->update($validatedData);

        return response()->json($feedType, 200);
    }

    public function destroy($id)
    {
        $feedType = FeedType::findOrFail($id);
        $feedType->delete();

        return response()->json(null, 204);
    }
}
