<?php

use Spatie\Valuestore\Valuestore;

if (!function_exists('admin_settings')) {
    function admin_settings()
    {
        return Valuestore::make(storage_path('app\\settings.json'));
    }
}

if (!function_exists('value_or_default')) {
    function value_or_default($value, array $allowedValues, $defaultValue)
    {
        return in_array($value, $allowedValues) ? $value : $defaultValue;
    }
}
