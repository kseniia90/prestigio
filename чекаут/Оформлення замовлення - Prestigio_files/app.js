function update_cart(){
    $.ajax({
        type: "POST",
        url: prestigioAjax.ajaxurl,
        data: {
            action: 'update_count_cart',
        },
        success: function (response) {
            let count = response.count;
            $('.cart-icon__counter').text(count);
            get_user_cart();
        }
    });
}

function set_q_product(count, key){
    $.ajax({
        type: "POST",
        url: prestigioAjax.ajaxurl,
        data: {
            'action': 'set_q_product',
            count,
            key
        },  
        success: function (response) {
            console.log(response);
            if(response){
                update_cart();
                // $('.loader').removeClass('loader_active');
            }
        }   
    });
}

function delete_product_cart(key){
    $.ajax({
        type: "POST",
        url: prestigioAjax.ajaxurl,
        data: {
            action : 'delete_product_cart',
            key
        },
        success: function (response) {
            // console.log(response);
            update_cart();
            // $('.loader').removeClass('loader_active');
        }
    });
}

$(document).on('click', '.btn-remove.cart_item', function(){
    $('.loader').addClass('loader_active');
    let parent = $(this).closest('.shopping-cart__table__row');
    let key = parent.data('keyproduct');

    delete_product_cart(key);
})

$(document).on('click', '.plus_q', function(){
    $('.loader').addClass('loader_active');
    let parent = $(this).closest('.shopping_cart__counter');
    let $quantityInput = parent.find('[name="product_quantity"]');
    let product = $(this).closest('.shopping-cart__table__row');
    let key = product.data('keyproduct');

    let value = parseInt($quantityInput.val(), 10) || 0;
    $quantityInput.val(value + 1);
    set_q_product(value + 1, key);
});

$(document).on('click', '.minus_q', function(){
    $('.loader').addClass('loader_active');
    let parent = $(this).closest('.shopping_cart__counter');
    let product = $(this).closest('.shopping-cart__table__row');
    let key = product.data('keyproduct');
    let $quantityInput = parent.find('[name="product_quantity"]');
    
    let value = parseInt($quantityInput.val(), 10) || 0;
    if((value - 1) === 0){
        $quantityInput.val(1);
        set_q_product(1, key);
    }else{
        $quantityInput.val(value - 1);
        set_q_product(value - 1, key);
    }
    
    
    // console.log(value + 1);
});



function get_user_cart(){
    $.ajax({
        type: "POST",
        url: prestigioAjax.ajaxurl,
        data: {
            action: 'get_user_cart',
        },
        success: function (response) {
            console.log(response);

            if(response.cart.length > 0){
                $('.shopping-cart-empty').css('display', 'none');
                $('.shopping-cart-products').css('display', 'block');
            }else{
                $('.shopping-cart-empty').css('display', 'block');
                $('.shopping-cart-products').css('display', 'none');
                $('.loader').removeClass('loader_active');
            }

            let cart = response.cart;
            let cart_body = $('.shopping-cart__table__body');
            cart_body.html('');
            cart.forEach((item)=>{
                let price = '';
                let sale_price = '';
                if(item.sale_price == null){
                    price = `${item.price}₴`;
                }else{
                    price = `${item.price}₴`;
                    sale_price = `${item.regular_price}₴`;
                }

                let temp_item = $('<div></div>',{
                    class: 'shopping-cart__table__row',
                    data: { keyproduct: item.cart_item_key },
                    html: `
                    <div class="shopping-cart__img">
                        <div class="product-image">
                            <img src="${item.product_image}" alt="img" loading="lazy">
                        </div>
                    </div>
                    <div class="shopping-cart__col shopping-cart__col-main">
                        <div class="shopping-cart__name">            
                            <a href="#">${item.product_name}</a>
                        </div>
                        <div class="shopping-cart__price item-price">
                            ${sale_price ? `<span class="old-price">${sale_price}</span>` : ''}
                            <span>${price}</span>
                        </div>
                    </div>
                    <div class="shopping-cart__col shopping-cart__quantity">
                        <div class="shopping_cart__counter">
                            <span class="minus_q">-</span>
                            <input type="number" disabled="" name="product_quantity" value="${item.quantity}" min="1" max="" inputmode="numeric" style="-moz-appearance: textfield; -webkit-inner-spin-button: initial;">
                            <span class="plus_q">+</span>
                        </div>
                    </div>
                    <div class="shopping-cart__col shopping-cart__delete">
                        <span class="btn-remove cart_item">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.00085 11C9.00085 10.4477 9.44857 10 10.0009 10C10.5531 10 11.0009 10.4477 11.0009 11V17C11.0009 17.5523 10.5531 18 10.0009 18C9.44857 18 9.00085 17.5523 9.00085 17V11Z" fill="#6E717C"></path>
                                <path d="M14.0009 10C13.4486 10 13.0009 10.4477 13.0009 11V17C13.0009 17.5523 13.4486 18 14.0009 18C14.5531 18 15.0009 17.5523 15.0009 17V11C15.0009 10.4477 14.5531 10 14.0009 10Z" fill="#6E717C"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.53199 1C5.5245 1 3.19756 3.63591 3.5706 6.62017L5.28959 20.3721C5.47725 21.8734 6.75345 23 8.26642 23H15.7353C17.2483 23 18.5245 21.8734 18.7121 20.3721L20.4311 6.62017C20.8042 3.63591 18.4772 1 15.4697 1H8.53199ZM5.70234 5C6.11151 3.8455 7.2126 3 8.53199 3H15.4697C16.7891 3 17.8902 3.8455 18.2994 5H5.70234ZM5.63364 7L7.27414 20.124C7.3367 20.6245 7.7621 21 8.26642 21H15.7353C16.2396 21 16.665 20.6245 16.7276 20.124L18.3681 7H5.63364Z" fill="#6E717C"></path>
                                </svg>
                        </span>
                    </div>`,

                })
                cart_body.append(temp_item);
                $('#total_summ_cart').text(`${response.total}₴`);
                // update_cart();
                $('.loader').removeClass('loader_active');
            })
        }
    });
}

