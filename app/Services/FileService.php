<?php

namespace App\Services;

use Illuminate\Contracts\Database\Eloquent\Builder;
use App\Filters\FilterPipeline;
use App\Filters\SearchQueryFilter;
use App\Filters\VisibilityFilter;
use App\Filters\OrderByFilter;
use App\Models\User;

class FileService
{
    /**
     * Index the User's files.
     *
     * @param \App\Models\User $user
     * @param array $queryParams
     *
     * @return \Illuminate\Contracts\Database\Eloquent\Builder;
     */
    public function index(User $user, array $queryParams): Builder
    {
        $filesQuery = $user->files();

        $pipeline = new FilterPipeline(builder: $filesQuery);
        $pipeline->run(
            new SearchQueryFilter(
                searchQuery: $queryParams['query'] ?? null,
                column: 'name'
            ),
            new VisibilityFilter(visibility: $queryParams['visibility'] ?? null),
            new OrderByFilter(
                orderBy: $queryParams['order_by'] ?? null,
                default: 'newest',
            ),
        );

        return $filesQuery;
    }
}
