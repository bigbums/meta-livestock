<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Validator;

use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Models\Audit;



class RoleController extends Controller
{
    /**
     * Display a listing of roles.
     */
    public function listRole()
    {
        // Use pagination to avoid loading all roles at once
        $roles = Role::paginate(10); // Adjust pagination limit as needed
        return response()->json($roles, 200);
    }

    /**
     * Store a newly created role in storage.
     */


    public function storeRole(StoreRoleRequest $request)
    {
        $role = Role::create($request->validated());
        // After role is created

        Audit::create([
            'user_id' => auth()->id(), // or the ID of the admin performing the action
            'action' => 'Created Role',
            'description' => "Role '{$role->name}' was created.",
        ]);
        return response()->json($role, 201);
    }

    /**
     * Display the specified role.
     */
    public function showRole(Role $role) // Using route model binding
    {
        return response()->json($role, 200);
    }

    /**
     * Update the specified role in storage.
     */
    public function updateRole(UpdateRoleRequest $request, Role $role)
    {
        $role->update($request->validated());
        return response()->json($role, 200);
    }

    /**
     * Remove the specified role from storage.
     */
    public function destroyRole(Role $role)
    {
        try {
            $role->delete();
            return response()->json(['message' => 'Role deleted successfully'], 200);
        } catch (\Exception $e) {
            // Handle foreign key constraint failure, etc.
            return response()->json(['message' => 'Error deleting role: ' . $e->getMessage()], 400);
        }
    }
}
