<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Dashboard</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

        <link rel="stylesheet" href="{{ asset('css/dashboard.css') }}">

    </head>
    <body class="antialiased">
        <!--<h1>Dashboard</h1>
        <p>Welcome {{ auth()->user()->name }}</p>-->

        <div id="nav-bar">
            <div class="container">
                <ul class="float-left">
                    <li class="logo"><span>Sole Trader Books</span></li>
                </ul>
    
                <ul class="float-right">
                    <li class="user">
                        <!--<span>Matthew</span>
                        <i class="white-arrow down"></i>-->
                    </li>
                </ul>
            </div>
        </div>
    
        <div id="transaction-stats">
            <div class="container">
                <span class="title">Transactions</span>
                
                <div class="business-profits">
                    <span class="value">£1143.54</span>
                    <span class="value-title">Profits / Losses</span>
                </div>
               
                <div class="business-incomes">
                    <span class="value">£1221.54</span>
                    <span class="value-title">Business Income</span>
                </div>
                
                <div class="business-expenses">
                    <span class="value">-£78</span>
                    <span class="value-title">Business Expenses</span>
                </div>
            </div>
        </div>
    
        <div id="add-transactions-box">
            <div class="container">
                <span>Add a Transaction:</span>
                <form action="">
                    <label for="name">Name:</label>
                    <input type="text" placeholder="Name" name="name"><br>
                    <label for="amount">Amount:</label>
                    <input type="text" placeholder="Amount" name="amount"><br>
                    <label for="date">Date:</label>
                    <input type="date" name="date"><br>
                    <label for="category">Category:</label>
                    <input type="text" placeholder="Category" name="category"><br>
                    <label for="tags">Tags:</label>
                    <input type="text" placeholder="Tags" name="tags"><br>
    
                    <input type="submit" value="Add Transaction">
                </form>
            </div>
        </div>
    
        <div id="transactions-edit-bar">
            <div class="container">
                <input type="button" value="Add Transaction" class="button">
    
                <div id="edit-buttons">
                    <input type="button" value="Edit Transaction" class="button">
                    <input type="button" value="Delete Transaction" class="button">
                </div>
            </div>
        </div>
    
        <div id="transactions">
            <div class="container">
                <table id="transactions-table">
                    <tr>
                        <td><input type="checkbox"></td>
                        <th>Date</th>
                        <th>Transaction</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Tags</th>
                    </tr>
    
                    <tr>
                        <td><input type="checkbox"></td>
                        <td contenteditable='true'>01/09/2021</td>
                        <td contenteditable='true'>Audible Publishing</td>
                        <td contenteditable='true'>£1221.54</td>
                        <td contenteditable='true'>Income</td>
                        <td contenteditable='true'>Publishing</td>
                        <td><i class="arrow right"></i></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td contenteditable='true'>01/09/2021</td>
                        <td contenteditable='true'>Blogging</td>
                        <td contenteditable='true'>-£78</td>
                        <td contenteditable='true'>Expense</td>
                        <td contenteditable='true'>Blogging</td>
                        <td><i class="arrow right"></i></td>
                    </tr>
                </table>
            </div>
        </div>
    
        <div id="utility-bar">
            <div class="container">
                <!--<button class="button">Import Transactions</button>-->
                <input type="button" class="button" onclick="tableToExcel('transactions-table', 'name', 'myfile.xls')" value="Download Report">
            </div>
        </div>
        
        <!--<script src="javascript/jquery-3.6.0.js"></script>
        <script src="javascript/scripts.js"></script>-->



        <form action="{{ route('logout') }}" method="post">
            @csrf
            <button type="submit">Logout</button>
        </form>
    </body>
</html>
