<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Home</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

        <link rel="stylesheet" href="{{ asset('css/app.css') }}">

    </head>
    <body class="antialiased">
        <h1>Homepage</h1>

        @auth 
            <a href="{{ route('dashboard') }}">Dashboard</a>
        @endauth

        @guest
            <a href="{{ route('login') }}" class="greybtn">Login</a>
            <a href="{{ route('signup') }}" class="greybtn">Create an account</a>
        @endguest
    </body>
</html>
