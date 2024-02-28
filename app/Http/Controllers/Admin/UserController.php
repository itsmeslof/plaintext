<?php

namespace App\Http\Controllers\Admin;

use App\Filters\AccountStatusFilter;
use App\Filters\FilterPipeline;
use App\Filters\OrderByFilter;
use App\Filters\SearchQueryFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $usersQuery = User::query();

        $pipeline = new FilterPipeline(builder: $usersQuery);
        $pipeline->run(
            new SearchQueryFilter(
                searchQuery: $request->get('query'),
                columns: ['username', 'email'],
            ),
            new AccountStatusFilter(
                status: $request->get('account_status'),
            ),
            new OrderByFilter(
                orderBy: $request->get('order_by'),
                defaultValue: 'newest',
                column: value_or_default(
                    value: $request->get('order_by_column'),
                    allowedValues: ['username', 'email'],
                    defaultValue: 'username',
                ),
            )
        );

        $users = $usersQuery->paginate(10)->withQueryString();

        return Inertia::render('Admin/Users/Index', [
            'users' => UserResource::collection($users),
        ]);
    }

    public function show(Request $request, User $user)
    {
        return Inertia::render('Admin/Users/Show', [
            'viewingUser' => new UserResource($user),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Users/Create');
    }

    public function store(StoreUserRequest $request)
    {
        if ($request->user()->cannot('create', User::class)) {
            abort(403);
        }

        $newUser = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make(bin2hex(random_bytes(20)))
        ]);

        if ($request->verify_email_now) {
            $newUser->markEmailAsVerified();
        }

        event(new Registered($newUser));

        return to_route("admin.users.show", $newUser);
    }
}
