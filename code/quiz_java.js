const submitButton = document.querySelector('button[type="submit"]');
submitButton.addEventListener('click', handleFormSubmission);

function handleFormSubmission(event) {
  event.preventDefault();
  calculateAndSuggest();
}
function calculateAndSuggest() {
  const answers = document.querySelectorAll('input[name^="ans"]');
  const selectedClasses = Array.from(answers)
    .filter(answer => answer.checked)
    .map(answer => answer.classList);

  const classCounts = countClasses(selectedClasses);
  const suggestion = generateSuggestion(classCounts);
  const imageUrl = generateImageUrl(classCounts);
  //const classText = JSON.stringify(classCounts);  
  
  displaySuggestion(suggestion, imageUrl);
}

function countClasses(selectedClasses) {
  const classCounts = {};

  selectedClasses.forEach(classes => {
    classes.forEach(className => {
      if (classCounts[className]) {
        classCounts[className]++;
      } else {
        classCounts[className] = 1;
      }
    });
  });

  return classCounts;
}

function generateSuggestion(classCounts) {
  // Customize your suggestions based on the class counts
  const isNorthPreferred = classCounts.north > classCounts.kansai && classCounts.north > classCounts.central && classCounts.north > classCounts.south;
  const isSouthPreferred = classCounts.south > classCounts.kansai && classCounts.south > classCounts.central && classCounts.south > classCounts.north;
  const isCentralPreferred = classCounts.central > classCounts.kansai && classCounts.central > classCounts.north && classCounts.central > classCounts.south;
  const isKansaiPreferred = classCounts.kansai > classCounts.north && classCounts.kansai > classCounts.central && classCounts.kansai > classCounts.south;
  const isFoodPreferred = classCounts.food > classCounts.city && classCounts.food > classCounts.nature && classCounts.food > classCounts.mountain && classCounts.food > classCounts.coast && classCounts.food > classCounts.rural && classCounts.food > classCounts.temple;
  const isCoastPreferred = classCounts.coast > classCounts.city && classCounts.coast > classCounts.nature && classCounts.coast > classCounts.mountain && classCounts.coast > classCounts.food && classCounts.coast > classCounts.rural && classCounts.coast > classCounts.temple;
  const isNaturePreferred = classCounts.nature > classCounts.city && classCounts.nature > classCounts.food && classCounts.nature > classCounts.mountain && classCounts.nature > classCounts.coast && classCounts.nature > classCounts.rural && classCounts.nature > classCounts.temple;
  const isTemplePreferred = classCounts.temple > classCounts.city && classCounts.temple > classCounts.nature && classCounts.temple > classCounts.mountain && classCounts.temple > classCounts.coast && classCounts.temple > classCounts.rural && classCounts.temple > classCounts.food;
  const isRuralPreferred = classCounts.rural > classCounts.city && classCounts.rural > classCounts.nature && classCounts.rural > classCounts.mountain && classCounts.rural > classCounts.coast && classCounts.rural > classCounts.food && classCounts.rural > classCounts.temple;
  const isCityPreferred = classCounts.city > classCounts.food && classCounts.city > classCounts.nature && classCounts.city > classCounts.mountain && classCounts.city > classCounts.coast && classCounts.city > classCounts.rural && classCounts.city > classCounts.temple;
  const isMountainPreferred = classCounts.mountain > classCounts.city && classCounts.mountain > classCounts.nature && classCounts.mountain > classCounts.food && classCounts.mountain > classCounts.coast && classCounts.mountain > classCounts.rural && classCounts.mountain > classCounts.temple;
  // Example suggestion logic:
  if (isNorthPreferred && isFoodPreferred || isNorthPreferred && isCoastPreferred || isNorthPreferred && isNaturePreferred) {
    return "You should go to Hokkaido! It has some of the best food in all of Japan, beautiful nature, a unique culture, and as Japan's biggest prefecture, it has so much to explore!";
  } else if (isNorthPreferred && isMountainPreferred || isNorthPreferred && isTemplePreferred || isNorthPreferred && isRuralPreferred) {
    return "You should go to Yamagata! It is a very underrated prefecture in northern Japan. Home to some of the most snow in the world, beautiful temples, nature, mountains, and onsens, it is perfect for a winter getaway or a summer hiking trip!";
  } else if (isNorthPreferred && isCityPreferred) {
    return "You should go to Miyagi! It is home to Sendai, one of the largest cities in Japan, but it also has an abundance of beautiful nature, coastlines, and delicious food. Don't miss out on their local specialty, gyutan!";
  } else if (isNorthPreferred && classCounts.nature === classCounts.city) {
    return "You should go to Miyagi! It is home to Sendai, one of the largest cities in Japan, but it also has an abundance of beautiful nature, coastlines, and delicious food. Don't miss out on their local specialty, gyutan!" 
  }
    else if (isNorthPreferred) {
    return "You should go to Yamagata! It is a very underrated prefecture in northern Japan. Home to some of the most snow in the world, beautiful temples, nature, mountains, and onsens, it is perfect for a winter getaway or a summer hiking trip!";
  } else if (isCentralPreferred && isNaturePreferred || isCentralPreferred && isRuralPreferred || classCounts.central === classCounts.kansai && isRuralPreferred || classCounts.central === classCounts.kansai && classCounts.rural === classCounts.food && classCounts.rural > classCounts.city){
      return "You should go to Gifu! With easy access from Aichi in the middle of Japan, Gifu is home to some of the most beautiful nature in all of Japan. It is a very mountainous prefecture with so many small, beautiful towns to visit. From hikes to onsens to castles, Gifu has an abundance to offer anyone looking to get away from the typical route in Japan!"
  } else if (isCentralPreferred && isTemplePreferred || isCentralPreferred && isCoastPreferred) {
      return "You should visit Mie! Mie is home to one of the biggest and most important shrines in Shintoism, Ise Grand Shrine. Not only this, but it offers a stunning coastline, beautiful mountain areas, and many temples worth visiting beyond Ise as well. Mie is a stop well worth it for anyone looking to get off the beaten path!"
  } else if (isCentralPreferred && isFoodPreferred || isCentralPreferred && isCityPreferred || isCentralPreferred && classCounts.food === classCounts.city && classCounts.food > classCounts.temple) {
      return "You should visit Tokyo! While just about everyone who comes to Japan goes to Tokyo, they do so for a reason. There are so many different neighborhoods, restaurants, museums, and attractions to be explored in the largest city in the world. No matter how long you stay in Tokyo, there is always something new and exciting to see and experience!"
  } else if (isCentralPreferred && isMountainPreferred) {
      return "You should visit Nagano! Nagano has perhaps the most beautiful mountains in all of Japan. If you are looking for somewhere to hike, see the stars, or enjoy pristine nature, then Nagano is perfect for you! If not, it still has some wonderful cities and castles well worth a visit as well."
  }  else if (isKansaiPreferred && isTemplePreferred) {
      return "You should visit Nara! Nara is home to the famous deer park, and while that is well worth a visit, Nara has so much more to offer! Nara has some of the most beautiful temples in Japan, and it has a fraction of the crowds that Kyoto does (at least outside of Nara City). It also has delicious traditional Japanese foods, and it is easily accessible from Kyoto or Osaka!"
  } else if (isKansaiPreferred && isCityPreferred || isKansaiPreferred && isFoodPreferred) {
      return "You should visit Osaka! Osaka is one of the biggest cities in Japan, and if offers everything you could hope for from a city. It has a great nightlife, neon everywhere, plenty of attractions, and some of the best food in Japan. The city is often called The Kitchen of Japan for a reason. Not only that, the people are also generally brighter and more outgoing than their Tokyo counterparts. The city is a must for any Japan trip!"
  } else if (isKansaiPreferred && isCoastPreferred || isKansaiPreferred && isNaturePreferred || isKansaiPreferred && isMountainPreferred || isKansaiPreferred && isRuralPreferred) {
      return "You should visit Wakayama! Wakayama is one of the most underrated places in all of Japan! It offers some of the best coastlines in Japan, stunning mountains, kind people, and gorgeous temples. It has one of two world heritage trekking courses, and the tallest waterfall in Japan. Along with cheap, fresh, delicious food, it also offers all of this with little to no crowds. Perhaps my favorite prefecture in all of Japan, I cannot recommend Wakayama enough!"
  } else if (isKansaiPreferred) {
      return "You should visit Nara! Nara is home to the famous deer park, and while that is well worth a visit, Nara has so much more to offer! Nara has some of the most beautiful temples in Japan, and it has a fraction of the crowds that Kyoto does (at least outside of Nara City). It also has delicious traditional Japanese foods, and it is easily accessible from Kyoto or Osaka!"
  } else if (isSouthPreferred && isCityPreferred) {
      return "You should visit Fukuoka! It is the biggest city in the south of Japan, and it offers a wonderfully unique city to explore. Not only is the city beautiful as well as the prefecture, Fukuoka offers unique foods, a great nightlife, and fewer crowds. If you're looking for a new city to explore, Fukuoka is a great option!"
  } else if (isSouthPreferred && isRuralPreferred || isSouthPreferred && isMountainPreferred) {
      return "You should visit Kumamoto! Kumamoto city offers a great place to explore for food, a beautiful castle, and great shopping, but Kumamoto Prefecture offers so much more. It is home to some wonderful onsens, coastlines, and some fun hikes, including a massive volcano, Mt Aso. If you want to escape the crowds, Kumamoto has so much to offer!"
  } else if (isSouthPreferred && isNaturePreferred || isSouthPreferred && isTemplePreferred) {
      return "You should visit Miyazaki! Miyazaki is home to some of the most beautiful nature in all of Japan. Pristine forests, rivers, and beaches make it a great getaway from the city. It also has some beautiful, tucked away temples and shrines. If you would like to experience a more rural area of Japan, Miyazaki is a wonderful option!"
  } else if (isSouthPreferred && isCoastPreferred || isSouthPreferred && isFoodPreferred) {
      return "You should visit Nagasaki! Nagasaki is one of the most unique cities in all of Japan. It was one of the few cities that allowed for trading with Europe for much of Japan's history, so you can see how other cultures helped shape the food, architecture, and culture of the town. It is also where one of the atomic bombs was dropped, it has a deep and complicated history with Christianity, and so much more. Nagasaki is also home to one of the three best night views in all of Japan. Nagasaki is well worth a visit should you ever get the chance!"
  } else if (isSouthPreferred && classCounts.coast === classCounts.nature || isSouthPreferred && classCounts.food > classCounts.nature && classCounts.food > classCounts.city || isSouthPreferred && classCounts.coast == classCounts.city || classCounts.central > classCounts.north && classCounts.central > classCounts.kansai && classCounts.central === classCounts.south && isCoastPreferred || classCounts.south === classCounts.north && classCounts.south > classCounts.central && classCounts.south > classCounts.kansai && classCounts.food === classCounts.coast && classCounts.food > classCounts.nature) {
      return "You should visit Nagasaki! Nagasaki is one of the most unique cities in all of Japan. It was one of the few cities that allowed for trading with Europe for much of Japan's history, so you can see how other cultures helped shape the food, architecture, and culture of the town. It is also where one of the atomic bombs was dropped, it has a deep and complicated history with Christianity, and so much more. Nagasaki is also home to one of the three best night views in all of Japan. Nagasaki is well worth a visit should you ever get the chance!" 
  } else if (isSouthPreferred && classCounts.city === classCounts.nature && classCounts.city > classCounts.food && classCounts.city > classCounts.temple || isSouthPreferred && classCounts.city === classCounts.food && classCounts.city > classCounts.nature || classCounts.south>classCounts.central && classCounts.south === classCounts.kansai && classCounts.city > classCounts.nature || classCounts.south === classCounts.central && classCounts.south > classCounts.kansai && isCityPreferred) {
      return "You should visit Fukuoka! It is the biggest city in the south of Japan, and it offers a wonderfully unique city to explore. Not only is the city beautiful as well as the prefecture, Fukuoka offers unique foods, a great nightlife, and fewer crowds. If you're looking for a new city to explore, Fukuoka is a great option!" 
  }
    else if (isSouthPreferred) {
      return "You should visit Miyazaki! Miyazaki is home to some of the most beautiful nature in all of Japan. Pristine forests, rivers, and beaches make it a great getaway from the city. It also has some beautiful, tucked away temples and shrines. If you would like to experience a more rural area of Japan, Miyazaki is a wonderful option!"
  } else if (classCounts.north > classCounts.kansai && classCounts.north > classCounts.south && classCounts.north === classCounts.central && classCounts.rural > classCounts.city) {
     return "You should visit Nagano! Nagano has perhaps the most beautiful mountains in all of Japan. If you are looking for somewhere to hike, see the stars, or enjoy pristine nature, then Nagano is perfect for you! If not, it still has some wonderful cities and castles well worth a visit as well."  
  } else if (classCounts.north > classCounts.kansai && classCounts.north > classCounts.south && classCounts.north === classCounts.central && classCounts.city > classCounts.rural) {
     return "You should go to Miyagi! It is home to Sendai, one of the largest cities in Japan, but it also has an abundance of beautiful nature, coastlines, and delicious food. Don't miss out on their local specialty, gyutan!" 
  } else if (classCounts.kansai > classCounts.north && classCounts.kansai > classCounts.south && classCounts.kansai === classCounts.central && classCounts.city > classCounts.nature || classCounts.kansai > classCounts.north && classCounts.kansai > classCounts.central && classCounts.kansai === classCounts.south && classCounts.city > classCounts.nature) {
    return "You should visit Osaka! Osaka is one of the biggest cities in Japan, and if offers everything you could hope for from a city. It has a great nightlife, neon everywhere, plenty of attractions, and some of the best food in Japan. The city is often called The Kitchen of Japan for a reason. Not only that, the people are also generally brighter and more outgoing than their Tokyo counterparts. The city is a must for any Japan trip!"  
  } else if (classCounts.north > classCounts.south && classCounts.north > classCounts.kansai && classCounts.north === classCounts.central && classCounts.food > classCounts.nature || classCounts.north > classCounts.south && classCounts.north > classCounts.kansai && classCounts.north === classCounts.central && classCounts.food === classCounts.nature || classCounts.north > classCounts.central && classCounts.north > classCounts.kansai && classCounts.north === classCounts.south && isFoodPreferred) {
      return "You should go to Hokkaido! It has some of the best food in all of Japan, beautiful nature, a unique culture, and as Japan's biggest prefecture, it has so much to explore!";
  } else if (classCounts.north > classCounts.south && classCounts.north > classCounts.kansai && classCounts.north === classCounts.central && classCounts.temple > classCounts.nature || classCounts.north > classCounts.south && classCounts.north > classCounts.kansai && classCounts.north === classCounts.central && classCounts.temple === classCounts.nature || classCounts.north > classCounts.south && classCounts.north > classCounts.kansai && classCounts.north === classCounts.central && classCounts.temple === classCounts.food || isTemplePreferred || classCounts.coast > classCounts.mountain && classCounts.coast > classCounts. city && classCounts.coast === classCounts.temple || isCentralPreferred && classCounts.temple > classCounts.city && classCounts.temple === classCounts.food && classCounts.temple > classCounts.mountain) {
      return "You should visit Mie! Mie is home to one of the biggest and most important shrines in Shintoism, Ise Grand Shrine. Not only this, but it offers a stunning coastline, beautiful mountain areas, and many temples worth visiting beyond Ise as well. Mie is a stop well worth it for anyone looking to get off the beaten path!";
  } else if (isCentralPreferred) {
      return "You should visit Nagano! Nagano has perhaps the most beautiful mountains in all of Japan. If you are looking for somewhere to hike, see the stars, or enjoy pristine nature, then Nagano is perfect for you! If not, it still has some wonderful cities and castles well worth a visit as well."
  } else {
    return "You should visit Wakayama! Wakayama is one of the most underrated places in all of Japan! It offers some of the best coastlines in Japan, stunning mountains, kind people, and gorgeous temples. It has one of two world heritage trekking courses, and the tallest waterfall in Japan. Along with cheap, fresh, delicious food, it also offers all of this with little to no crowds. Perhaps my favorite prefecture in all of Japan, I cannot recommend Wakayama enough!";
  }
}

