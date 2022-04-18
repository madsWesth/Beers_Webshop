<script>
	import { Router, Link, Route } from "svelte-navigator";
	import Home from "./pages/Home.svelte";
	import Products from "./pages/Products.svelte";
	import Login from "./pages/Login.svelte";
	import { loggedInStatus } from "./stores/user";
	import { backendURL } from "./stores/general";
	import { SvelteToast, toast } from "@zerodevx/svelte-toast"
import Signup from "./pages/Signup.svelte";

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
		<SvelteToast />
		<nav>
			<Link to="/">Home</Link>
			<Link to="products">Products</Link>

			{#if !$loggedInStatus}
				<Link to="login">Login</Link>
				<Link to="signup">Sign up</Link>
			{/if}

			{#if $loggedInStatus}
				<a on:click={logOut}>Logout</a>
			{/if}
		</nav>
		<div>
			<Route path="/" component={Home} />
			<Route path="products" component={Products} />
			<Route path="login" component={Login} />
			<Route path="signup" component={Signup} />
		</div>
	</main>
</Router>

<style>
	nav {
		display: flex;
		justify-content: space-evenly;
	}
</style>
