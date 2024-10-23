<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GroupCriteria;
use App\Models\LivestockGroup;
use Illuminate\Support\Facades\Validator;

class LivestockGroupController extends Controller
{
    /**
     * Display a listing of the livestock groups.
     */
    public function index()
    {
        $livestockGroups = LivestockGroup::all();
        return response()->json($livestockGroups);
    }

    /**
     * Store a newly created livestock group in the database.
     */
    // public function store(Request $request)
    // {
    //     // Validate the request data
    //     // $validatedData = $request->validate([
    //     //     'name' => 'required|string|max:255',
    //     //     'criteria_key' => 'string',
    //     //     'criteria_value' => 'numeric',
    //     // ]);

    //     $validatedData = $request->validate([
    //         'name' => 'required|string|max:255',
    //         'criteria' => 'required|array',
    //         'criteria.*.key' => 'string',
    //         'criteria.*.value' => 'numeric',
    //     ]);

    //     // Create a new LivestockGroup
    //     $livestockGroup = LivestockGroup::create([
    //         // 'name' => $request->name,
    //         // 'criteria_key' => $request->criteria_key,
    //         // 'criteria_value' => $request->criteria_value,
    //         'name' => $validatedData['name'],
    //         'criteria_key' => $validatedData['criteria'][0]['key'],
    //         'criteria_value' => $validatedData['criteria'][0]['value'],
    //     ]);

    //     // foreach ($validatedData['criteria'] as $criterion) {
    //     //     // Assuming you have a relationship between LivestockGroup and a Criteria model
    //     //     $livestockGroup->criteria()->create([
    //     //         'key' => $criterion['key'],
    //     //         'value' => $criterion['value'],
    //     //     ]);
    //     // }
    //     // $livestockGroup = LivestockGroup::create($validatedData);

    //     return response()->json($livestockGroup, 201); // Return 201 Created status
    // }




    public function store(Request $request)
    {
        // Validate the incoming request
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            // 'criteria' => 'required|array', // Criteria should be an array
            // 'criteria.*.key' => 'required|string', // Each criterion should have a key
            // 'criteria.*.value' => 'required|string', // Each criterion should have a value
        ]);

        // Create a new Livestock Group
        $livestockGroup = LivestockGroup::create([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'] ?? '',
        ]);

        // Create the associated criteria
        // foreach ($validatedData['criteria'] as $criterion) {
        //     $livestockGroup->criteria()->create([
        //         'criteria_key' => $criterion['key'],
        //         'criteria_value' => $criterion['value'],
        //     ]);
        // }

        return response()->json($livestockGroup, 201); // Return group and criteria
    }









    /**
     * Display the specified livestock group.
     */
    public function show($id)
    {
        // Find the livestock group by its ID
        $livestockGroup = LivestockGroup::findOrFail($id);
        return response()->json($livestockGroup);
    }


    /**
     * Update the specified livestock group in the database.
     */
    public function update(Request $request, $id)
    {
        // Find the livestock group
        $livestockGroup = LivestockGroup::findOrFail($id);

        // Validate the incoming request
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // Update the livestock group with the validated data
        $livestockGroup->update($validatedData);

        return response()->json($livestockGroup, 200); // Return 200 OK status
    }

    /**
     * Remove the specified livestock group from the database.
     */
    public function destroy($id)
    {
        // Find the livestock group by its ID
        $livestockGroup = LivestockGroup::findOrFail($id);

        // Delete the livestock group
        $livestockGroup->delete();

        return response()->json(['message' => 'Livestock group deleted successfully'], 200);
    }


    public function addLivestockToGroup(Request $request, $groupId)
    {
        $group = LivestockGroup::findOrFail($groupId);

        // Validate the request
        $validatedData = $request->validate([
            'livestock_ids' => 'required|array',
            'livestock_ids.*' => 'exists:livestock,id', // Ensure all livestock IDs exist
            'criteria.species' => 'nullable|exists:species,id',
            'criteria.breed' => 'nullable|string',
            'criteria.ageRange' => 'nullable|string',
            'criteria.weightRange' => 'nullable|string',
        ]);

        // Attach livestock to the group
        foreach ($validatedData['livestock_ids'] as $livestockId) {
            $group->livestock()->attach($livestockId, [
                'species_id' => $validatedData['criteria']['species'] ?? null,
                'breed' => $validatedData['criteria']['breed'] ?? null,
                'age_range' => $validatedData['criteria']['ageRange'] ?? null,
                'weight_range' => $validatedData['criteria']['weightRange'] ?? null,
            ]);
        }

        return response()->json(['message' => 'Livestock added to group successfully']);
    }

    //Sync Criteria with Livestock Group 

    public function updateLivestockGroup(Request $request, $id)
    {
        $livestockGroup = LivestockGroup::findOrFail($id);

        // Update group details
        $livestockGroup->update($request->only(['name', 'description']));

        // Sync group criteria (replace existing relations with new ones)
        $criteriaIds = $request->input('criteria_ids', []);  // Get criteria IDs from the request
        $livestockGroup->groupCriteria()->sync($criteriaIds);

        return redirect()->route('livestock_groups.show', $livestockGroup->id);
    }


    // public function storePivot(Request $request)
    // {
    //     // Validate incoming request data
    //     $validator = Validator::make($request->all(), [
    //         'name' => 'required|string|max:255',
    //         'description' => 'nullable|string',
    //         'selectedCriteria' => 'required|array',
    //         'selectedCriteria.*' => 'exists:group_criteria,id', // Ensure selected criteria exist
    //     ]);

    //     // If validation fails, return an error response
    //     if ($validator->fails()) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => $validator->errors()
    //         ], 400);
    //     }

    //     try {
    //         // Create a new livestock group
    //         $livestockGroup = LivestockGroup::create([
    //             'name' => $request->input('name'),
    //             'description' => $request->input('description'),
    //         ]);

    //         // Attach selected criteria to the livestock group
    //         $livestockGroup->criteria()->attach($request->input('selectedCriteria'));

    //         // Return a success response
    //         return response()->json([
    //             'success' => true,
    //             'message' => 'Livestock group created successfully',
    //             'data' => $livestockGroup,
    //         ], 201);
    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Failed to create livestock group: ' . $e->getMessage()
    //         ], 500);
    //     }
    // }

    public function storePivot(Request $request)
    {
        // Validate incoming request data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'selectedCriteria' => 'required|array',
            'selectedCriteria.*' => 'exists:group_criteria,id', // Ensure selected criteria exist
        ]);

        // If validation fails, return an error response
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 400);
        }

        try {
            // Create a new livestock group
            $livestockGroup = LivestockGroup::create([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
            ]);

            // Attach selected criteria to the livestock group
            $livestockGroup->criteria()->attach($request->input('selectedCriteria'));

            // Return a success response
            return response()->json([
                'success' => true,
                'message' => 'Livestock group created successfully',
                'data' => $livestockGroup,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create livestock group: ' . $e->getMessage()
            ], 500);
        }
    }
}