function generateImageUrl(classCounts) {
  const isNorthPreferred = classCounts.north > classCounts.kansai && classCounts.north > classCounts.central && classCounts.north > classCounts.south;
  const isSouthPreferred = classCounts.south > classCounts.kansai && classCounts.south > classCounts.central && classCounts.south > classCounts.north;
  const isCentralPreferred = classCounts.central > classCounts.kansai && classCounts.central > classCounts.north && classCounts.central > classCounts.south;
  const isKansaiPreferred = classCounts.kansai > classCounts.north && classCounts.kansai > classCounts.central && classCounts.kansai > classCounts.south;
  const isFoodPreferred = classCounts.food > classCounts.city && classCounts.food > classCounts.nature && classCounts.food > classCounts.mountain && classCounts.food > classCounts.coast && classCounts.food > classCounts.rural && classCounts.food > classCounts.temple;
  const isCoastPreferred = classCounts.coast > classCounts.city && classCounts.coast > classCounts.nature && classCounts.coast > classCounts.mountain && classCounts.coast > classCounts.food && classCounts.coast > classCounts.rural && classCounts.coast > classCounts.temple;
  const isNaturePreferred = classCounts.nature > classCounts.city && classCounts.nature > classCounts.food && classCounts.nature > classCounts.mountain && classCounts.nature > classCounts.coast && classCounts.nature > classCounts.rural && classCounts.nature > classCounts.temple;
  const isTemplePreferred = classCounts.temple > classCounts.city && classCounts.temple > classCounts.nature && classCounts.temple > classCounts.mountain && classCounts.temple > classCounts.coast && classCounts.temple > classCounts.rural && classCounts.temple > classCounts.food;
  const isRuralPreferred = classCounts.rural > classCounts.city && classCounts.rural > classCounts.nature && classCounts.rural > classCounts.mountain && classCounts.rural > classCounts.coast && classCounts.rural > classCounts.food && classCounts.rural > classCounts.temple;
  const isCityPreferred = classCounts.city > classCounts.food && classCounts.city > classCounts.nature && classCounts.city > classCounts.mountain && classCounts.city > classCounts.coast && classCounts.city > classCounts.rural && classCounts.city > classCounts.temple;
  const isMountainPreferred = classCounts.mountain > classCounts.city && classCounts.mountain > classCounts.nature && classCounts.mountain > classCounts.food && classCounts.mountain > classCounts.coast && classCounts.mountain > classCounts.rural && classCounts.mountain > classCounts.temple;
  
  if (isNorthPreferred && isFoodPreferred || isNorthPreferred && isCoastPreferred || isNorthPreferred && isNaturePreferred) {
    return "https://cdn.cheapoguides.com/wp-content/uploads/sites/3/2020/05/asahikawa-hokkaido-iStock-823846930-1024x600.jpg";
  } else if (isNorthPreferred && isMountainPreferred || isNorthPreferred && isTemplePreferred || isNorthPreferred && isRuralPreferred) {
    return "https://lh3.googleusercontent.com/pw/ADCreHcLncHaC4O4s3z3_nSVMWTHMel800ePY-1H5wbB26lY62tqFPA3yH5oH6q1MhZ1gIkTZEa89rbHhhD_qYvuYkD7UutxO0RYaCjdBAHkOHAJ4KBJOgY=w2400";
  } else if (isNorthPreferred && isCityPreferred) {
    return "https://www.nippon.com/en/ncommon/contents/guide-to-japan/3339/3339.jpg";
  } else if (isNorthPreferred) {
    return "https://lh3.googleusercontent.com/pw/ADCreHcLncHaC4O4s3z3_nSVMWTHMel800ePY-1H5wbB26lY62tqFPA3yH5oH6q1MhZ1gIkTZEa89rbHhhD_qYvuYkD7UutxO0RYaCjdBAHkOHAJ4KBJOgY=w2400";
  }else if (isCentralPreferred && isNaturePreferred || isCentralPreferred && isRuralPreferred || classCounts.central === classCounts.kansai && isRuralPreferred || classCounts.central === classCounts.kansai && classCounts.rural === classCounts.food && classCounts.rural > classCounts.city){
      return "https://lh3.googleusercontent.com/pw/ABLVV86Y9hzPBBiRRNF81E6nxgau71AKnpI5G8KY2VOtB9vrhN2Xn2V4rby_9rd3BCeZ6BaMwtHkv8WkoHUWd4rQGhBJvseuSEdnb5MFBVGNLHRTp61aX0I=w2400";
  } else if (isCentralPreferred && isTemplePreferred || isCentralPreferred && isCoastPreferred) {
      return "https://lh3.googleusercontent.com/pw/ABLVV87cXPWRuL3Y1fMAPP1be50xySuEomOW7E0_Oclhd5_jVzX_mgAUdk-PdHLho5G5QkTuIePFVeQdwgrE-rELagsEnZjmXWT_AW0Aq5fEIdHnWXceriw=w2400"
  } else if (isCentralPreferred && isFoodPreferred || isCentralPreferred && isCityPreferred || isCentralPreferred && classCounts.food === classCounts.city && classCounts.food > classCounts.temple) {
      return "https://www.gotokyo.org/en/destinations/southern-tokyo/images/499_0354_2.jpg"
  } else if (isCentralPreferred && isMountainPreferred) {
      return "https://www.nippon.com/en/ncommon/contents/guide-to-japan/2339218/2339218.jpg"
  }  else if (isKansaiPreferred && isTemplePreferred) {
      return "https://lh3.googleusercontent.com/pw/ADCreHdTTk8iT7knyj-5-qqgD0hNxwsQh-t4ve3FYUBHmQu017SdUqu3ZbuhZPaS-nS22DUKGqEOQRnh5CsarRONP0I4mYKV-NQ7eFtSCwkEamg4Ay-X1vE=w2400"
  } else if (isKansaiPreferred && isCityPreferred || isKansaiPreferred && isFoodPreferred) {
      return "https://lh3.googleusercontent.com/pw/ABLVV84aI1U9OYEupXBUc6W5_ES_CW0fQm1KWMDwcfHR5AvrKm_OC01aBtBwicQcrv3wSJB9--NrwGBayCcxuHKlSohUKppIddqXXC4ItSUldM8otCLnqyg=w2400"
  } else if (isKansaiPreferred && isCoastPreferred || isKansaiPreferred && isNaturePreferred || isKansaiPreferred && isMountainPreferred || isKansaiPreferred && isRuralPreferred) {
      return "https://lh3.googleusercontent.com/pw/ADCreHcdOoYz-C6cpRiMWUZ-fDtNEQp05kIWpyHXHiNZJlTmJT2tRsouaQlo2Farok-4QDXLGCblEqBXjGunwZOvebiVfS3cI48Yzjft34R6T4snL81dRGM=w2400"
  } else if (isKansaiPreferred) {
      return "https://lh3.googleusercontent.com/pw/ADCreHdTTk8iT7knyj-5-qqgD0hNxwsQh-t4ve3FYUBHmQu017SdUqu3ZbuhZPaS-nS22DUKGqEOQRnh5CsarRONP0I4mYKV-NQ7eFtSCwkEamg4Ay-X1vE=w2400"
  } else if (isSouthPreferred && isCityPreferred) {
      return "https://a3.cdn.japantravel.com/photo/290-216180/1440x960!/fukuoka-fukuoka-prefecture-216180.jpg"
  } else if (isSouthPreferred && isRuralPreferred || isSouthPreferred && isMountainPreferred) {
      return "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/458000/458320-Kumamoto-Prefecture.jpg"
  } else if (isSouthPreferred && isNaturePreferred || isSouthPreferred && isTemplePreferred) {
      return "https://lh3.googleusercontent.com/pw/ABLVV84N7WqWra5tHGRDx3CwaRR1izzsVgU38QVbK4_aQJyhoLkQBQsfEN3ZDXYyZ9GAp9Bc9B9SJPj2r-NhiiycpkCEoXy03AuT-CJS2vEQIBDXAWJPAN4=w2400"
  } else if (isSouthPreferred && isCoastPreferred || isSouthPreferred && isFoodPreferred) {
      return "https://top.his-usa.com/destination-japan/up_img/cke/imgs/2016713/shutterstock_290048120.jpg"
  } else if (isSouthPreferred && classCounts.coast === classCounts.nature || isSouthPreferred && classCounts.food > classCounts.nature || isSouthPreferred && classCounts.coast == classCounts.city || classCounts.central > classCounts.north && classCounts.central > classCounts.kansai && classCounts.central === classCounts.south && isCoastPreferred || classCounts.south === classCounts.north && classCounts.south > classCounts.central && classCounts.south > classCounts.kansai && classCounts.food === classCounts.coast && classCounts.food > classCounts.nature) {
    return "https://top.his-usa.com/destination-japan/up_img/cke/imgs/2016713/shutterstock_290048120.jpg"  
  } else if (isSouthPreferred && classCounts.city === classCounts.nature && classCounts.city > classCounts.food && classCounts.city > classCounts.temple || isSouthPreferred && classCounts.city === classCounts.food && classCounts.city > classCounts.nature || classCounts.south>classCounts.central && classCounts.south === classCounts.kansai && classCounts.city > classCounts.nature || classCounts.south === classCounts.central && classCounts.south > classCounts.kansai && isCityPreferred) {
      return "https://a3.cdn.japantravel.com/photo/290-216180/1440x960!/fukuoka-fukuoka-prefecture-216180.jpg"
  }
    else if (isSouthPreferred) {
      return "https://lh3.googleusercontent.com/pw/ABLVV84N7WqWra5tHGRDx3CwaRR1izzsVgU38QVbK4_aQJyhoLkQBQsfEN3ZDXYyZ9GAp9Bc9B9SJPj2r-NhiiycpkCEoXy03AuT-CJS2vEQIBDXAWJPAN4=w2400"
  } else if (classCounts.north > classCounts.kansai && classCounts.north > classCounts.south && classCounts.north === classCounts.central && classCounts.rural > classCounts.city) {
     return "https://www.nippon.com/en/ncommon/contents/guide-to-japan/2339218/2339218.jpg" 
  } else if (classCounts.north > classCounts.kansai && classCounts.north > classCounts.south && classCounts.north === classCounts.central && classCounts.city > classCounts.rural) {
    return "https://www.nippon.com/en/ncommon/contents/guide-to-japan/3339/3339.jpg"; 
  }else if (classCounts.kansai > classCounts.north && classCounts.kansai > classCounts.south && classCounts.kansai === classCounts.central && classCounts.city > classCounts.nature || classCounts.kansai > classCounts.north && classCounts.kansai > classCounts.central && classCounts.kansai === classCounts.south && classCounts.city > classCounts.nature) {
    return "https://lh3.googleusercontent.com/pw/ABLVV84aI1U9OYEupXBUc6W5_ES_CW0fQm1KWMDwcfHR5AvrKm_OC01aBtBwicQcrv3wSJB9--NrwGBayCcxuHKlSohUKppIddqXXC4ItSUldM8otCLnqyg=w2400"  
  } else if (classCounts.north > classCounts.south && classCounts.north > classCounts.kansai && classCounts.north === classCounts.central && classCounts.food > classCounts.nature || classCounts.north > classCounts.south && classCounts.north > classCounts.kansai && classCounts.north === classCounts.central && classCounts.food === classCounts.nature || classCounts.north > classCounts.central && classCounts.north > classCounts.kansai && classCounts.north === classCounts.south && isFoodPreferred) {
      return "https://cdn.cheapoguides.com/wp-content/uploads/sites/3/2020/05/asahikawa-hokkaido-iStock-823846930-1024x600.jpg";
  } else if (classCounts.north > classCounts.south && classCounts.north > classCounts.kansai && classCounts.north === classCounts.central && classCounts.temple > classCounts.nature || classCounts.north > classCounts.south && classCounts.north > classCounts.kansai && classCounts.north === classCounts.central && classCounts.temple === classCounts.nature || classCounts.north > classCounts.south && classCounts.north > classCounts.kansai && classCounts.north === classCounts.central && classCounts.temple === classCounts.food || isTemplePreferred || classCounts.coast > classCounts.mountain && classCounts.coast > classCounts. city && classCounts.coast === classCounts.temple || isCentralPreferred && classCounts.temple > classCounts.city && classCounts.temple === classCounts.food && classCounts.temple > classCounts.mountain) {
      return "https://lh3.googleusercontent.com/pw/ABLVV87cXPWRuL3Y1fMAPP1be50xySuEomOW7E0_Oclhd5_jVzX_mgAUdk-PdHLho5G5QkTuIePFVeQdwgrE-rELagsEnZjmXWT_AW0Aq5fEIdHnWXceriw=w2400"
  } else if (isCentralPreferred) {
      return "https://www.nippon.com/en/ncommon/contents/guide-to-japan/2339218/2339218.jpg"
  }
    else {
    return "https://lh3.googleusercontent.com/pw/ADCreHcdOoYz-C6cpRiMWUZ-fDtNEQp05kIWpyHXHiNZJlTmJT2tRsouaQlo2Farok-4QDXLGCblEqBXjGunwZOvebiVfS3cI48Yzjft34R6T4snL81dRGM=w2400"
  }
}

function displaySuggestion(suggestion, imageUrl) {
 
  //const counts = document.querySelector('#counts');
  //counts.textContent = classText;
  
  const suggestionText = document.querySelector('#suggestion-text');
  suggestionText.textContent = suggestion;
    
  const suggestionImage = document.querySelector('#suggestion-image');
  suggestionImage.src = imageUrl;

  const modalOverlay = document.querySelector('#modal-overlay');
  modalOverlay.style.display = 'flex';
}

const closeButton = document.querySelector('#close-button');
closeButton.addEventListener('click', closePopup);

function closePopup() {
  const modalOverlay = document.querySelector('#modal-overlay');
  modalOverlay.style.display = 'none';
}

document.querySelector('#modal-overlay').style.display = 'none';
