import React, { useCallback, useState, useEffect, useRef } from "react";
// import "./ImageUploader.scss";
import jsCookie from "js-cookie";
import carVector from "../../../public/image/car_vector.png";
/**
 *
 * react-dropzone
 *
 * Npm
 *  https://www.npmjs.com/package/react-dropzone
 *
 * Git
 *  https://github.com/react-dropzone/react-dropzone
 */
import { useDropzone } from "react-dropzone";
import { REQUEST_REMOVE_CAR_MEDIA, REQUEST_NEW_CAR_MEDIA } from "../../API";
import { IoIosClose } from "react-icons/io";
import Spinner from "../Spinner";

const ImageUploader = ({
  Upload_image,
  delete_image,
  default_image,
  error_status,
  language,
}: IImageUpload) => {
  const [picturesPreview, setPicturesPreview] = useState([]);
  const [loading, setloading] = useState(false);
  const wrapperRef = useRef(null);

  const token = jsCookie.get("token");

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader: any = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        sendTheImage(file, reader.result);
      };
    });
  }, []);

  useEffect(() => {
    // give the default images
    if (default_image) {
      setPicturesPreview(default_image);
    }
  }, [default_image]);

  const RemoveAnImage = (i) => {
    REQUEST_REMOVE_CAR_MEDIA({
      token: token,
      id: i,
    });
    setPicturesPreview((picturesPreview) =>
      picturesPreview.filter((item, index) => {
        return item.id !== i;
      })
    );
    delete_image(i);
  };

  const sendTheImage = async (file, result) => {
    setloading(true);
    // get the image by id from API
    const image_upload_res: any = await REQUEST_NEW_CAR_MEDIA({
      token: token,
      file: file,
    });
    setloading(false);
    // add the given image to preview list
    setPicturesPreview((picturesPreview) =>
      picturesPreview.concat({
        img: result,
        id: image_upload_res.id,
      })
    );
    // sent the image id to parent component
    Upload_image(image_upload_res.id);
  };

  const { getRootProps, getInputProps } = useDropzone({
    // acceptable formats for upload
    accept: ".jpeg, .jpg, .png",

    // active Drop and use custom function
    onDrop,
  });

  // useEffect(() => {
  //   if (error_status) {
  //     scrollTo(0, wrapperRef.current.offsetTop);
  //   }
  // }, [error_status]);

  return (
    <div ref={wrapperRef}>
      <label>{language.car_picture}</label>
      <p className='image_upload_under_label'>
        {language.text_1}
        <br />
        {language.text_2}
        <u>{language.text_2_italic}</u>
      </p>
      <div className='drop_zone' {...getRootProps()}>
        <input {...getInputProps()} />
        <p className='uploadText'>{language.text_3}</p>
        {picturesPreview.length > 0 ? (
          <div
            // if the image is uploading the drop-zone will be unreachable
            className={["Image_box", loading ? "loading_class" : null].join(
              " "
            )}
            onClick={(e) => e.preventDefault()}
          >
            {picturesPreview.map((i, index) => {
              return (
                <div
                  className='Each_image'
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    RemoveAnImage(i.id);
                  }}
                >
                  {/* onClick on trash icon the image will deleted for the car and sent the id to parent */}
                  <IoIosClose size='2rem' color='#ea2d2d' />
                  <img src={i.img} alt={i.id} />
                </div>
              );
            })}
            {loading ? (
              <Spinner display='inline-block' width={20} color='#b5b5b5' />
            ) : null}
          </div>
        ) : loading ? (
          <Spinner display='block' width={20} color='#b5b5b5' />
        ) : (
          <img
            className='vector_car_upload'
            src={carVector}
            alt='car vector image'
          />
        )}
        <p className='gallery_button'>{language.choose_from_gallery}</p>
      </div>
    </div>
  );
};

interface IImageUpload {
  // Send the id after upload to the parent component
  Upload_image: any;

  // Send the id of the deleted image to parent component
  delete_image: any;

  // receive an array of image ids
  default_image?: any;
  error_status?: boolean;
  language: any;
}

export default ImageUploader;
