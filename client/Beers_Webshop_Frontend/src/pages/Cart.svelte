<script>
    import { cart } from "../stores/user.js";

    $: total = $cart.reduce((a ,b) => a + b.price, 0)

</script>

{#if !$cart.length === 0}
    <table>
        <tr>
            <th>img</th>
            <th>Name</th>
            <th>price</th>
        </tr>
        {#each $cart as item}
        <tr>
            <td>
                <img src={item.image_url} alt="">
            </td>
            <td>{item.name}</td>
            <td>{item.price}.00 DKK</td>
        </tr>
        {/each}
    </table>
    <h3>Total: {Number(total)}</h3>

{:else}
    <h2>Cart is empty</h2>
{/if}


<style>
    img{
        height: 8em;
    }
</style>