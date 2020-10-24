const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param {number} rotation - optional rotation parameter
 */
export default async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  /* setting canvas width & height allows us to 
    resize from the original image resolution */
  canvas.width = 250;
  canvas.height = 250;

  // draw rotated image and store data.
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  // As Base64 string
  // return canvas.toDataURL('image/jpeg');

  // As a blob
  // return new Promise((resolve) => {
  //   canvas.toBlob((file) => {
  //     resolve(URL.createObjectURL(file));
  //   }, "image/jpeg");
  // });

  // As a blob
  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      const new_image = new File([file], `my_image${new Date()}.jpeg`, {
        type: "image/jpeg",
        lastModified: new Date(),
        size: 2,
      });
      resolve(new_image);
    }, "image/jpeg");
  });
}
