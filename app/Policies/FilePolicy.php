<?php

namespace App\Policies;

use App\Models\File;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class FilePolicy
{
    public function view(User $user, File $file): Response
    {
        return $user->is($file->user) 
            ? Response::allow()
            : Response::denyAsNotFound();
    }

    public function edit(User $user, File $file): Response
    {
        return $this->view(user: $user, file: $file);
    }

    public function destroy(User $user, File $file): Response
    {
        return $this->edit(user: $user, file: $file);
    }
}
