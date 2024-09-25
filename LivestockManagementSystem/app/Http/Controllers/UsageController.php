<?php

namespace App\Http\Controllers;

use App\Models\Usage;
use Illuminate\Http\Request;

class UsageController extends Controller
{
    public function index()
    {
        $usages = Usage::all();  // Fetch all usage entries
        return response()->json($usages);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $usage = Usage::create($validatedData);
        return response()->json($usage);
    }
}
