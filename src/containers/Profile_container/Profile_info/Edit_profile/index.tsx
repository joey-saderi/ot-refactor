import React, {
  useEffect,
  useState,
  useReducer,
  useRef,
  useCallback,
} from "react";
import {
  REQUEST_SET_USER_IMAGE,
  REQUEST_SET_FIRST_LAST_NAME,
  REQUEST_SET_USERNAME,
  REQUEST_SET_COMPANY_NAME,
} from "../../../../API";
import Router from "next/router";
import TextInput from "../../../../components/form/TextInput";
// import "./edit_profile.scss";
import Button from "../../../../components/form/Button";
import jsCookie from "js-cookie";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../../../../utils/cropImage";

const stateReducer = (current, action) => {
  switch (action.type) {
    case "first_name":
      return { ...current, first_name: action.first_name };
    case "last_name":
      return { ...current, last_name: action.last_name };
    case "company_name":
      return { ...current, company_name: action.company_name };
    case "username":
      return { ...current, username: action.username };
    case "image":
      return { ...current, image: action.image };

    default:
      throw new Error("Some thing is wrong");
  }
};

const stateErrorReducer = (current, action) => {
  switch (action.type) {
    case "first_name":
      return {
        ...current,
        first_name: action.first_name,
        message: action.message,
      };
    case "last_name":
      return {
        ...current,
        last_name: action.last_name,
        message: action.message,
      };
    case "company_name":
      return {
        ...current,
        company_name: action.company_name,
        message: action.message,
      };
    case "username":
      return {
        ...current,
        username: action.username,
        message: action.message,
      };
    case "image":
      return { ...current, image: action.image, message: action.message };
    case "message":
      return { ...current, message: action.message };

    default:
      throw new Error("Some thing is wrong");
  }
};

