<?php

use Spatie\Valuestore\Valuestore;

if (!function_exists('admin_settings')) {
    function admin_settings()
    {
        return Valuestore::make(storage_path('app\\settings.json'));
    }
}
