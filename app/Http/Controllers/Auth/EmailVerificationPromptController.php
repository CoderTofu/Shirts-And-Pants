<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
    /**
     * Display the email verification prompt.
     */
    public function __invoke(Request $request): RedirectResponse|Response
    {
        $user = $request->user();
        $route = route($user->is_admin ? 'dashboard' : 'home', absolute: false);
        return $request->user()->hasVerifiedEmail()
                    ? redirect()->intended( redirect()->intended($route))
                    : Inertia::render('Auth/VerifyEmail', ['status' => session('status')]);
    }
}