const Edit_profile = ({
  data,
  setEdit,
  triggerUpload,
  language,
}: IEdit_profile) => {
  const [showCompany, setShowCompany] = useState(false);
  const [privateLink, setPrivateLink] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [croptStart, setCroptStart] = useState(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [state, dispatch] = useReducer(stateReducer, {
    first_name: "",
    last_name: "",
    company_name: "",
    username: "",
    image: null,
  });

  const [ErrorState, dispatchError] = useReducer(stateErrorReducer, {
    first_name: false,
    last_name: false,
    company_name: false,
    username: false,
    image: false,
    message: "",
  });

  const file_input = useRef(null);
  const canvas_ref = useRef(null);

  const token = jsCookie.get("token");

  const ResetError = () => {
    dispatchError({ type: "first_name", first_name: false, message: "" });
    dispatchError({ type: "last_name", last_name: false, message: "" });
    dispatchError({ type: "company_name", company_name: false, message: "" });
    dispatchError({ type: "username", username: false, message: "" });
    dispatchError({ type: "message", message: "" });
  };

  useEffect(() => {
    dispatch({ type: "first_name", first_name: data.first_name });
    dispatch({ type: "last_name", last_name: data.last_name });
    if (data.company_name) {
      setShowCompany(true);
      dispatch({ type: "company_name", company_name: data.company_name });
    }
    if (data.thumbnail_url) {
      dispatch({ type: "image", image: data.thumbnail_url });
    }
    if (data.username) {
      setPrivateLink(true);
      dispatch({ type: "username", username: data.username });
    }
    if (triggerUpload) {
      if (
        data.thumbnail_url ===
        "https://core.otoli.net/static/core/default_profile_pic.png"
      ) {
        file_input.current.click();
      }
    }
  }, [data]);

  const EditFormSubmit = async (e) => {
    e.preventDefault();
    ResetError();
    setLoading(true);
    if (!state.first_name || !state.last_name) {
      dispatchError({
        type: "first_name",
        first_name: true,
        message: "",
      });
      dispatchError({
        type: "last_name",
        last_name: true,
        message: "",
      });
      dispatchError({
        type: "message",
        message: language.name_error,
      });
      setLoading(false);
      return;
    }
    if (!state.username && privateLink) {
      dispatchError({
        type: "username",
        username: true,
        message: language.user_name_error,
      });
      setLoading(false);
      return;
    }
    if (!state.company_name && showCompany) {
      dispatchError({
        type: "company_name",
        company_name: true,
        message: language.company_name_error,
      });
      setLoading(false);
      return;
    }

    if (newImage) {
      try {
        await REQUEST_SET_USER_IMAGE({ token, file: newImage });
      } catch (error) {
        console.log("!Error", error);
      }
    }

    try {
      if (state.username !== "") {
        const res: any = await REQUEST_SET_USERNAME({
          token,
          username: state.username,
        });
        jsCookie.set("username", state.username, { expires: 100 });
        window.history.replaceState(null, "", `/user/${state.username}`);
      }
    } catch (error) {
      console.log("!Error", error);
      dispatchError({
        type: "username",
        username: true,
        message: error,
      });
      setLoading(false);
      return;
    }
    try {
      if (!privateLink && !showCompany) {
        jsCookie.set("name", state.first_name + " " + state.last_name, {
          expires: 100,
        });
      }
      await REQUEST_SET_FIRST_LAST_NAME({
        token,
        first_name: state.first_name,
        last_name: state.last_name,
      });
    } catch (error) {
      console.log("!Error", error);
      dispatchError({
        type: "first_name",
        first_name: true,
        message: error,
      });
      setLoading(false);
      return;
    }

    try {
      if (state.company_name !== "") {
        jsCookie.set("company_name", state.company_name, {
          expires: 100,
        });
        await REQUEST_SET_COMPANY_NAME({
          token,
          company_name: state.company_name,
        });
      }
    } catch (error) {
      console.log("!Error", error);
      setLoading(false);
      return;
    }
    setLoading(false);
    setEdit(true);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const image = await getCroppedImg(state.image, croppedAreaPixels);
      dispatch({ type: "image", image: URL.createObjectURL(image) });
      setNewImage(image);
      setCroptStart(false);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  return (
    <form className="edit_profile_form" onSubmit={EditFormSubmit}>
      <img
        src={
          state.image
            ? state.image
            : "https://core.otoli.net/static/core/default_profile_pic.png"
        }
        alt={state.first_name}
      />
      <div className="change_image_container">
        <p>{language.change_the_profile_image}</p>

        <input
          type="file"
          id="file"
          accept=".jpg,.jpeg,.png"
          ref={file_input}
          onClick={() => {
            file_input.current.value = null;
          }}
          onChange={(e) => {
            let file = e.target.files[0];
            const types = ["image/png", "image/jpeg", "image/png"];
            if (types.every((type) => file.type !== type)) {
              alert(language.incorrect_picture_extension);
              return false;
            }
            setNewImage(file);
            setCroptStart(true);
            // const objectURL = URL.createObjectURL(file);
            // console.log("objectURL", objectURL);
            // console.log(file);

            // const reader = new FileReader();
            // reader.readAsDataURL(file);
            dispatch({ type: "image", image: URL.createObjectURL(file) });
          }}
        />
        {croptStart && (
          <div className="crop_container">
            <Cropper
              image={state.image}
              crop={crop}
              zoom={zoom}
              minZoom={1}
              maxZoom={5}
              aspect={1 / 1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropShape="round" 
            />
            <div className="Crop_BTN_container">
              <span className="Blue_BTN local_class" onClick={showCroppedImage}>
                تایید
              </span>
              <span
                className="Blue_BTN cancel_class"
                onClick={() => {
                  setNewImage(null);
                  setCroptStart(false);
                  if (data.thumbnail_url) {
                    dispatch({ type: "image", image: data.thumbnail_url });
                  }
                  file_input.current.value = null;
                }}
              >
                لغو
              </span>
            </div>
          </div>
        )}
      </div>
      <TextInput
        name="first_name"
        number={false}
        onChangeHandler={(e) => {
          dispatch({ type: "first_name", first_name: e });
        }}
        clearField={() => dispatch({ type: "first_name", first_name: "" })}
        autoFocus={false}
        error={{
          status: ErrorState.first_name,
          message: "",
        }}
        min={2}
        max={50}
        value={state.first_name}
        label={language.name}
      />
      <TextInput
        name="last_name"
        number={false}
        onChangeHandler={(e) => {
          dispatch({ type: "last_name", last_name: e });
        }}
        clearField={() => dispatch({ type: "last_name", last_name: "" })}
        autoFocus={false}
        error={{
          status: ErrorState.last_name,
          message: "",
        }}
        min={2}
        max={50}
        value={state.last_name}
        label={language.last_name}
      />
      {!showCompany ? (
        <p className="link_text" onClick={() => setShowCompany(true)}>
          {language.company_name}
        </p>
      ) : (
        <TextInput
          name="company_name"
          number={false}
          onChangeHandler={(e) => {
            dispatch({ type: "company_name", company_name: e });
          }}
          clearField={() =>
            dispatch({ type: "company_name", company_name: "" })
          }
          autoFocus={false}
          error={{
            status: ErrorState.company_name,
            message: "",
          }}
          min={2}
          max={50}
          value={state.company_name}
          label={language.company_name}
        />
      )}
      {!privateLink ? (
        <p className="link_text" onClick={() => setPrivateLink(true)}>
          {language.create_personal_link}
        </p>
      ) : (
        <TextInput
          name="username"
          number={false}
          onChangeHandler={(e) => {
            dispatch({ type: "username", username: e });
          }}
          clearField={() => dispatch({ type: "username", username: "" })}
          autoFocus={false}
          error={{
            status: ErrorState.username,
            message: "",
          }}
          min={2}
          max={50}
          value={state.username}
          label={language.personal_link}
        />
      )}
      <div className="BTN_container">
        <Button
          class="Blue_BTN local_class"
          value={language.ok}
          click={() => {}}
          loading={loading}
        />
        <Button
          class="Blue_BTN cancel_class"
          value={language.cancel}
          click={() => setEdit(false)}
          loading={false}
        />
      </div>
      {ErrorState.message ? (
        <p className="Error_message_text">{ErrorState.message}</p>
      ) : null}
    </form>
  );
};
interface IEdit_profile {
  data: any;
  setEdit: any;
  // Open the file input by click on the avatar image
  triggerUpload?: boolean;
  language?: any;
}
export default Edit_profile;
