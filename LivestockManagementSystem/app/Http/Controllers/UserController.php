<?php

// app/Http/Controllers/UserController.php
namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use App\Models\Audit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the users.
     */
    public function listUser()
    {
        // Eager load the role for efficiency
        $users = User::with('role')->get();
        return response()->json($users, 200);
    }

    /**
     * Store a newly created user in storage.
     */
    public function storeUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'username' => 'required|string|max:20',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            //'role_id' => 'required|exists:roles,id', // Ensure role_id exists in roles table
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            //'role_id' => $request->role_id,
        ]);

        // Send email verification
        $user->sendEmailVerificationNotification();

        return response()->json(['message' => 'User created successfully. Please check your email to verify your account.'], 201);

        //return response()->json($user, 201);
    }


    /**
     * Activate user after email verification.
     */
    public function activate(Request $request)
    {
        $user = User::find($request->user()->id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->status = 'active';
        $user->save();

        return response()->json(['message' => 'User activated successfully'], 200);
    }


    /**
     * Activate a user manually by an admin.
     */
    public function activateUserByAdmin(Request $request, $id)
    {
        // Check if the authenticated user is an admin
        if ($request->user()->role->name !== 'Admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->status = 'active';
        $user->save();

        return response()->json(['message' => 'User activated successfully by admin'], 200);
    }

    /**
     * Deactivate a user manually by an admin.
     */
    public function deactivateUserByAdmin(Request $request, $id)
    {
        // Check if the authenticated user is an admin
        if ($request->user()->role->name !== 'Admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->status = 'inactive';
        $user->save();

        return response()->json(['message' => 'User deactivated successfully by admin'], 200);
    }


    /**
     * Display the specified user.
     */
    public function showUser($id)
    {
        $user = User::with('role')->find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user, 200);
    }

    /**
     * Update the specified user in storage.
     */
    public function updateUser(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'role_id' => 'required|exists:roles,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'role_id' => $request->role_id,
        ]);

        return response()->json($user, 200);
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroyUser($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully'], 200);
    }


    public function softDeleteUser($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();

        // Log the action in audit
        Audit::create([
            'user_id' => auth()->id(),
            'action' => 'Deleted User',
            'description' => "User '{$user->name}' was soft-deleted.",
        ]);

        return response()->json(['message' => 'User soft-deleted successfully'], 200);
    }

    public function restoreUser($id)
    {
        $user = User::withTrashed()->find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->restore();

        // Log the action in audit
        Audit::create([
            'user_id' => auth()->id(),
            'action' => 'Restored User',
            'description' => "User '{$user->name}' was restored.",
        ]);

        return response()->json(['message' => 'User restored successfully'], 200);
    }

    public function updateUserStatus(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $validated = $request->validate([
            'status' => 'required|in:active,inactive,banned', // Define allowed statuses
        ]);

        $user->update(['status' => $validated['status']]);

        // Log the action in audit
        Audit::create([
            'user_id' => auth()->id(),
            'action' => 'Updated User Status',
            'description' => "User '{$user->name}' status changed to '{$validated['status']}'.",
        ]);

        return response()->json(['message' => 'User status updated successfully'], 200);
    }
}
