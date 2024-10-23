<?php

// namespace App\Http\Controllers;

// use Illuminate\Http\Request;

// class FeedDistributionController extends Controller
// {
//     public function distribute(Request $request)
//     {
//         $validatedData = $request->validate([
//             'feed_schedule_id' => 'required|exists:feed_schedules,id',
//             'actual_time' => 'required|date',
//             'quantity_distributed' => 'required|numeric',
//             'distributed_by' => 'required|string',
//         ]);

//         $feedDistribution = FeedDistribution::create($validatedData);

//         return response()->json($feedDistribution, 201);
//     }

//     public function index()
//     {
//         $feedDistributions = FeedDistribution::with(['feedSchedule'])->get();
//         return response()->json($feedDistributions);
//     }
// }


namespace App\Http\Controllers;

use App\Models\FeedDistribution;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FeedDistributionController extends Controller
{
    // Fetch all feed distributions
    public function index()
    {
        $distributions = FeedDistribution::with('feedSchedule')->get();
        return response()->json($distributions);
    }

    // Store a new feed distribution
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'feed_schedule_id' => 'required|exists:feed_schedules,id',
            'distribution_time' => 'required|date',
            'actual_quantity_distributed' => 'required|numeric',
            'distributed_by' => 'nullable|string|max:255',
            'feed_by_user' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $distribution = FeedDistribution::create($request->all());
        return response()->json($distribution, 201);
    }

    // Show a specific feed distribution
    public function show($id)
    {
        $distribution = FeedDistribution::with('feedSchedule')->findOrFail($id);
        return response()->json($distribution);
    }

    // Update an existing feed distribution
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'distribution_time' => 'nullable|date',
            'actual_quantity_distributed' => 'nullable|numeric',
            'distributed_by' => 'nullable|string|max:255',
            'feed_by_user' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $distribution = FeedDistribution::findOrFail($id);
        $distribution->update($request->all());
        return response()->json($distribution);
    }

    // Delete a feed distribution
    public function destroy($id)
    {
        $distribution = FeedDistribution::findOrFail($id);
        $distribution->delete();
        return response()->json(['message' => 'Feed distribution deleted successfully']);
    }
}
