<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    public function verify(User $user, User $model): bool
    {
        return $user->is_admin || $user->id === $model->id;
    }

    public function destroy(User $user, User $model): bool
    {
        return $user->is_admin;
    }
}
