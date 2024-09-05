<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function listInventory()
    {
        $inventories = Inventory::with('location')->get();
        return response()->json($inventories);
    }

    public function storeInventory(Request $request)
    {
        $request->validate([
            'location_id' => 'required|exists:locations,id',
            'total_count' => 'required|integer'
        ]);

        $inventory = Inventory::create($request->all());
        return response()->json($inventory, 201);
    }

    public function showInventory($id)
    {
        $inventory = Inventory::with('location')->findOrFail($id);
        return response()->json($inventory);
    }

    public function updateInventory(Request $request, $id)
    {
        $inventory = Inventory::findOrFail($id);
        $inventory->update($request->all());
        return response()->json($inventory, 200);
    }

    public function destroyInventory($id)
    {
        Inventory::destroy($id);
        return response()->json(null, 204);
    }
}
