let form = document.getElementById('postEditForm');
if (form) {
  form.addEventListener('submit', function(event) {
    let uploadedImagesNumber = document.querySelectorAll('.imageDeleteCheckbox')
      .length;
    let checkedImagesNumber = document.querySelectorAll(
      '.imageDeleteCheckbox:checked'
    ).length;
    let imagesToUploadNumber = document.getElementById('imageUpload').files
      .length;

    imagesTotal =
      uploadedImagesNumber - checkedImagesNumber + imagesToUploadNumber;
    if (imagesTotal > 4) {
      event.preventDefault();
      difference = imagesTotal - 4;
      alert(
        `You need to delete at lease ${difference} image${
          difference > 1 ? 's' : ''
        }`
      );
    }
  });
}

