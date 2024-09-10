<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePrivilegeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // return true; // Adjust authorization logic if needed

        return Auth::user()->role === 'admin';
        // return auth()->user->role === 'admin';
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        // Get the privilege ID from the route
        $privilegeId = $this->route('privilege')->id;

        return [
            'name' => 'required|string|unique:privileges,name,' . $this->route('privilege')->id,
            'description' => 'nullable|string',
        ];
    }
}
