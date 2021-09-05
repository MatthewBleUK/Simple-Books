<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Register</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

        <link rel="stylesheet" href="{{ asset('css/app.css') }}">

    </head>
    <body class="antialiased">
        <h1> Register </h1>

        <form action="{{ route('register') }}" method="post">
            @csrf
            <div>
                <label for="name">Name</label>
                <input type="text" name="name" id="name" placeholder="Your name" class="@error('name') border-red @enderror" value="{{ old('name') }}">

                @error('name')
                    <div class="text-red">
                        {{ $message }}
                    </div>
                @enderror
            </div>

            <div>
                <label for="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Your email" class="@error('name') border-red @enderror" value="{{ old('email') }}">

                @error('email')
                    <div class="text-red">
                        {{ $message }}
                    </div>
                @enderror
            </div>

            <div>
                <label for="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Your password" class="@error('name') border-red @enderror">

                @error('password')
                    <div class="text-red">
                        {{ $message }}
                    </div>
                @enderror
            </div>

            <div>
                <label for="password_confirmation">Confirm Password</label>
                <input type="password" name="password_confirmation" id="password_confirmation" placeholder="Confirm your password" class="@error('name') border-red @enderror">
                
                @error('password_confirmation')
                    <div class="text-red">
                        {{ $message }}
                    </div>
                @enderror
            </div>

            <button type="submit">Register</button>
        </form>
    </form>
    </body>
</html>
