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
        $this->filterFiles(
            builder: $filesQuery,
            queryParams: $queryParams
        );

        return $filesQuery;
    }

    /**
     * Index the User's public files.
     *
     * @param \App\Models\User $user
     * @param array $queryParams
     *
     * @return \Illuminate\Contracts\Database\Eloquent\Builder;
     */
    public function indexPublic(User $user, array $queryParams): Builder
    {
        $publicFilesQuery = $user->publicFiles();
        $this->filterFiles(
            builder: $publicFilesQuery,
            queryParams: $queryParams
        );

        return $publicFilesQuery;
    }

    /**
     * Apply base filters for file queries.
     *
     * @param \Illuminate\Contracts\Database\Eloquent\Builder $builder
     *
     * @return void
     */
    private function filterFiles(Builder $builder, array $queryParams): void
    {
        $pipeline = new FilterPipeline(builder: $builder);
        $pipeline->run(
            new SearchQueryFilter(
                searchQuery: $queryParams['query'] ?? null,
                column: 'name'
            ),
            new VisibilityFilter(
                visibility: $queryParams['visibility'] ?? null
            ),
            new OrderByFilter(
                orderBy: $queryParams['order_by'] ?? null,
                defaultValue: 'newest',
            ),
        );
    }
}
