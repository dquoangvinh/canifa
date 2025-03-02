// script.js - JavaScript cho website CANIFA

document.addEventListener('DOMContentLoaded', function() {
  // Xử lý tab trong trang chi tiết sản phẩm
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  if (tabButtons.length > 0) {
      tabButtons.forEach(button => {
          button.addEventListener('click', () => {
              // Xóa class active từ tất cả tab và nội dung
              tabButtons.forEach(btn => btn.classList.remove('active'));
              tabContents.forEach(content => content.classList.remove('active'));
              
              // Thêm class active cho tab được click và nội dung tương ứng
              button.classList.add('active');
              const tabId = button.getAttribute('data-tab');
              document.getElementById(tabId).classList.add('active');
          });
      });
  }
  
  // Xử lý thumbnails trong trang chi tiết sản phẩm
  const thumbnails = document.querySelectorAll('.thumbnail');
  const mainImage = document.querySelector('.main-image img');
  
  if (thumbnails.length > 0 && mainImage) {
      thumbnails.forEach(thumbnail => {
          thumbnail.addEventListener('click', () => {
              // Xóa class active từ tất cả thumbnail
              thumbnails.forEach(thumb => thumb.classList.remove('active'));
              
              // Thêm class active cho thumbnail được click
              thumbnail.classList.add('active');
              
              // Cập nhật hình ảnh chính
              const imgSrc = thumbnail.querySelector('img').src;
              mainImage.src = imgSrc;
          });
      });
  }
  
  // Xử lý lựa chọn màu sắc trong trang chi tiết sản phẩm
  const colorOptions = document.querySelectorAll('.color-option');
  
  if (colorOptions.length > 0) {
      colorOptions.forEach(option => {
          option.addEventListener('click', () => {
              // Xóa class active từ tất cả lựa chọn màu sắc
              colorOptions.forEach(opt => opt.classList.remove('active'));
              
              // Thêm class active cho lựa chọn màu sắc được click
              option.classList.add('active');
          });
      });
  }
  
  // Xử lý lựa chọn kích cỡ trong trang chi tiết sản phẩm
  const sizeOptions = document.querySelectorAll('.size-option');
  
  if (sizeOptions.length > 0) {
      sizeOptions.forEach(option => {
          option.addEventListener('click', () => {
              // Xóa class active từ tất cả lựa chọn kích cỡ
              sizeOptions.forEach(opt => opt.classList.remove('active'));
              
              // Thêm class active cho lựa chọn kích cỡ được click
              option.classList.add('active');
          });
      });
  }
  
  // Xử lý nút tăng/giảm số lượng
  const quantityBtns = document.querySelectorAll('.quantity-btn');
  
  if (quantityBtns.length > 0) {
      quantityBtns.forEach(btn => {
          btn.addEventListener('click', () => {
              const input = btn.parentElement.querySelector('.quantity-input');
              let value = parseInt(input.value);
              
              if (btn.textContent === '+') {
                  value++;
              } else if (btn.textContent === '-' && value > 1) {
                  value--;
              }
              
              input.value = value;
              
              // Nếu đang ở trang giỏ hàng, cập nhật tổng tiền
              updateCartTotal();
          });
      });
  }
  
  // Xử lý nút thêm vào giỏ hàng trong trang chi tiết sản phẩm
  const addToCartBtn = document.querySelector('.add-to-cart-btn');
  
  if (addToCartBtn) {
      addToCartBtn.addEventListener('click', () => {
          const productName = document.querySelector('.product-title').textContent;
          const quantity = document.querySelector('.quantity-input').value;
          
          // Hiển thị thông báo thành công
          alert(`Đã thêm ${quantity} "${productName}" vào giỏ hàng!`);
          
          // Cập nhật số lượng hiển thị trên biểu tượng giỏ hàng
          updateCartCount(quantity);
      });
  }
  
  // Xử lý nút "Mua ngay" trong trang chi tiết sản phẩm
  const buyNowBtn = document.querySelector('.buy-now-btn');
  
  if (buyNowBtn) {
      buyNowBtn.addEventListener('click', () => {
          // Chuyển hướng đến trang giỏ hàng
          window.location.href = 'cart.html';
      });
  }
  
  // Xử lý nút xóa sản phẩm khỏi giỏ hàng
  const removeItemBtns = document.querySelectorAll('.remove-item');
  
  if (removeItemBtns.length > 0) {
      removeItemBtns.forEach(btn => {
          btn.addEventListener('click', () => {
              const cartItem = btn.closest('.cart-item');
              
              if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?')) {
                  cartItem.remove();
                  updateCartTotal();
                  updateCartCount(-1);
              }
          });
      });
  }
  
  // Xử lý nút thanh toán trong trang giỏ hàng
  const checkoutBtn = document.querySelector('.checkout-btn');
  
  if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
          // Chuyển đến phần thanh toán nếu có, hoặc có thể chuyển đến trang thanh toán riêng
          window.location.href = 'checkout.html';
      });
  }
  
  // Xử lý áp dụng mã giảm giá
  const promoButton = document.querySelector('.promo-input button');
  
  if (promoButton) {
      promoButton.addEventListener('click', () => {
          const promoInput = document.querySelector('.promo-input input');
          const promoCode = promoInput.value.trim();
          
          if (promoCode === 'CANIFA2025') {
              alert('Mã giảm giá đã được áp dụng thành công!');
              // Cập nhật tổng tiền sau khi áp dụng mã giảm giá
              updateCartTotal(true);
          } else {
              alert('Mã giảm giá không hợp lệ hoặc đã hết hạn!');
          }
      });
  }
  
  // Hàm cập nhật tổng tiền giỏ hàng
  function updateCartTotal(hasPromo = false) {
      const summaryRows = document.querySelectorAll('.summary-row');
      const totalElement = document.querySelector('.summary-row.total span:last-child');
      
      if (summaryRows.length > 0 && totalElement) {
          // Giả lập tính toán tổng tiền (trong dự án thực tế, cần tính dựa trên giá và số lượng thực)
          let total = 1420000; // 1.420.000₫
          
          if (hasPromo) {
              // Giảm thêm 100.000₫ nếu có áp dụng mã giảm giá
              total -= 100000;
              
              // Cập nhật giá trị giảm giá hiển thị
              const discountElement = summaryRows[1].querySelector('span:last-child');
              discountElement.textContent = '-200.000₫'; // Tăng giảm giá từ 100.000₫ lên 200.000₫
          }
          
          // Thêm phí vận chuyển
          total += 30000; // 30.000₫
          
          // Định dạng số và cập nhật tổng tiền
          totalElement.textContent = formatCurrency(total);
      }
  }
  
  // Hàm cập nhật số lượng hiển thị trên biểu tượng giỏ hàng
  function updateCartCount(change) {
      const cartCount = document.querySelector('.cart-count');
      
      if (cartCount) {
          let count = parseInt(cartCount.textContent);
          
          if (typeof change === 'number') {
              count += change;
          } else {
              count = parseInt(change);
          }
          
          if (count < 0) count = 0;
          cartCount.textContent = count;
          
          // Cập nhật số lượng sản phẩm hiển thị trong giỏ hàng nếu có
          const cartCountText = document.querySelector('.cart-count-text');
          
          if (cartCountText) {
              cartCountText.textContent = `${count} sản phẩm`;
          }
      }
  }
  
  // Hàm định dạng số tiền
  function formatCurrency(amount) {
      return new Intl.NumberFormat('vi-VN', {
          style: 'decimal',
          maximumFractionDigits: 0
      }).format(amount) + '₫';
  }
});