$('.shopping-cart__table__row')

function add_to_cart(id){
    $.ajax({
        type: "POST",
        url: prestigioAjax.ajaxurl,
        data: {
            action: 'add_to_cart',
            id_product: id,
        },
        success: function (response) {
            // console.log(response);
            update_cart();
            // $('.loader').removeClass('loader_active');
        }
    });
}

$(document).ready(function () {
    get_user_cart();
    $(document).on('change', '[name="product_variation"]', function(){
        let selected = $(this).find('option:selected');
        let price = selected.data('regprice');
        let sale = selected.data('sale');
        let id = selected.val();
        let link = selected.data('link');
        let title = selected.data('name');
        let parent = $(this).closest('.product-card');
        parent.data('id', id);
        let temp = [
            price,
            sale,
            id,
            link,
            title,
        ];
        console.log(temp);

        if(Number(sale) === Number(price)){
            parent.find('.reg_price').text(`${sale}₴`);
            parent.find('.old-price').text(``);
        }else{
            parent.find('.reg_price').text(`${sale}₴`);
            parent.find('.old-price').text(`${price}₴`);
        }

        // parent.find('.reg_price').text(`${sale}₴`);
        // parent.find('.old-price').text(`${price}₴`);
        parent.find('.link_mini_cart').attr('href', link);
        parent.find('h5').text(title)
        // console.log(price);
        // console.log(sale);
        // console.log(id);
    });

    $(document).on('click', '.add_to_cart', function(){
        $('.loader').addClass('loader_active');
        let product = $(this).closest('.product-card');
        let id = product.data('id');
        // console.log(id);

        $.ajax({
            type: "POST",
            url: prestigioAjax.ajaxurl,
            data: {
                action: 'add_to_cart',
                id_product: id,
            },
            success: function (response) {
                console.log(response);
                update_cart();
                // $('.loader').removeClass('loader_active');
            }
        });
    })

    $('#add_to_cart_product_page').on('click', function(){
        let this_id = $(this).data('thisid');
        add_to_cart(this_id);
        console.log(this_id);
        $('.loader').addClass('loader_active');
    })

    $(document).on('click', '.options-item', function() {
        $('.loader').addClass('loader_active');
        let parent_id = $('.product-page').data('parendtid');
    
        let parent_block = $(this).closest('.options-list');
        parent_block.find('.temp_active').removeClass('temp_active');
        $(this).addClass('temp_active');
    
        let attr = $(document).find('.temp_active');
    
        let array_attribute = [];
    
        attr.each(function() {
            let temp = {};
            temp[$(this).data('attrname')] = $(this).data('value');
            array_attribute.push(temp);
        });

        $.ajax({
            type: "POST",
            url: prestigioAjax.ajaxurl,
            data: {
                action: 'switcher_variation',
                array_attribute: JSON.stringify(array_attribute),
                id_parent: parent_id,
            },
            success: function (response) {
                console.log(response);
                if(response){
                    $('#add_to_cart_product_page').data('thisid', response.variation_id);
                    $('.title_product_page').text(response.variation_name);
                    window.history.replaceState(null, null, response.link);
                    if(response.price_sale != ''){
                        $('.regular_price').text(response.price_sale + '₴');
                        $('.sale_price').text(response.price + '₴');
                    }else{
                        $('.regular_price').text(response.price + '₴');
                        $('.sale_price').text('');
                    }
                    // $('#add_to_cart_product_page').data('thisid', 111);

                }

                $('.loader').removeClass('loader_active');
            }
        });
    });
});

