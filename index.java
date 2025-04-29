function uploadImage() {
  const fileInput = document.getElementById('upload-file');
  const title = document.getElementById('upload-title').value.trim();
  const price = parseInt(document.getElementById('upload-price').value);
  const status = document.getElementById('upload-status');

  if (!fileInput.files[0] || !title || !price) {
    alert("กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const newImg = {
      id: images.length + 1,
      title: title,
      price: price,
      url: e.target.result // base64 image data
    };
    images.push(newImg);
    renderImages(document.getElementById('search-input').value.trim()); // แสดงภาพทันที
    status.textContent = "✅ อัปโหลดสำเร็จ!";
    fileInput.value = '';
    document.getElementById('upload-title').value = '';
    document.getElementById('upload-price').value = '';
  };
  reader.readAsDataURL(fileInput.files[0]);
}
