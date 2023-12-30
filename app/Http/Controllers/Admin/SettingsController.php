<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateAdminSettingsRequest;
use Inertia\Inertia;

class SettingsController extends Controller
{
    private $valuestore;

    public function __construct()
    {
        $this->valuestore = admin_settings();
    }

    public function show()
    {
        /**
         * Convert boolean values to "0" or "1" to comply with the FormRequest boolean validation rule.
         * I hate this, so I'm going to work on a better solution soon.
         */
        $settings = [
            'enable_user_registration' => $this->valuestore->get(
                'enable_user_registration',
                (string)(int)false
            ),
            'show_home_page' => $this->valuestore->get(
                'show_home_page',
                (string)(int)true
            ),
        ];

        return Inertia::render('Admin/Settings', [
            'settings' => $settings
        ]);
    }

    public function update(UpdateAdminSettingsRequest $request)
    {
        $validated = $request->validated();
        $this->valuestore->put($validated);

        return back();
    }
}
