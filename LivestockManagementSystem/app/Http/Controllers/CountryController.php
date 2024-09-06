<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    public function listCountry()
    {
        return Country::all();
    }

    public function storeCountry(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|unique:countries|max:100',
            'iso_code' => 'required|unique:countries|max:3',
        ]);

        return Country::create($validated);
    }

    public function updateCountry(Request $request, Country $country)
    {
        $validated = $request->validate([
            'name' => 'required|max:100|unique:countries,name,' . $country->id,
            'iso_code' => 'required|max:3|unique:countries,iso_code,' . $country->id,
        ]);

        $country->update($validated);

        return $country;
    }

    public function destroyCountry(Country $country)
    {
        $country->delete();

        return response()->noContent();
    }
}
