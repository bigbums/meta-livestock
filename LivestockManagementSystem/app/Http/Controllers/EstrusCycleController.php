<?php

namespace App\Http\Controllers;

use App\Models\EstrusCycle;
use Illuminate\Http\Request;

class EstrusCycleController extends Controller
{
    public function index()
    {
        $estrusCycles = EstrusCycle::all();
        return response()->json($estrusCycles);
    }

    public function store(Request $request)
    {
        $estrusCycle = EstrusCycle::create($request->all());
        return response()->json($estrusCycle);
    }

    public function show($id)
    {
        $estrusCycle = EstrusCycle::find($id);
        return response()->json($estrusCycle);
    }

    public function update(Request $request, $id)
    {
        $estrusCycle = EstrusCycle::find($id);
        $estrusCycle->update($request->all());
        return response()->json($estrusCycle);
    }

    public function destroy($id)
    {
        $estrusCycle = EstrusCycle::find($id);
        $estrusCycle->delete();
        return response()->json(['message' => 'Estrus cycle deleted']);
    }
}
