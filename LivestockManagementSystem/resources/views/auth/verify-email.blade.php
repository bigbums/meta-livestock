// resources/views/auth/verify-email.blade.php

@extends('layouts.app')

@section('content')
<div class="container">
    <div class="alert alert-info">
        Please verify your email address by clicking on the link we just emailed to you. If you didn’t receive the email, we can send you another.
    </div>

    @if (session('message'))
        <div class="alert alert-success">
            {{ session('message') }}
        </div>
    @endif

    <form method="POST" action="{{ route('verification.resend') }}">
        @csrf
        <button type="submit" class="btn btn-primary">Resend Verification Email</button>
    </form>
</div>
@endsection
