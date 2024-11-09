class Fibonacci {
    static recursive(n){
        if(n <= 1) return n;
        return Fibonacci.recursive(n-1) + Fibonacci.recursive(n-2);
    }

    static iterative(n){
        if (n <= 1) return n;

        let prev = 0, curr = 1;
        for(let i=2; i <= n; i++){
            let temp = curr;
            curr = prev + curr;
            prev = temp;
        }
        return curr;
    }

    // Dynamic Programming (Memoization)
    static dpMemoization(n, memo = {}){
        if (n <= 1) return n;

        if(memo[n]) return memo[n];
        memo[n] = Fibonacci.dpMemoization(n-1, memo) + Fibonacci.dpMemoization(n-2, memo);
        return memo[n];
    }

    // Dynamic Programming (Bottom-Up)
    static bottomUp(n){
        if (n <= 1) return n;

        const dp = [0, 1];
        for(let i=2; i<=n; i++){
            dp[i] = dp[i-1] + dp[i-2];
        }
        return dp[n];
    }
}

console.log("Recursive:", Fibonacci.recursive(6));         // Output: 8
console.log("Iterative:", Fibonacci.iterative(6));         // Output: 8
console.log("DP Memoization:", Fibonacci.dpMemoization(6));// Output: 8
console.log("Bottom-Up:", Fibonacci.bottomUp(6));          // Output: 8