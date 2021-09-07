<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Login</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

        <link rel="stylesheet" href="{{ asset('css/app.css') }}">

    </head>
    <body class="antialiased">
        <h1> Login </h1>

        @if(session('status'))
            <div class="text-red">
                {{ session('status') }}
            </div>
        @endif

        <form action="{{ route('login') }}" method="post">
            @csrf
            <div>
                <label for="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Your email" class="@error('email') border-red @enderror" value="{{ old('email') }}">

                @error('email')
                    <div class="text-red">
                        {{ $message }}
                    </div>
                @enderror
            </div>

            <div>
                <label for="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Your password" class="@error('password') border-red @enderror">

                @error('password')
                    <div class="text-red">
                        {{ $message }}
                    </div>
                @enderror
            </div>

            <div>
                <input type="checkbox" name="remember" id="remember">
                <label for="remember">Remember me</label>
            </div>

            <button type="submit">Login</button>
        </form>
    </form>
    </body>
</html>
