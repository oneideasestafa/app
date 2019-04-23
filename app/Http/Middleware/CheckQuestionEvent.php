<?php

namespace App\Http\Middleware;

use Closure, Auth;

class CheckQuestionEvent{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if( Auth::user()->isQuestionEvent() ) {
            return redirect()->route('question-event');
        }
        return $next($request);
    }
}
