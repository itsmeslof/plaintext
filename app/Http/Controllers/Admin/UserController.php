<?php

namespace App\Http\Controllers\Admin;

use App\Filters\AccountStatusFilter;
use App\Filters\FilterPipeline;
use App\Filters\OrderByFilter;
use App\Filters\SearchQueryFilter;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
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
}
