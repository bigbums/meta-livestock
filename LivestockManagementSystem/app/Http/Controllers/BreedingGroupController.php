<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BreedingGroup;
use App\Models\BreedingProgram;
use Illuminate\Support\Facades\Validator;

// class BreedingGroupController extends Controller
// {
// public function index()
// {
//     // Fetch all breeding groups, including the related breeding program name
//     $breedingGroups = BreedingGroup::with('breedingProgram')->get();
//     return response()->json($breedingGroups);
// }

//     /**
//      * Store a newly created breeding group in storage.
//      */
//     public function store(Request $request)
//     {
//         // Validation rules
//         $validator = Validator::make($request->all(), [
//             'breeding_group_name' => 'required|string|max:255',
//             'breeding_program_id' => 'nullable|exists:breeding_programs,id',
//             'start_date' => 'required|date',
//             'male_count' => 'nullable|integer',
//             'female_count' => 'nullable|integer',
//             'end_date'  => 'nullable|date',
//             'location' => 'nullable|string|max:255',
//             'group_type' => 'required|string|in:pair,multi',
//             'notes' => 'nullable|string',
//         ]);

//         if ($validator->fails()) {
//             return response()->json(['errors' => $validator->errors()], 422);
//         }

//         // Create and save the breeding group
//         $breedingGroup = new BreedingGroup();
//         $breedingGroup->group_name = $request->group_name;
//         $breedingGroup->breeding_program_id = $request->breeding_program_id;
//         $breedingGroup->group_type = $request->group_type;
//         $breedingGroup->description = $request->description;
//         $breedingGroup->save();

//         return response()->json($breedingGroup, 201);
//     }

//     /**
//      * Display the specified breeding group.
//      */
// public function show($id)
// {
//     // Fetch a specific breeding group by ID, with the related breeding program
//     $breedingGroup = BreedingGroup::with('breedingProgram')->find($id);

//     if (!$breedingGroup) {
//         return response()->json(['error' => 'Breeding group not found'], 404);
//     }

//     return response()->json($breedingGroup);
// }

//     /**
//      * Update the specified breeding group in storage.
//      */
// public function update(Request $request, $id)
// {
//     // Validation rules
//     $validator = Validator::make($request->all(), [
//         'breeding_group_name' => 'required|string|max:255',
//         'breeding_program_id' => 'required|exists:breeding_programs,id',
//         'start_date' => 'required|date',
//         'male_count' => 'nullable|integer',
//         'female_count' => 'nullable|integer',
//         'end_date'  => 'nullable|date',
//         'location' => 'nullable|string|max:255',
//         'group_type' => 'required|string|in:pair,multi',
//         'notes' => 'nullable|string',
//     ]);

//     if ($validator->fails()) {
//         return response()->json(['errors' => $validator->errors()], 422);
//     }

//     // Find the existing breeding group
//     $breedingGroup = BreedingGroup::find($id);
//     if (!$breedingGroup) {
//         return response()->json(['error' => 'Breeding group not found'], 404);
//     }

//     // Update breeding group details
//     $breedingGroup->group_name = $request->group_name;
//     $breedingGroup->breeding_program_id = $request->breeding_program_id;
//     $breedingGroup->group_type = $request->group_type;
//     $breedingGroup->description = $request->description;
//     $breedingGroup->save();

//     return response()->json($breedingGroup);
// }

//     /**
//      * Remove the specified breeding group from storage.
//      */
// public function destroy($id)
// {
//     // Find the breeding group by ID and delete it
//     $breedingGroup = BreedingGroup::find($id);
//     if (!$breedingGroup) {
//         return response()->json(['error' => 'Breeding group not found'], 404);
//     }

//     $breedingGroup->delete();
//     return response()->json(['message' => 'Breeding group deleted successfully']);
// }

//     /**
//      * Fetch breeding programs for dropdown selection.
//      */
// public function getBreedingPrograms()
// {
//     // Retrieve all breeding programs for use in dropdown
//     $breedingPrograms = BreedingProgram::select('id', 'breeding_program_name')->get();
//     return response()->json($breedingPrograms);
// }
// }



class BreedingGroupController extends Controller
{
    /**
     * Store a new breeding group.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */

    // public function index()
    // {
    //     // Fetch all breeding groups, including the related breeding program name
    //     $breedingGroups = BreedingGroup::with('breedingProgram')->get();
    //     return response()->json($breedingGroups);
    // }
    // public function store(Request $request)
    // {
    //     // Validate incoming request data
    //     $request->validate([
    //         'breeding_group_name' => 'required|string|max:255',
    //         'group_type' => 'required|string|in:pair,multiple',
    //         'start_date' => 'required|date',
    //         'end_date' => 'required|date|after_or_equal:start_date',
    //         'male_count' => 'required|integer|min:0',
    //         'female_count' => 'required|integer|min:0',
    //         'location' => 'nullable|string|max:255',
    //         'notes' => 'nullable|string',
    //         'selectedLivestock' => 'nullable|array', // Expecting an array of selected livestock
    //     ]);

    //     // Create a new breeding group
    //     $breedingGroup = BreedingGroup::create($request->only([
    //         'breeding_group_name',
    //         'group_type',
    //         'start_date',
    //         'end_date',
    //         'male_count',
    //         'female_count',
    //         'location',
    //         'notes'
    //     ]));

