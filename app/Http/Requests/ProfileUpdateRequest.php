<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => [
                'required', 
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'username'=> [
                'required',
                'string',
                'max:16',
                'regex:/^[a-zA-Z0-9.\-_$@*!]{1,16}$/',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'phone' => [
                'string', 'max:11', 'regex:/^09\d{9}$/'
            ],
            'address' => [
                'string', 'max:255'
            ]
        ];
    }
}
