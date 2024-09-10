<?php

namespace App\Http\Controllers;

use App\Models\Audit;
use App\Models\Privilege;
// use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Http\Requests\StorePrivilegeRequest;
use App\Http\Requests\UpdatePrivilegeRequest;

class PrivilegeController extends Controller
{
    public function index()
    {
        $privileges = Privilege::all();
        return response()->json([
            'success' => true,
            'data' => $privileges
        ], 200);
    }

    /**
     * Store a newly created privilege in storage.
     */
    public function store(StorePrivilegeRequest $request)
    {
        $privilege = Privilege::create($request->validated());

        // Log the action in audit
        Audit::create([
            'user_id' => auth()->id(),
            'action' => 'Created Privilege',
            'auditable_type' => Privilege::class,
            'auditable_id' => $privilege->id,
            'description' => "Privilege '{$privilege->name}' was created.",
        ]);



        return response()->json([
            'success' => true,
            'message' => 'Privilege created successfully',
            'data' => $privilege
        ], 201);
    }

    /**
     * Display the specified privilege.
     */
    public function show(Privilege $privilege)
    {
        return response()->json([
            'success' => true,
            'data' => $privilege
        ], 200);
    }

    /**
     * Update the specified privilege in storage.
     */
    public function update(UpdatePrivilegeRequest $request, Privilege $privilege)
    {
        $privilege->update($request->validated());

        // Log the action in audit
        Audit::create([
            'user_id' => auth()->id(),
            'action' => 'Updated Privilege',
            'auditable_type' => Privilege::class,
            'auditable_id' => $privilege->id,
            'description' => "Privilege '{$privilege->name}' was updated.",
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Privilege updated successfully',
            'data' => $privilege
        ], 200);
    }

    /**
     * Remove the specified privilege from storage.
     */
    public function destroy(Privilege $privilege)
    {
        $privilegeName = $privilege->name; // Store the privilege name before deleting
        $privilege->delete();

        // Log the action in audit
        Audit::create([
            'user_id' => auth()->id(),
            'action' => 'Deleted Privilege',
            'auditable_type' => Privilege::class,
            'auditable_id' => $privilege->id,
            'description' => "Privilege '{$privilegeName}' was deleted.",
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Privilege deleted successfully'
        ], 200);
    }
}
