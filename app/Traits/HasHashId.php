<?php

namespace App\Traits;

use App\HashIdOptions;
use Illuminate\Database\Eloquent\Model;
use Vinkla\Hashids\Facades\Hashids;

trait HasHashId
{
    abstract public function getHashIdOptions(): HashIdOptions;

    protected static function bootHasHashId(): void
    {
        static::created(
            fn (Model $model) => $model->generateHashId()
        );
    }

    protected function generateHashId(): void
    {
        $options = $this->getHashIdOptions();

        $this->hashid = Hashids::connection($options->connection)->encode($options->values);

        $this->saveQuietly();
    }
}
