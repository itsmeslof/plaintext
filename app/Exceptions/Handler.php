<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\HttpException;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->renderable(function (HttpException $e, Request $request) {
            $statusCode = $e->getStatusCode();
            $prod = App::environment('production');

            if ($statusCode === 419) {
                return back()->with([
                    'error' => 'Your page session has expired, please reload the page and try again.'
                ]);
            }

            if (!$prod) return;

            return Inertia::render('Error', ['status' => $statusCode])
                ->toResponse($request)
                ->setStatusCode($statusCode);;
        });
    }
}
