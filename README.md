---
name: Getting Started
route: /
---
![Otoli](https://github.com/Doctor-Strange/Otoli-Docz-mage/blob/master/apple-icon-180x180.png?raw=true)  


# Next.js Otoli Front-end


## Stack
- **Next.js** for SSR
- **TypeScript** for sake of god
- **SCSS** for styling components 
- **SEO & analytics**(Google Analytics,Heap , HotJar, Next SEO) 
- **Jest & Enzyme & React-test-renderer**
- **Docz** for documenting

## Seting up
### Installation

```sh
git clone https://gitlab.com/otoli/mvp-front
cd mvp-front
npm install
```
####  Test
```bash
npm run test # test
npm run test:watch # dev mode
npm run test:coverage # report coverage
```

####  Docs
To run documentation and find out more about deployment.

```bash
npm run docz:dev # run docs web server in http://localhost:3000/
npm run docz:build # build docs in docz
```


#### Development
For more information about development mode and Environment variables go to [Configuration Section](#configuration)
```bash
npm run dev # run in development mode 
```


#### Serve

```bash
npm
npm run build # create .next directory
npm start # start server
```

### Configuration 

Environment Variables
> src/next.config.js
```bash
# SITE_URL: "https://otoli.net"
# PRODUCTION_ENDPOINT: "https://core.otoli.net"
```

To run in Development mode 
> src/package.json
```bash
# "dev": "SET NODE_ENV=development & next dev"
```
 
## Usage
This project is build on top of [Next.js](https://nextjs.org/docs). 

## Folder Structure

```
Otoli
├─ package-lock.json
├─ package.json
├─ pages
│  ├─ about-us.tsx
│  ├─ add-car.tsx
│  ├─ car
│  │  └─ [id].tsx
│  ├─ checkout.tsx
│  ├─ complete-register.tsx
│  ├─ faq.tsx
│  ├─ gps.tsx
│  ├─ guide-for-rent.tsx
│  ├─ guide-picture.tsx
│  ├─ guide-renter.tsx
│  ├─ index.mdx
│  ├─ index.tsx
│  ├─ insurance-policies.tsx
│  ├─ join-us.tsx
│  ├─ join-us1.tsx
│  ├─ join-us2.tsx
│  ├─ otoli.tsx
│  ├─ our-policies.tsx
│  ├─ peyment_failed.tsx
│  ├─ peyment_succeed.tsx
│  ├─ rent
│  │  ├─ index.tsx
│  │  └─ [id].tsx
│  ├─ request
│  │  └─ [id].tsx
│  ├─ requests.tsx
│  ├─ search-result.tsx
│  ├─ set-car-timing.tsx
│  ├─ site-map.tsx
│  ├─ user
│  │  └─ [id].tsx
│  └─ _document.tsx
├─ public
│  ├─ android-icon-144x144.png
│  ├─ android-icon-192x192.png
│  ├─ android-icon-36x36.png
│  ├─ android-icon-48x48.png
│  ├─ android-icon-72x72.png
│  ├─ android-icon-96x96.png
│  ├─ apple-icon-114x114.png
│  ├─ apple-icon-120x120.png
│  ├─ apple-icon-144x144.png
│  ├─ apple-icon-152x152.png
│  ├─ apple-icon-180x180.png
│  ├─ apple-icon-57x57.png
│  ├─ apple-icon-60x60.png
│  ├─ apple-icon-72x72.png
│  ├─ apple-icon-76x76.png
│  ├─ apple-icon-precomposed.png
│  ├─ apple-icon.png
│  ├─ browserconfig.xml
│  ├─ favicon-16x16.png
│  ├─ favicon-32x32.png
│  ├─ favicon-96x96.png
│  ├─ favicon.ico
│  ├─ fonts
│  │  ├─ eot
│  │  │  ├─ IRANSansWeb.eot
│  │  │  ├─ IRANSansWeb_Black.eot
│  │  │  ├─ IRANSansWeb_Bold.eot
│  │  │  ├─ IRANSansWeb_Light.eot
│  │  │  ├─ IRANSansWeb_Medium.eot
│  │  │  └─ IRANSansWeb_UltraLight.eot
│  │  ├─ ttf
│  │  │  ├─ IRANSansWeb.ttf
│  │  │  ├─ IRANSansWeb_Black.ttf
│  │  │  ├─ IRANSansWeb_Bold.ttf
│  │  │  ├─ IRANSansWeb_Light.ttf
│  │  │  ├─ IRANSansWeb_Medium.ttf
│  │  │  └─ IRANSansWeb_UltraLight.ttf
│  │  ├─ woff
│  │  │  ├─ IRANSansWeb.woff
│  │  │  ├─ IRANSansWeb_Black.woff
│  │  │  ├─ IRANSansWeb_Bold.woff
│  │  │  ├─ IRANSansWeb_Light.woff
│  │  │  ├─ IRANSansWeb_Medium.woff
│  │  │  └─ IRANSansWeb_UltraLight.woff
│  │  └─ woff2
│  │     ├─ IRANSansWeb.woff2
│  │     ├─ IRANSansWeb_Black.woff2
│  │     ├─ IRANSansWeb_Bold.woff2
│  │     ├─ IRANSansWeb_Light.woff2
│  │     ├─ IRANSansWeb_Medium.woff2
│  │     └─ IRANSansWeb_UltraLight.woff2
│  ├─ image
│  │  ├─ index-landing.jpg
│  │  ├─ main_banner.jpg
│  │  ├─ parking.jpg
│  │  ├─ pelak.png
│  │  └─ SamanInsurance.png
│  ├─ logo_sticky.svg
│  ├─ manifest.json
│  ├─ ms-icon-144x144.png
│  ├─ ms-icon-150x150.png
│  ├─ ms-icon-310x310.png
│  ├─ ms-icon-70x70.png
│  ├─ sw.js
│  ├─ sw.js.map
│  ├─ workbox-1a4a986e.js
│  ├─ workbox-1a4a986e.js.map
│  ├─ worker-development.js
│  └─ zeit.svg
├─ src
│  ├─ API
│  │  ├─ get
│  │  │  ├─ getBodyStyle.tsx
│  │  │  ├─ getCar.tsx
│  │  │  ├─ getCarAvailability.tsx
│  │  │  ├─ getCarBrand.tsx
│  │  │  ├─ getCarColors.tsx
│  │  │  ├─ getCarDiscount.tsx
│  │  │  ├─ getCarModel.tsx
│  │  │  ├─ getCylinder.tsx
│  │  │  ├─ getFacilities.tsx
│  │  │  ├─ getFaq.tsx
│  │  │  ├─ getLanding.tsx
│  │  │  ├─ getLocations.tsx
│  │  │  ├─ getModelInfo.tsx
│  │  │  ├─ getOrderRequest.tsx
│  │  │  ├─ getOrderRequests.tsx
│  │  │  ├─ getPriceEstimation.tsx
│  │  │  ├─ getRentalCar.tsx
│  │  │  ├─ getSearchForRent.tsx
│  │  │  ├─ getSiteMapLinks.tsx
│  │  │  ├─ getUserCars.tsx
│  │  │  ├─ getUserInfo.tsx
│  │  │  └─ getYear.tsx
│  │  ├─ index.js
│  │  ├─ points.txt
│  │  └─ set
│  │     ├─ removeCarMedia.tsx
│  │     ├─ setCarAvailablity.tsx
│  │     ├─ setCarDiscount.tsx
│  │     ├─ setCarMedia.tsx
│  │     ├─ setCarPartial.tsx
│  │     ├─ setCompanyName.tsx
│  │     ├─ setDeleteCar.tsx
│  │     ├─ setFirstandLastName.tsx
│  │     ├─ setIsOutOfService.tsx
│  │     ├─ setNewcar.tsx
│  │     ├─ setRentRequest.tsx
│  │     ├─ setRequestAction.tsx
│  │     ├─ setUserImage.tsx
│  │     ├─ setUserInfoupdate.tsx
│  │     └─ setUsername.tsx
│  ├─ components
│  │  ├─ Accordion
│  │  │  ├─ Accordion.scss
│  │  │  ├─ Accordion.test.js
│  │  │  ├─ index.tsx
│  │  │  └─ __snapshots__
│  │  ├─ calculator
│  │  │  ├─ calculator.test.js
│  │  │  ├─ index.tsx
│  │  │  ├─ Join_us_content
│  │  │  │  └─ index.tsx
│  │  │  ├─ ShowResult
│  │  │  │  ├─ ShowResult.test.js
│  │  │  │  └─ ShowResult.tsx
│  │  │  └─ __snapshots__
│  │  │     └─ calculator.test.js.snap
│  │  ├─ cartPlaceholder
│  │  │  ├─ CarLoading
│  │  │  │  ├─ car_cart.scss
│  │  │  │  └─ index.tsx
│  │  │  ├─ carPageLoading
│  │  │  │  ├─ carPageLoading.scss
│  │  │  │  └─ index.tsx
│  │  │  ├─ checkoutLoading
│  │  │  │  ├─ checkoutLoading.scss
│  │  │  │  └─ index.tsx
│  │  │  └─ requestLoading
│  │  │     ├─ index.tsx
│  │  │     └─ requestLoading.scss
│  │  ├─ countDown
│  │  │  ├─ CountDown.test.js
│  │  │  ├─ index.tsx
│  │  │  └─ __snapshots__
│  │  │     └─ CountDown.test.js.snap
│  │  ├─ Counter
│  │  │  ├─ Counter.scss
│  │  │  ├─ Counter.test.js
│  │  │  ├─ index.tsx
│  │  │  └─ __snapshots__
│  │  │     └─ Counter.test.js.snap
│  │  ├─ filters
│  │  │  └─ PriceSlider
│  │  │     ├─ index.tsx
│  │  │     └─ price_filter.scss
│  │  ├─ Footer
│  │  │  ├─ footer.scss
│  │  │  ├─ Footer.test.js
│  │  │  ├─ index.tsx
│  │  │  └─ __snapshots__
│  │  │     └─ Footer.test.js.snap
│  │  ├─ form
│  │  │  ├─ Button
│  │  │  │  ├─ Button.scss
│  │  │  │  ├─ Button.test.js
│  │  │  │  ├─ index.tsx
│  │  │  │  └─ __snapshots__
│  │  │  │     └─ Button.test.js.snap
│  │  │  ├─ Checkbox
│  │  │  │  ├─ Checkbox.scss
│  │  │  │  ├─ Checkbox.test.js
│  │  │  │  ├─ index.tsx
│  │  │  │  └─ __snapshots__
│  │  │  │     └─ Checkbox.test.js.snap
│  │  │  ├─ Dropdown
│  │  │  │  ├─ DropDown.scss
│  │  │  │  ├─ Dropdown.test.js
│  │  │  │  ├─ index.tsx
│  │  │  │  └─ __snapshots__
│  │  │  │     └─ Dropdown.test.js.snap
│  │  │  ├─ Radio
│  │  │  │  ├─ index.tsx
│  │  │  │  ├─ radio.scss
│  │  │  │  ├─ Radio.test.js
│  │  │  │  └─ __snapshots__
│  │  │  │     └─ Radio.test.js.snap
│  │  │  └─ TextInput
│  │  │     ├─ index.tsx
│  │  │     ├─ inputStyle.scss
│  │  │     ├─ TextInput.test.js
│  │  │     └─ __snapshots__
│  │  ├─ ImageUploader
│  │  │  ├─ ImageUploader.scss
│  │  │  └─ index.tsx
│  │  ├─ pelak
│  │  │  ├─ index.tsx
│  │  │  └─ pelak.scss
│  │  ├─ PleaseLogin
│  │  │  ├─ index.tsx
│  │  │  └─ please_login.scss
│  │  ├─ Slider
│  │  │  ├─ Gallery
│  │  │  │  ├─ Gallery.scss
│  │  │  │  └─ index.tsx
│  │  │  ├─ index.tsx
│  │  │  └─ slider.scss
│  │  ├─ Spinner
│  │  │  ├─ index.tsx
│  │  │  ├─ spinner.scss
│  │  │  ├─ Spinner.test.js
│  │  │  └─ __snapshots__
│  │  │     └─ Spinner.test.js.snap
│  │  ├─ TabCreator
│  │  │  ├─ index.tsx
│  │  │  └─ TabCreator.scss
│  │  └─ Toast
│  │     ├─ index.tsx
│  │     └─ toast.scss
│  ├─ containers
│  │  ├─ Add_car
│  │  │  ├─ Add_car.scss
│  │  │  ├─ index.tsx
│  │  │  └─ step_1
│  │  │     ├─ index.tsx
│  │  │     └─ step_1.scss
│  │  ├─ car
│  │  │  ├─ carpage
│  │  │  │  ├─ carpage.scss
│  │  │  │  └─ index.tsx
│  │  │  ├─ profile
│  │  │  └─ search-result
│  │  │     ├─ car
│  │  │     │  ├─ car.scss
│  │  │     │  └─ index.tsx
│  │  │     ├─ index.tsx
│  │  │     └─ search_result.scss
│  │  ├─ Checkout_Container
│  │  │  ├─ checkout.scss
│  │  │  ├─ index.tsx
│  │  │  └─ insurance
│  │  │     ├─ index.tsx
│  │  │     └─ insurance.scss
│  │  ├─ CompleteRegister
│  │  │  ├─ complete_register.scss
│  │  │  └─ index.tsx
│  │  ├─ Filters
│  │  │  ├─ Filter.scss
│  │  │  └─ index.tsx
│  │  ├─ header
│  │  │  ├─ header.scss
│  │  │  ├─ index.tsx
│  │  │  ├─ menu
│  │  │  │  └─ index.tsx
│  │  │  └─ modals
│  │  │     ├─ ConfirmCode
│  │  │     │  └─ index.tsx
│  │  │     ├─ GetUserCellPhone
│  │  │     │  ├─ index.tsx
│  │  │     │  └─ userCellphone.scss
│  │  │     ├─ index.tsx
│  │  │     ├─ Law
│  │  │     │  ├─ index.tsx
│  │  │     │  └─ Law.scss
│  │  │     ├─ modal.scss
│  │  │     ├─ Modal.test.js
│  │  │     ├─ Owner
│  │  │     │  ├─ index.tsx
│  │  │     │  └─ Owner.scss
│  │  │     ├─ Renter
│  │  │     │  ├─ index.tsx
│  │  │     │  └─ Renter.scss
│  │  │     ├─ Tell_me
│  │  │     │  ├─ index.tsx
│  │  │     │  └─ Tell_me.scss
│  │  │     └─ __snapshots__
│  │  │        └─ Modal.test.js.snap
│  │  ├─ LandignPageContainer
│  │  │  ├─ index.tsx
│  │  │  ├─ landingPageContent
│  │  │  │  ├─ index.tsx
│  │  │  │  └─ landingPageContent.scss
│  │  │  └─ Search_result.scss
│  │  ├─ Profile_container
│  │  │  ├─ index.tsx
│  │  │  ├─ Profile_Cars
│  │  │  │  ├─ car
│  │  │  │  │  ├─ car.scss
│  │  │  │  │  ├─ Car.test.js
│  │  │  │  │  ├─ index.tsx
│  │  │  │  │  └─ __snapshots__
│  │  │  │  │     └─ Car.test.js.snap
│  │  │  │  ├─ index.tsx
│  │  │  │  └─ profile_car.scss
│  │  │  ├─ Profile_container.scss
│  │  │  └─ Profile_info
│  │  │     ├─ Edit_profile
│  │  │     │  ├─ edit_profile.scss
│  │  │     │  └─ index.tsx
│  │  │     ├─ index.tsx
│  │  │     └─ profile_info.scss
│  │  ├─ Requests_page
│  │  │  ├─ index.tsx
│  │  │  ├─ Requests_filter
│  │  │  │  └─ index.tsx
│  │  │  ├─ Requests_page.scss
│  │  │  └─ request_cart
│  │  │     ├─ index.tsx
│  │  │     └─ request_cart.scss
│  │  ├─ Request_page
│  │  │  ├─ index.tsx
│  │  │  ├─ Requests_page.scss
│  │  │  └─ request_cart
│  │  │     ├─ index.tsx
│  │  │     └─ request_cart.scss
│  │  ├─ Search
│  │  │  ├─ index.tsx
│  │  │  ├─ search.scss
│  │  │  ├─ Search.test.js
│  │  │  └─ __snapshots__
│  │  │     └─ Search.test.js.snap
│  │  ├─ Search_result
│  │  │  ├─ index.tsx
│  │  │  └─ Search_result.scss
│  │  └─ Set_car_timing
│  │     ├─ DiscountBox
│  │     │  ├─ DiscountBox.scss
│  │     │  └─ index.tsx
│  │     ├─ index.tsx
│  │     ├─ PriceBox
│  │     │  ├─ index.tsx
│  │     │  └─ PriceBox.scss
│  │     ├─ set_car.scss
│  │     └─ step_2
│  │        ├─ index.tsx
│  │        └─ step_2.scss
│  ├─ context
│  │  ├─ Auth_context.js
│  │  ├─ Cell_Phone_context.js
│  │  ├─ filter-context.js
│  │  ├─ Modal_context.js
│  │  └─ Toast_context.js
│  ├─ Layout
│  │  └─ index.tsx
│  └─ styles
│     ├─ main.scss
│     ├─ pages
│     │  ├─ Failed_payment.scss
│     │  ├─ faq.scss
│     │  ├─ index.scss
│     │  ├─ join-us.scss
│     │  ├─ otoli.scss
│     │  ├─ search_result.scss
│     │  ├─ static_pages.scss
│     │  └─ Success_payment.scss
│     ├─ _colors.scss
│     ├─ _font.scss
│     ├─ _function.scss
│     ├─ _mixin.scss
│     └─ _units.scss
├─ testUtil
│  ├─ FindByAttr.js
│  └─ test-setup.js
├─ tsconfig.json
├─ worker
│  ├─ index.js
│  └─ util.js
└─ __mocks__
   └─ mocks.js

```


