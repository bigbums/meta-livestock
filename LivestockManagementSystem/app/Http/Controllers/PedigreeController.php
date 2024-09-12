<?php

namespace App\Http\Controllers;

use App\Models\Livestock;
use App\Models\Pedigree;
use Illuminate\Http\Request;

class PedigreeController extends Controller
{
    /**
     * Store a newly created pedigree in storage.
     */
    public function storePedigree(Request $request, $livestockId)
    {
        $validated = $request->validate([
            'sire_id' => 'nullable|exists:livestock,id',
            'dam_id' => 'nullable|exists:livestock,id',
            'generation' => 'nullable|string',
        ]);

        $livestock = Livestock::findOrFail($livestockId);
        $pedigree = $livestock->pedigree()->create($validated);

        return response()->json($pedigree, 201);
    }

    /**
     * Update an existing pedigree record.
     */
    public function updatePedigree(Request $request, $livestockId)
    {
        $livestock = Livestock::findOrFail($livestockId);
        $pedigree = $livestock->pedigree;

        if (!$pedigree) {
            return response()->json(['message' => 'Pedigree not found for this livestock'], 404);
        }

        $validated = $request->validate([
            'sire_id' => 'nullable|exists:livestock,id',
            'dam_id' => 'nullable|exists:livestock,id',
            'generation' => 'nullable|string',
        ]);

        $pedigree->update($validated);

        return response()->json($pedigree, 200);
    }

    /**
     * Display the pedigree of a specific livestock.
     */
    public function showPedigree($livestockId)
    {
        $livestock = Livestock::with('pedigree.sire', 'pedigree.dam')->findOrFail($livestockId);
        return response()->json($livestock->pedigree, 200);
    }
}
