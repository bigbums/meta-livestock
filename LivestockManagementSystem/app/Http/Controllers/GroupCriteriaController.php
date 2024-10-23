<?php

namespace App\Http\Controllers;

use App\Models\GroupCriteria;
use App\Models\LivestockGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class GroupCriteriaController extends Controller
{
    // Fetch criteria for a specific livestock group
    public function index()
    {
        // Fetch all criteria for the given livestock group
        //$criteria = GroupCriteria::where('livestock_group_id', $groupId)->get();
        return response()->json(GroupCriteria::all(), 200);

        // Return the criteria as a JSON response
        // return response()->json($criteria);
    }

    public function store(Request $request)
    {
        try {
            // Validate the request
            $validatedData = $request->validate([
                'criteria' => 'required|array',
                'criteria.*.key' => 'required|string|max:255',
                'criteria.*.value' => 'required|string|max:255',
                'livestock_id' => 'nullable|integer|exists:livestocks,id',
            ]);

            // Loop through the criteria array and save each entry
            if (count($validatedData['criteria']) > 2) {
                GroupCriteria::create([
                    'key' => $validatedData['criteria'][0]['key'],
                    'value' => $validatedData['criteria'][0]['value'],
                    'livestock_group_id' => $validatedData['livestock_id'], // Can be null
                ]);
            } else {
                foreach ($validatedData['criteria'] as $criterion) {
                    GroupCriteria::create([
                        'key' => $criterion['key'],
                        'value' => $criterion['value'],
                        'livestock_group_id' => $validatedData['livestock_id'], // Can be null
                    ]);
                }
            }


            return response()->json([
                'message' => 'Criteria created successfully',
                'validatedData' => $validatedData
            ], 201);
        } catch (\Exception $e) {
            // Log error for debugging
            Log::error($e->getMessage());

            return response()->json([
                'error' => 'Failed to create criteria',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        $criteria = GroupCriteria::findOrFail($id);
        return response()->json($criteria, 200);  // Return directly
    }

    // Update or create criteria for a specific livestock group
    // public function update(Request $request, $groupId)
    // {
    //     // Validate the incoming request payload
    //     $validator = Validator::make($request->all(), [
    //         'criteria' => 'required|array',
    //         'criteria.*.key' => 'required|string|max:255',
    //         'criteria.*.value' => 'required|string|max:255',
    //     ]);

    //     // if ($validator->fails()) {
    //     //     return response()->json(['errors' => $validator->errors()], 422);
    //     // }

    //     // Fetch the livestock group by ID (ensure the group exists)
    //     // $group = LivestockGroup::findOrFail($groupId);

    //     // // Clear existing criteria for the group (if you want to remove all old criteria)
    //     // GroupCriteria::where('livestock_group_id', $groupId)->delete();

    //     // // Insert new or updated criteria
    //     // foreach ($request->criteria as $criterion) {
    //     //     GroupCriteria::create([
    //     //         'livestock_group_id' => $groupId,
    //     //         'key' => $criterion['key'],
    //     //         'value' => $criterion['value'],
    //     //     ]);
    //     // }

    //     return response()->json([
    //         'validator' => $validator,
    //         // 'message' => 'Criteria updated successfully!'
    //     ], 200);
    // }


    // Update group criteria by ID
    public function update(Request $request, $id)
    {
        try {
            // Validate the incoming request data
            $validatedData = $request->validate([
                'criteria' => 'required|array',
                'criteria.*.key' => 'required|string|max:255',
                'criteria.*.value' => 'required|string|max:255',
                // 'livestock_id' => 'nullable|integer|exists:livestocks,id',
            ]);

            // Loop through the criteria array and save each entry
            GroupCriteria::create([
                'key' => $validatedData['criteria'][0]['key'],
                'value' => $validatedData['criteria'][0]['value'],
                // 'livestock_group_id' => $validatedData['livestock_id'], // Can be null
            ]);


            // If validation fails, return an error response
            // if ($validator->fails()) {
            //     return response()->json([
            //         'success' => false,
            //         'message' => $validator->errors()
            //     ], 400);
            // }

            // Find the group criteria by ID
            // $groupCriteria = GroupCriteria::findOrFail($id);

            // Update the criteria with the validated data
            // $groupCriteria->criteria = $request->input('criteria');

            // Save the updated criteria to the database
            // $groupCriteria->save();

            // Return a success response
            return response()->json([
                // 'success' => true,
                'validatedData' => $validatedData,
                // 'message' => 'Group criteria updated successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update group criteria'
            ], 500);
        }
    }

    public function destroy($id)
    {
        $criteria = GroupCriteria::findOrFail($id);
        $criteria->delete();

        return response()->json(null, 204);
    }
}
