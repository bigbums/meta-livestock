<?php

namespace App\Http\Controllers;

use App\Models\FeedSchedule;
use App\Models\Feed;
use App\Models\FeedType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FeedScheduleController extends Controller
{
    // Fetch all feed schedules
    public function index()
    {
        $feedSchedules = FeedSchedule::with(['livestockGroup', 'feed_type', 'feedDistributions'])->get();
        //$feedtype = FeedType::where()all();

        return response()->json($feedSchedules);
    }

    // Store a new feed schedule
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'livestock_group_id' => 'required|exists:livestock_groups,id',
            'feed_type_id' => 'required',
            'quantity' => 'required|numeric',
            'approved_quantity' => 'nullable|numeric',
            'approver' => 'nullable|string|max:255',
            'feed_location' => 'nullable|string|max:255',
            'frequency' => 'required|string|max:255',
            'time_of_day' => 'required|string|max:255',
            'occurrence' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $feedSchedule = FeedSchedule::create($request->all());
        return response()->json($feedSchedule, 201);
        // return response()->json($request);
    }

    // Show a specific feed schedule
    public function show($id)
    {
        $feedSchedule = FeedSchedule::with(['livestockGroup', 'feed', 'feedDistributions'])->findOrFail($id);
        return response()->json($feedSchedule);
    }

    // Update an existing feed schedule
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'quantity' => 'nullable|numeric',
            'approved_quantity' => 'nullable|numeric',
            'approver' => 'nullable|string|max:255',
            'feed_location' => 'nullable|string|max:255',
            'frequency' => 'nullable|string|max:255',
            'time_of_day' => 'nullable|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $feedSchedule = FeedSchedule::findOrFail($id);
        $feedSchedule->update($request->all());
        return response()->json($feedSchedule);
    }

    // Delete a feed schedule
    public function destroy($id)
    {
        $feedSchedule = FeedSchedule::findOrFail($id);
        $feedSchedule->delete();
        return response()->json(['message' => 'Feed Schedule deleted successfully']);
    }
}
