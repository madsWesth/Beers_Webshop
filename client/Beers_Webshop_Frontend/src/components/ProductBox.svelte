<script>
    export let productInfo;
</script>

<div class="product-card">
    <h3>{productInfo.name}</h3>
    <img src={productInfo.image_url} alt="">
    <div class="product-info">
        <p id="tagline">{productInfo.tagline}</p>
        <div class="buy-section">
            <p class="price">{productInfo.price}.00 DKK</p>
            <button>Add to cart</button>
        </div>
    </div>
</div>

<style>
    .product-card {
        height: 27em;
        width: 20em;
        margin: 0.7em;
        padding: 1em;
        background-color: lightgray;
        border-radius: 0.75em;
        display: flex;
        flex-direction: column;
        box-shadow: 3px 3px 10px grey;
    }
    .product-info {
        margin-top: auto;
    }

    .price {
        width: 5em;
    }

    #tagline {
        overflow: hidden;
    }

    .buy-section {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    img {
        height: 15em;
        filter: drop-shadow(10px 5px 4px grey);
        object-fit: contain;
    }
</style>
