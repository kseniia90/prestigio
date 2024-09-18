$(document).ready(function () {
    $(document).on('change', '[name="product_variation"]', function(){
        let selected = $(this).find('option:selected');
        let price = selected.data('regprice');
        let sale = selected.data('sale');
        let id = selected.val();
        let parent = $(this).closest('.product-card');
        parent.data('productid', id);
        parent.find('.reg_price').text(`${price}₴`);

        console.log(price);
        console.log(sale);
        console.log(id);
    });
});
