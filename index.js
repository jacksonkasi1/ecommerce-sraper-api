// index.js

const express = require("express")
const cors = require("cors")
const app = express()
const port = process.env.PORT || 5000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const amazonScraper = require("amazon-buddy")

//  https://2pxne.sse.codesandbox.io/gaveit/search?keyword=keyboard
const searchProducts = async (keyword, search_limit, country) => {
  //  Collect 50 products from a keyword 'xbox one' from Amazon.NL
  let products = await amazonScraper.products({
    keyword: keyword,
    number: search_limit || 1,
    asyncTasks: search_limit || 1,
    country: country || "IN"
  })

  return products
}

//  https://2pxne.sse.codesandbox.io/gaveit/product?asin=B07WDKLZPN
const productDetails = async (asin, asin_limit, country) => {
  // Collect 10 reviews from a product ID B01GW3H3U8

  //   let reviews = await amazonScraper.reviews({
  //     asin: asin,
  //     number: review_limit || 1,
  //     country: country || "IN"
  //   })

  // Get single product details by using ASIN id
  let product_by_asin = await amazonScraper.asin({
    asin: asin,
    country: country || "IN",
    asyncTasks: asin_limit || 1,
    number: asin_limit || 1,
  })

  let product_details = await {
    product: product_by_asin.result[0]
    // reviews: reviews
  }
  return product_details
}

// app.get("/api/:id", (req, res) => {
//   var id = req.params.id
//   if (id === "search") {
//     searchProducts(req.query.keyword, req, res)
//   } else if (id === "product") {
//     productDetails(req.query.asin, req, res)
//   } else {
//     res.json({ message: "Looks good to me!" })
//   }
// })

// search
app.get("/api/search", async (req, res) => {
  console.log(req.query.keyword)
  const responce = await searchProducts(req.query.keyword)
  res.json(responce)
  // output data:
  // {
  //     "totalProducts": "9468",
  //     "category": "aps",
  //     "result": [
  //       {
  //         "position": {
  //           "page": 1,
  //           "position": 2,
  //           "global_position": 1
  //         },
  //         "asin": "B0BDJ52N7F",
  //         "price": {
  //           "discounted": false,
  //           "current_price": 139900,
  //           "currency": "INR",
  //           "before_price": 0,
  //           "savings_amount": 0,
  //           "savings_percent": 0
  //         },
  //         "reviews": {
  //           "total_reviews": 249,
  //           "rating": 4.6
  //         },
  //         "url": "https://www.amazon.in/dp/B0BDJ52N7F",
  //         "score": "1145.40",
  //         "sponsored": false,
  //         "amazonChoice": false,
  //         "bestSeller": false,
  //         "amazonPrime": true,
  //         "title": "Sponsored Ad - Apple iPhone 14 Pro 256GB Space Black",
  //         "thumbnail": "https://m.media-amazon.com/images/I/61XO4bORHUL._AC_UY218_.jpg"
  //       }
  //     ]
  //   }
})

