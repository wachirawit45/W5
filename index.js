// Filter images based on the search query
document.getElementById('search-input').addEventListener('input', (e) => {
    const filter = e.target.value.trim();
    renderImages(filter);
  });
  let cart = [];

  function addToCart(id) {
    const item = images.find(img => img.id === id);
    cart.push(item);
    updateCart();
  }
  
  function updateCart() {
    let total = 0;
    let cartContent = '';
    cart.forEach(item => {
      cartContent += `${item.title} - ${item.price} บาท<br>`;
      total += item.price;
    });
    document.getElementById('cart-items').innerHTML = `${cartContent}<br><strong>รวม: ${total} บาท</strong>`;
  }
  function uploadImage() {
    const fileInput = document.getElementById('upload-file');
    const title = document.getElementById('upload-title').value;
    const price = parseInt(document.getElementById('upload-price').value);
    const reader = new FileReader();
    reader.onload = function(e) {
      const newImg = {
        id: images.length + 1,
        title: title,
        price: price,
        url: e.target.result
      };
      images.push(newImg);
      renderImages();
    };
    reader.readAsDataURL(fileInput.files[0]);
  }
// Firebase Firestore setup
const db = firebase.firestore();

function saveOrder(userId, items, total) {
  db.collection('orders').add({
    userId: userId,
    items: items,
    total: total,
    date: new Date()
  })
  .then(() => alert('บันทึกการสั่งซื้อสำเร็จ!'))
  .catch(err => alert(err.message));
}
// Stripe Integration (backend required)
const stripe = Stripe('your-publishable-key-here');

function checkout(total) {
  stripe.redirectToCheckout({
    lineItems: [{ price: 'price_id_here', quantity: 1 }],
    mode: 'payment',
    successUrl: window.location.origin + '/success',
    cancelUrl: window.location.origin + '/cancel'
  });
}
// เพิ่มฟังก์ชันเพื่อให้ดาวน์โหลดไฟล์
function downloadImage(imageId) {
    const image = images.find(img => img.id === imageId);
    if (image) {
      const link = document.createElement('a');
      link.href = image.url;
      link.download = image.title + '.jpg';
      link.click();
    }
  }
        