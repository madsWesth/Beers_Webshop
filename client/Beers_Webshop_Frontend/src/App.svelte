<script>
	import { Router, Link, Route } from "svelte-navigator";
	import Home from "./pages/Home.svelte";
	import Products from "./pages/Products.svelte";
	import Login from "./pages/Login.svelte";
	import { cart, loggedInStatus } from "./stores/user.js";
	import { backendURL } from "./stores/general.js";
	import { SvelteToast, toast } from "@zerodevx/svelte-toast"
	import Signup from "./pages/Signup.svelte";
	import Cart from "./pages/Cart.svelte";

	const logOut = async () => {
		const res = await fetch($backendURL + "auth/logout", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			}
		})
		if (res.ok) {
			const data = await res.json();
			$loggedInStatus = data.isLoggedIn
			toast.push("Logged Out")
		}
	}

</script>

<Router>
	<main>
		<SvelteToast/>
		<nav>
			<Link to="/">Home</Link>
			<Link to="products">Products</Link>

			{#if !$loggedInStatus}
				<Link to="login">Login</Link>
				<Link to="signup">Sign up</Link>
			{:else}
				<a on:click={logOut}>Logout</a>
			{/if}
		</nav>
		<Link to="cart">
			<div class="cart">
				<img class="cart-icon" src="https://cdn3.iconfinder.com/data/icons/e-commerce-2-2/380/1-512.png" alt="cart">
				<span>{$cart.length}</span>
			</div>
		</Link>
		<div>
			<Route path="/" component={Home} />
			<Route path="products" component={Products} />
			<Route path="login" component={Login} />
			<Route path="signup" component={Signup} />
			<Route path="cart" component={Cart} />
		</div>
	</main>
</Router>

<footer>
	<p>©2022</p>
</footer>

<style>
	nav {
		display: flex;
		justify-content: space-evenly;
	}

	.cart{
		position: sticky;
		top: 0;
	}

	.cart-icon{
		height: 4em;
		width: 4em;
	}

	main{
		min-height: calc(100vh - 2.8em);
	}

	footer{
		background-color: grey;
	}
</style>