// product details
app.get("/api/get-product-details", async (req, res) => {
  console.log(req.query.asin)
  const responce = await productDetails(req.query.asin)
  res.json(responce)
  //   output data:

  // {
  //     "product": {
  //       "title": "Apple EarPods with Lightning Connector",
  //       "description": "",
  //       "feature_bullets": [
  //         " Unlike traditional, circular earbuds, the design of the EarPods is defined by the geometry of the ear. Which makes them more comfortable for more people than any other earbud-style headphones.",
  //         " The speakers inside the EarPods have been engineered to maximize sound output and minimize sound loss, which means you get high-quality audio.",
  //         " The EarPods with Lightning Connector also include a built-in remote that lets you adjust the volume, control the playback of music and video, and answer or end calls with a pinch of the cord.",
  //         " Warranty Description: 1 Year Warranty Provided By The Manufacturer From Date Of Purchase"
  //       ],
  //       "variants": [

  //       ],
  //       "categories": [
  //         {
  //           "category": "Apple Products",
  //           "url": "https://www.amazon.in/stores/page/88D59F86-9161-4804-A524-0A5B39CD714A/?_encoding=UTF8&ref_=topnav_storetab_inappledevicessubnav"
  //         }
  //       ],
  //       "asin": "B01M1EEPOB",
  //       "url": "https://www.amazon.in/dp/B01M1EEPOB",
  //       "reviews": {
  //         "total_reviews": 13211,
  //         "rating": "",
  //         "answered_questions": 653
  //       },
  //       "item_available": true,
  //       "price": {
  //         "symbol": "₹",
  //         "currency": "INR",
  //         "current_price": 1699,
  //         "discounted": true,
  //         "before_price": 20002000,
  //         "savings_amount": 20000301,
  //         "savings_percent": 99.99
  //       },
  //       "bestsellers_rank": [

  //       ],
  //       "main_image": "https://m.media-amazon.com/images/I/418AP8pw3KL._SL1500_.jpg",
  //       "total_images": 6,
  //       "images": [
  //         "https://m.media-amazon.com/images/I/418AP8pw3KL._SL1500_.jpg",
  //         "https://m.media-amazon.com/images/I/41s-4Mp3HXL._SL1500_.jpg",
  //         "https://m.media-amazon.com/images/I/41uIBSbhpXL._SL1500_.jpg",
  //         "https://m.media-amazon.com/images/I/41C3ty0leuL._SL1500_.jpg",
  //         "https://m.media-amazon.com/images/I/41RGKf1nTlL._SL1500_.jpg",
  //         "https://m.media-amazon.com/images/I/41A+Sng0iFL._SL1500_.jpg"
  //       ],
  //       "total_videos": 1,
  //       "videos": [
  //         {
  //           "groupType": "IB_G1",
  //           "offset": "0",
  //           "thumb": "https://m.media-amazon.com/images/I/41ccxa4Bf2L._SX35_SY46._CR0,0,35,46_BG85,85,85_BR-120_PKdp-play-icon-overlay__.jpg",
  //           "durationSeconds": 38,
  //           "marketPlaceID": "A21TJRUUN4KGV",
  //           "isVideo": true,
  //           "isHeroVideo": false,
  //           "title": "Apple EarPods with Lightning Connector",
  //           "languageCode": "en_IN",
  //           "holderId": "holder19676fb234a840d694785fc29a571dcf",
  //           "url": "https://m.media-amazon.com/images/S/vse-vms-transcoding-artifact-eu-west-1-prod/aef2bd2f-0f42-4bf5-abf9-30ea299c943d/default.jobtemplate.mp4.480.mp4",
  //           "videoHeight": "480",
  //           "videoWidth": "854",
  //           "durationTimestamp": "00:38",
  //           "slateUrl": "https://m.media-amazon.com/images/I/41ccxa4Bf2L.SX522_.jpg",
  //           "minimumAge": 0,
  //           "variant": "MAIN",
  //           "slateHash": {
  //             "extension": "jpg",
  //             "physicalID": null,
  //             "width": "1920",
  //             "height": "1080"
  //           },
  //           "mediaObjectId": "19676fb234a840d694785fc29a571dcf",
  //           "thumbUrl": "https://m.media-amazon.com/images/I/41ccxa4Bf2L._SX35_SY46._CR0,0,35,46_BG85,85,85_BR-120_PKdp-play-icon-overlay__.jpg"
  //         }
  //       ],
  //       "delivery_message": "",
  //       "product_information": {
  //         "dimensions": "",
  //         "weight": "",
  //         "available_from": "",
  //         "available_from_utc": "",
  //         "available_for_months": 0,
  //         "available_for_days": 0,
  //         "manufacturer": "",
  //         "model_number": "",
  //         "department": "",
  //         "sold_by": "Appario Retail Private Ltd",
  //         "fulfilled_by": "Amazon",
  //         "qty_per_order": 2,
  //         "store_id": "",
  //         "brand": "Visit the Apple Store"
  //       },
  //       "badges": {
  //         "amazon_сhoice": true,
  //         "amazon_prime": true,
  //         "best_seller": false
  //       },
  //       "sponsored_products": [

  //       ],
  //       "also_bought": [

  //       ],
  //       "other_sellers": [

  //       ]
  //     },
  //     "reviews": {
  //       "total_reviews": 13,
  //       "stars_stat": {
  //         "1": "7%",
  //         "2": "2%",
  //         "3": "5%",
  //         "4": "18%",
  //         "5": "67%"
  //       },
  //       "result": [
  //         {
  //           "id": "RZL785P0K0QJD",
  //           "asin": {
  //             "original": "B01M1EEPOB",
  //             "variant": ""
  //           },
  //           "review_data": "Reviewed in India on 12 February 2023",
  //           "date": {
  //             "date": "12 February 2023",
  //             "unix": 1676147400
  //           },
  //           "name": "Fairoz m.",
  //           "rating": 3,
  //           "title": "See sound is great but wire quality is not at all good",
  //           "review": "See sound is great but wire quality is not at all good.. wire is too delicate",
  //           "verified_purchase": true,
  //           "media": [

  //           ]
  //         },
  //         {
  //           "id": "R9C7KINE0UZVZ",
  //           "asin": {
  //             "original": "B01M1EEPOB",
  //             "variant": ""
  //           },
  //           "review_data": "Reviewed in India on 4 February 2023",
  //           "date": {
  //             "date": "4 February 2023",
  //             "unix": 1675456200
  //           },
  //           "name": "Bilal Uddin Khan",
  //           "rating": 1,
  //           "title": "Fake",
  //           "review": "It’s a fake. I have been using original earpods from two years that’s wire was original silicone that was very soft and flexible but this is hard wire like plastic.Sound quality is also very poor.",
  //           "verified_purchase": true,
  //           "media": [
  //             "https://m.media-amazon.com/images/I/718So+9poAL._SL1600_.jpg"
  //           ]
  //         },
  //         {
  //           "id": "R1GQYNSX3BWQ1E",
  //           "asin": {
  //             "original": "B01M1EEPOB",
  //             "variant": ""
  //           },
  //           "review_data": "Reviewed in India on 25 January 2023",
  //           "date": {
  //             "date": "25 January 2023",
  //             "unix": 1674592200
  //           },
  //           "name": "Bikash Dung Dung",
  //           "rating": 2,
  //           "title": "poor",
  //           "review": "Noise cancellation is not working and it’s not good for gaming",
  //           "verified_purchase": true,
  //           "media": [

  //           ]
  //         },
  //         {
  //           "id": "R20I8D1KGNS4R1",
  //           "asin": {
  //             "original": "B01M1EEPOB",
  //             "variant": ""
  //           },
  //           "review_data": "Reviewed in India on 24 January 2023",
  //           "date": {
  //             "date": "24 January 2023",
  //             "unix": 1674505800
  //           },
  //           "name": "Alexaa",
  //           "rating": 4,
  //           "title": "Good quality but kinda overpriced",
  //           "review": "I had no complain regarding the sound quality it's perfect but i think it's kinda overpricedIt's not durable at all",
  //           "verified_purchase": true,
  //           "media": [

  //           ]
  //         },
  //         {
  //           "id": "REI9RC4HV90XP",
  //           "asin": {
  //             "original": "B01M1EEPOB",
  //             "variant": ""
  //           },
  //           "review_data": "Reviewed in India on 22 January 2023",
  //           "date": {
  //             "date": "22 January 2023",
  //             "unix": 1674333000
  //           },
  //           "name": "HARINI C N",
  //           "rating": 4,
  //           "title": "Good product",
  //           "review": "Working nicely",
  //           "verified_purchase": true,
  //           "media": [

  //           ]
  //         },
  //         {
  //           "id": "R3M4S2NLV9KKFY",
  //           "asin": {
  //             "original": "B01M1EEPOB",
  //             "variant": ""
  //           },
  //           "review_data": "Reviewed in India on 19 January 2023",
  //           "date": {
  //             "date": "19 January 2023",
  //             "unix": 1674073800
  //           },
  //           "name": "Divyansh",
  //           "rating": 1,
  //           "title": "Very disappointing",
  //           "review": "Got a defective product stopped working after sometime.",
  //           "verified_purchase": true,
  //           "media": [

  //           ]
  //         },
  //         {
  //           "id": "RGBALDOHRCKTB",
  //           "asin": {
  //             "original": "B01M1EEPOB",
  //             "variant": ""
  //           },
  //           "review_data": "Reviewed in India on 15 January 2023",
  //           "date": {
  //             "date": "15 January 2023",
  //             "unix": 1673728200
  //           },
  //           "name": "Lavanya punnam",
  //           "rating": 5,
  //           "title": "Verry nice pic",
  //           "review": "Verry nice pic bro",
  //           "verified_purchase": true,
  //           "media": [

  //           ]
  //         },
  //         {
  //           "id": "R1JB2OC8ZHSGFC",
  //           "asin": {
  //             "original": "B01M1EEPOB",
  //             "variant": ""
  //           },
  //           "review_data": "Reviewed in India on 12 January 2023",
  //           "date": {
  //             "date": "12 January 2023",
  //             "unix": 1673469000
  //           },
  //           "name": "mohammad ali",
  //           "rating": 1,
  //           "title": "duplicate",
  //           "review": "Not working",
  //           "verified_purchase": true,
  //           "media": [

  //           ]
  //         },
  //         {
  //           "id": "RO2HJ93J0C7SE",
  //           "asin": {
  //             "original": "B01M1EEPOB",
  //             "variant": ""
  //           },
  //           "review_data": "Reviewed in India on 11 January 2023",
  //           "date": {
  //             "date": "11 January 2023",
  //             "unix": 1673382600
  //           },
  //           "name": "Bhagat Kathait",
  //           "rating": 3,
  //           "title": "Bad",
  //           "review": "Bahut jaldi kharab ho jate h",
  //           "verified_purchase": true,
  //           "media": [

  //           ]
  //         },
  //         {
  //           "id": "R9H4YM1KA41LG",
  //           "asin": {
  //             "original": "B01M1EEPOB",
  //             "variant": ""
  //           },
  //           "review_data": "Reviewed in India on 8 January 2023",
  //           "date": {
  //             "date": "8 January 2023",
  //             "unix": 1673123400
  //           },
  //           "name": "Manju Prince",
  //           "rating": 2,
  //           "title": "Good but jack issue",
  //           "review": "Good but jack issue",
  //           "verified_purchase": true,
  //           "media": [
  //             "https://m.media-amazon.com/images/I/81TvYSmO8OL._SL1600_.jpg"
  //           ]
  //         }
  //       ]
  //     }
  //   }
})

// search products with product details
app.get("/api/search-product-with-details", async (req, res) => {
  const { keyword, search_limit, asin_limit, country } = req.query
  let data = await searchProducts(keyword, search_limit, country)

  let { result } = data
  //   using foloop get also product details and add inside searchProducts result inside

  //   forloop
  for (let i = 0; i < result.length; i++) {
    let product = result[i]
    let responce = await productDetails(product.asin, asin_limit, country)
    console.log(responce)
    result[i] = { ...product, productDetails: { ...responce } }
  }

  res.send(result)
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
