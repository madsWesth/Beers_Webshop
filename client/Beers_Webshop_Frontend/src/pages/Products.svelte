<script>
    import { onMount } from "svelte";
    import ProductBox from "../components/ProductBox.svelte"
    	let products = [];

    onMount(async () => {
        const res = await fetch("http://localhost:3000/beers");
        products = await res.json()
    })
</script>
<div class="wrapper">
    <div id="product-grid">
        {#each products as product}
            <ProductBox productInfo={product} />
        {:else}
            <p>loading...</p>
        {/each}
    </div>
</div>

<style>
    .wrapper{
        display: flex;
        justify-content: center;
        width: 100vw;
    }

    #product-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 70%;
    }
</style>
