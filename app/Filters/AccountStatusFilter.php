<?php

namespace App\Filters;

use Illuminate\Contracts\Database\Eloquent\Builder;

class AccountStatusFilter
{
    private $handlers = [];

    public function __construct(public ?string $status)
    {
        $this->handlers = [
            'unverified' => fn (Builder $builder) => $builder->whereNull('email_verified_at'),
            'verified' => fn (Builder $builder) => $builder->whereNotNull('email_verified_at'),
            '__fail' => fn (Builder $builder) => $builder->whereRaw('FALSE'),
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
        if (!$this->status || $this->status === 'all') return;

        $fallbackHandler = $this->handlers['__fail'];
        $handler = $this->handlers[$this->status] ?? $fallbackHandler;

        $handler($builder);
    }
}
