<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\Privilege;
use Illuminate\Http\Request;

class RolePrivilegeController extends Controller
{
    /**
     * Display privileges assigned to a specific role.
     */
    public function listRolePrivileges($roleId)
    {
        $role = Role::with('privileges')->find($roleId);

        if (!$role) {
            return response()->json(['message' => 'Role not found'], 404);
        }

        return response()->json($role->privileges, 200);
    }

    /**
     * Assign a privilege to a role.
     */
    public function assignPrivilegeToRole(Request $request)
    {
        $request->validate([
            'role_id' => 'required|exists:roles,id',
            'privilege_id' => 'required|exists:privileges,id',
        ]);

        $role = Role::find($request->role_id);
        $privilege = Privilege::find($request->privilege_id);

        if ($role->privileges()->where('privilege_id', $privilege->id)->exists()) {
            return response()->json(['message' => 'Privilege already assigned to role'], 400);
        }

        $role->privileges()->attach($privilege->id);

        return response()->json(['message' => 'Privilege assigned successfully'], 200);
    }

    /**
     * Remove a privilege from a role.
     */
    public function removePrivilegeFromRole(Request $request)
    {
        $request->validate([
            'role_id' => 'required|exists:roles,id',
            'privilege_id' => 'required|exists:privileges,id',
        ]);

        $role = Role::find($request->role_id);
        $privilege = Privilege::find($request->privilege_id);

        if (!$role->privileges()->where('privilege_id', $privilege->id)->exists()) {
            return response()->json(['message' => 'Privilege not assigned to role'], 400);
        }

        $role->privileges()->detach($privilege->id);

        return response()->json(['message' => 'Privilege removed successfully'], 200);
    }
}
