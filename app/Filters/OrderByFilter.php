<?php

namespace App\Filters;

use Illuminate\Contracts\Database\Eloquent\Builder;

class OrderByFilter
{
    private array $handlers = [];

    public function __construct(
        public ?string $orderBy,
        public string $defaultValue,
        public ?string $column = null
    ) {
        $this->handlers = [
            'newest' => fn (Builder $builder) => $builder->latest(),
            'oldest' => fn (Builder $builder) => $builder->oldest(),
            'atoz' => function (Builder $builder) use ($column) {
                if (!$column) return;

                $builder->orderBy($column, 'asc');
            },
            'ztoa' => function (Builder $builder) use ($column) {
                if (!$column) return;

                $builder->orderBy($column, 'desc');
            },
        ];
    }

    /**
     * Applies the filter on the provided query builder.
     *
     * @param \Illuminate\Contracts\Database\Eloquent\Builder $builder
     *
     * @return void
     */
    public function apply(Builder $builder): void
    {
        $defaultHandler = $this->handlers[$this->defaultValue] ?? null;
        $handler = $this->handlers[$this->orderBy] ?? $defaultHandler;

        if ($handler) $handler($builder);
    }
}
