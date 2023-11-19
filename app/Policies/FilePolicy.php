<?php

namespace App\Policies;

use App\Models\File;
use App\Models\User;

class FilePolicy
{
    public function view(User $user, File $file): bool
    {
        return $file->user_id === $user->id;
    }

    public function edit(User $user, File $file): bool
    {
        return $file->user_id === $user->id;
    }
}
