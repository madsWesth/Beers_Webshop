<script>
    import { onMount } from "svelte";
    import ProductBox from "../components/ProductBox.svelte"
import { backendURL } from "../stores/general";

    let products = [];

    onMount(async () => {
        const res = await fetch($backendURL + "beers");
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
        width: 97vw;
    }

    #product-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 70%;
    }
</style>