    //     // // Attach selected livestock to the breeding group
    //     foreach ($request->selectedLivestock as $livestock) {
    //         $breedingGroup->livestocks()->attach($livestock['livestockId'], ['role' => $livestock['role']]);
    //     }
    //     $breedingGroup = $request->all();
    //     return response()->json($breedingGroup, 201); // Return created breeding group with 201 status code
    // }

    // public function show($id)
    // {
    //     // Fetch a specific breeding group by ID, with the related breeding program
    //     $breedingGroup = BreedingGroup::with('breedingProgram')->find($id);

    //     if (!$breedingGroup) {
    //         return response()->json(['error' => 'Breeding group not found'], 404);
    //     }

    //     return response()->json($breedingGroup);
    // }

    // public function update(Request $request, $id)
    // {
    //     // Validation rules
    //     $validator = Validator::make($request->all(), [
    //         'breeding_group_name' => 'required|string|max:255',
    //         'breeding_program_id' => 'required|exists:breeding_programs,id',
    //         'start_date' => 'required|date',
    //         'male_count' => 'nullable|integer',
    //         'female_count' => 'nullable|integer',
    //         'end_date'  => 'nullable|date',
    //         'location' => 'nullable|string|max:255',
    //         'group_type' => 'required|string|in:pair,multi',
    //         'notes' => 'nullable|string',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json(['errors' => $validator->errors()], 422);
    //     }

    //     // Find the existing breeding group
    //     $breedingGroup = BreedingGroup::find($id);
    //     if (!$breedingGroup) {
    //         return response()->json(['error' => 'Breeding group not found'], 404);
    //     }

    //     // Update breeding group details
    //     $breedingGroup->group_name = $request->group_name;
    //     $breedingGroup->breeding_program_id = $request->breeding_program_id;
    //     $breedingGroup->group_type = $request->group_type;
    //     $breedingGroup->description = $request->description;
    //     $breedingGroup->save();

    //     return response()->json($breedingGroup);
    // }

    // public function destroy($id)
    // {
    //     // Find the breeding group by ID and delete it
    //     $breedingGroup = BreedingGroup::find($id);
    //     if (!$breedingGroup) {
    //         return response()->json(['error' => 'Breeding group not found'], 404);
    //     }

    //     $breedingGroup->delete();
    //     return response()->json(['message' => 'Breeding group deleted successfully']);
    // }

    // public function getBreedingPrograms()
    // {
    //     // Retrieve all breeding programs for use in dropdown
    //     $breedingPrograms = BreedingProgram::select('id', 'breeding_program_name')->get();
    //     return response()->json($breedingPrograms);
    // }

    public function index()
    {
        $breedingGroups = BreedingGroup::with('livestocks')->get(); // Adjust based on your relationships
        return response()->json($breedingGroups);
    }

    /**
     * Store a newly created breeding group.
     */
    public function store(Request $request)
    {
        // Validate incoming request data
        $validator = Validator::make($request->all(), [
            'breeding_group_name' => 'required|string|max:255',
            'group_type' => 'required|string|in:pair,multiple',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'male_count' => 'required|integer|min:0',
            'female_count' => 'required|integer|min:0',
            'location' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'selectedLivestock' => 'nullable|array', // Expecting an array of selected livestock
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Create a new breeding group
        $breedingGroup = BreedingGroup::create($request->only([
            'breeding_group_name',
            'group_type',
            'start_date',
            'end_date',
            'male_count',
            'female_count',
            'location',
            'notes'
        ]));

        // Attach selected livestock to the breeding group if provided
        if ($request->selectedLivestock) {
            foreach ($request->selectedLivestock as $livestock) {
                $breedingGroup->livestocks()->attach($livestock['livestockId'], ['role' => $livestock['role']]);
            }
        }

        return response()->json($breedingGroup, 201); // Return created breeding group with 201 status code
    }

    /**
     * Delete a specified breeding group.
     */
    public function destroy($id)
    {
        $breedingGroup = BreedingGroup::find($id);
        if (!$breedingGroup) {
            return response()->json(['error' => 'Breeding group not found'], 404);
        }

        $breedingGroup->delete();
        return response()->json(['message' => 'Breeding group deleted successfully']);
    }

    public function show($id)
    {
        try {
            $breedingGroup = BreedingGroup::findOrFail($id);
            return response()->json($breedingGroup, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Breeding group not found'], 404);
        }
    }

    // Method to update a specific breeding group
    public function update(Request $request, $id)
    {
        try {
            $breedingGroup = BreedingGroup::findOrFail($id);
            $validatedData = $request->validate([
                'breeding_group_name' => 'required|string|max:255',
                'group_type' => 'required|string|in:pair,multiple',
                'start_date' => 'required|date',
                'end_date' => 'required|date|after_or_equal:start_date',
                'male_count' => 'required|integer|min:0',
                'female_count' => 'required|integer|min:0',
                'location' => 'nullable|string|max:255',
                'notes' => 'nullable|string',
            ]);

            $breedingGroup->update($validatedData);
            return response()->json($breedingGroup, 200); // Return updated breeding group
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update breeding group'], 400);
        }
    }
}
