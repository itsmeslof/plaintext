<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAdminSettingsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->is_admin;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'enable_user_registration' => ['sometimes', 'required', 'boolean'],
            'show_home_page' => ['sometimes', 'required', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'enable_user_registration.boolean' => 'The user registration field must be "active" or "inactive"',
            'show_home_page.boolean' => 'The home page field must be "active" or "inactive"'
        ];
    }
}
