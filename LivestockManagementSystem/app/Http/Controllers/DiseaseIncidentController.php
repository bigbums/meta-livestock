<?php

// app/Http/Controllers/DiseaseIncidentController.php

namespace App\Http\Controllers;

use App\Models\DiseaseIncident;
use App\Models\HealthRecord;
use Illuminate\Http\Request;

class DiseaseIncidentController extends Controller
{

    // This disease incident controller will be integrated with machine learning models for early detection,
    // monitoring  and control of animal diseases
    public function index($healthRecordId)
    {
        $healthRecord = HealthRecord::findOrFail($healthRecordId);
        return response()->json($healthRecord->diseaseIncidents);
    }

    public function store(Request $request, $healthRecordId)
    {
        $healthRecord = HealthRecord::findOrFail($healthRecordId);
        $diseaseIncident = $healthRecord->diseaseIncidents()->create($request->all());

        return response()->json($diseaseIncident, 201);
    }

    public function show($id)
    {
        $diseaseIncident = DiseaseIncident::findOrFail($id);
        return response()->json($diseaseIncident);
    }

    public function update(Request $request, $id)
    {
        $diseaseIncident = DiseaseIncident::findOrFail($id);
        $diseaseIncident->update($request->all());

        return response()->json($diseaseIncident);
    }

    public function destroy($id)
    {
        $diseaseIncident = DiseaseIncident::findOrFail($id);
        $diseaseIncident->delete();

        return response()->json(['message' => 'Disease incident deleted successfully']);
    }
}
