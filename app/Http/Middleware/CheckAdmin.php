<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CheckAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->routeIs('home')) {
            return $next($request);
        }
        if($request->routeIs('dashboard') || $request->routeIs('order')){
            if (Auth::check() && Auth::user()->is_admin) {
                return $next($request);
            }
            return redirect()->route('home');
        }
        return $next($request);
    }
}
