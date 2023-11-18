<?php

namespace App\Http\Requests;

use App\SupportedFileLanguages;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreFileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'extension' => ['required', Rule::in(['.md', '.txt'])],
            'contents' => ['required', 'string'],
            'visibility' => ['required', Rule::in(['private', 'unlisted', 'public'])],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'A file name is required',
            'contents.required' => 'The file\'s contents can not be empty'
        ];
    }
}
