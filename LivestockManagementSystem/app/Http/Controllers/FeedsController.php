<?php

// namespace App\Http\Controllers;

// use App\Models\Feed;
// use Illuminate\Http\Request;

// class FeedController extends Controller
// {
//     public function index()
//     {
//         return response()->json(Feed::with('feedType')->get(), 200);
//     }

//     public function show($id)
//     {
//         $feed = Feed::with('feedType')->findOrFail($id);
//         return response()->json($feed, 200);
//     }

//     public function store(Request $request)
//     {
//         $validatedData = $request->validate([
//             'name' => 'required|string|max:255',
//             'feed_type_id' => 'required|exists:feed_types,id',
//             'amount' => 'required|numeric',
//             'units_of_measure' => 'required|string|max:50',
//             'description' => 'nullable|string',
//         ]);

//         $feed = Feed::create($validatedData);
//         return response()->json($feed, 201);
//     }

//     public function update(Request $request, $id)
//     {
//         $validatedData = $request->validate([
//             'name' => 'required|string|max:255',
//             'feed_type_id' => 'required|exists:feed_types,id',
//             'amount' => 'required|numeric',
//             'units_of_measure' => 'required|string|max:50',
//             'description' => 'nullable|string',
//         ]);

//         $feed = Feed::findOrFail($id);
//         $feed->update($validatedData);

//         return response()->json($feed, 200);
//     }

//     public function destroy($id)
//     {
//         $feed = Feed::findOrFail($id);
//         $feed->delete();

//         return response()->json(null, 204);
//     }
// }


namespace App\Http\Controllers;

use App\Models\Feed;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FeedController extends Controller
{
    // Fetch all feeds
    public function index()
    {
        $feeds = Feed::all();
        return response()->json($feeds);
    }

    // Store a new feed
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'feed_name' => 'required|string|max:255',
            'feed_type_id' => 'required|exists:feed_types,id',
            'units_of_measure' => 'required|string|max:50',
            'nutritional_value' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $feed = Feed::create($request->all());
        return response()->json($feed, 201);
    }

    // Show a specific feed
    public function show($id)
    {
        $feed = Feed::findOrFail($id);
        return response()->json($feed);
    }

    // Update an existing feed
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'feed_name' => 'nullable|string|max:255',
            'feed_type_id' => 'nullable|exists:feed_types,id',
            'units_of_measure' => 'nullable|string|max:50',
            'nutritional_value' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $feed = Feed::findOrFail($id);
        $feed->update($request->all());
        return response()->json($feed);
    }

    // Delete a feed
    public function destroy($id)
    {
        $feed = Feed::findOrFail($id);
        $feed->delete();
        return response()->json(['message' => 'Feed deleted successfully']);
    }
}
