<?php

namespace App\Http\Controllers;

use App\Models\Privilege;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PrivilegeController extends Controller
{
    public function listPrivilege()
    {
        $privileges = Privilege::all();
        return response()->json($privileges, 200);
    }

    /**
     * Store a newly created privilege in storage.
     */
    public function storePrivilege(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:privileges,name',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $privilege = Privilege::create($request->all());

        return response()->json($privilege, 201);
    }

    /**
     * Display the specified privilege.
     */
    public function showPrivilege($id)
    {
        $privilege = Privilege::find($id);

        if (!$privilege) {
            return response()->json(['message' => 'Privilege not found'], 404);
        }

        return response()->json($privilege, 200);
    }

    /**
     * Update the specified privilege in storage.
     */
    public function updatePrivilege(Request $request, $id)
    {
        $privilege = Privilege::find($id);

        if (!$privilege) {
            return response()->json(['message' => 'Privilege not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:privileges,name,' . $id,
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $privilege->update($request->all());

        return response()->json($privilege, 200);
    }

    /**
     * Remove the specified privilege from storage.
     */
    public function destroyPrivilege($id)
    {
        $privilege = Privilege::find($id);

        if (!$privilege) {
            return response()->json(['message' => 'Privilege not found'], 404);
        }

        $privilege->delete();

        return response()->json(['message' => 'Privilege deleted successfully'], 200);
    }
}
